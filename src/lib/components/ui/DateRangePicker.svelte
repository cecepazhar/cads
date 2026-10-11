<script lang="ts">
  import type { ComponentVariant, ComponentSize } from './types';
  import { CalendarRange, ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { focusTrap, clickOutside, uid } from '../../utils/a11y';
  import { tick } from 'svelte';

  export type DateRangePickerVariant = Extract<ComponentVariant, 'primary' | 'outline'>;
  export type DateRangePickerSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  export interface DateRangePickerProps {
    start?: string;
    end?: string;
    min?: string;
    max?: string;
    disabled?: boolean;
    label?: string;
    variant?: DateRangePickerVariant;
    size?: DateRangePickerSize;
    class?: string;
    monthNames?: string[];
    weekStart?: 0 | 1;
  }

  let {
    start = $bindable(''),
    end = $bindable(''),
    min = '',
    max = '',
    disabled = false,
    label,
    variant = 'primary',
    size = 'md',
    class: customClass = '',
    monthNames,
    weekStart = 1,
  }: DateRangePickerProps = $props();

  const inputId = uid('drp-input');
  const calendarId = uid('drp-calendar');

  const defaultMonthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const names = monthNames ?? defaultMonthNames;

  const dayNames = $derived(
    weekStart === 1
      ? ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
      : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  );

  const minDate = $derived(min ? parseDate(min) : null);
  const maxDate = $derived(max ? parseDate(max) : null);

  let open = $state(false);
  let triggerEl = $state<HTMLDivElement | null>(null);
  // eslint-disable-next-line svelte/prefer-svelte-reactivity
  let calendarMonth = $state(start ? parseDateToMonth(start) : new Date());
  let hoverDate = $state('');
  let selectingEnd = $state(false);
  let focusedDate = $state(start ? parseDate(start) : new Date());
  let originalStart = $state('');
  let originalEnd = $state('');

  const weeks = $derived.by(() => {
    const year = calendarMonth.getFullYear();
    const m = calendarMonth.getMonth();
    const firstOfMonth = new Date(year, m, 1);
    const lastOfMonth = new Date(year, m + 1, 0);

    let startDow = firstOfMonth.getDay() - weekStart;
    if (startDow < 0) startDow += 7;

    const cells: Date[] = [];

    for (let i = startDow - 1; i >= 0; i--) {
      cells.push(new Date(year, m, -i));
    }

    for (let d = 1; d <= lastOfMonth.getDate(); d++) {
      cells.push(new Date(year, m, d));
    }

    const remainder = cells.length % 7;
    if (remainder > 0) {
      const padding = 7 - remainder;
      for (let d = 1; d <= padding; d++) {
        cells.push(new Date(year, m + 1, d));
      }
    }

    const result: Date[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
      result.push(cells.slice(i, i + 7));
    }
    return result;
  });

  function parseDate(str: string): Date {
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  function formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function parseDateToMonth(str: string): Date {
    const [y, m] = str.split('-').map(Number);
    return new Date(y, m - 1, 1);
  }

  function formatLabel(date: Date): string {
    return `${names[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  function isSameDay(a: Date, b: Date): boolean {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  function isDateDisabled(date: Date): boolean {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  }

  function getEffectiveRange() {
    const s = start ? parseDate(start) : null;
    const e = end ? parseDate(end) : null;
    const h = hoverDate ? parseDate(hoverDate) : null;

    if (s && e) {
      return { start: s, end: e };
    }
    if (s && selectingEnd && h) {
      if (h >= s) {
        return { start: s, end: h };
      } else {
        return { start: h, end: s };
      }
    }
    return { start: s, end: null };
  }

  function isRangeStart(date: Date): boolean {
    const range = getEffectiveRange();
    return range.start !== null && isSameDay(date, range.start);
  }

  function isRangeEnd(date: Date): boolean {
    const range = getEffectiveRange();
    return range.end !== null && isSameDay(date, range.end);
  }

  function isInRange(date: Date): boolean {
    const range = getEffectiveRange();
    if (!range.start || !range.end) return false;
    return date > range.start && date < range.end;
  }

  function selectDate(date: Date) {
    if (disabled || isDateDisabled(date)) return;
    const dateStr = formatDate(date);

    if (!selectingEnd || !start) {
      start = dateStr;
      end = '';
      selectingEnd = true;
    } else {
      const startDate = parseDate(start);
      if (date >= startDate) {
        end = dateStr;
        close();
      } else {
        start = dateStr;
        end = '';
      }
    }
  }

  function handleMouseEnter(date: Date) {
    if (selectingEnd) {
      hoverDate = formatDate(date);
    }
  }

  function handleMouseLeave() {
    hoverDate = '';
  }

  function prevMonth() {
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    const d = new Date(calendarMonth);
    d.setMonth(d.getMonth() - 1);
    calendarMonth = d;
  }

  function nextMonth() {
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    const d = new Date(calendarMonth);
    d.setMonth(d.getMonth() + 1);
    calendarMonth = d;
  }

  function moveFocus(newDate: Date) {
    focusedDate = newDate;
    if (
      newDate.getMonth() !== calendarMonth.getMonth() ||
      newDate.getFullYear() !== calendarMonth.getFullYear()
    ) {
      calendarMonth = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
    }
    tick().then(() => {
      const cell = document.getElementById(`${calendarId}-${formatDate(newDate)}`);
      cell?.focus();
    });
  }

  function handleCellKeydown(e: KeyboardEvent, date: Date) {
    let newDate: Date | null = null;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        newDate = new Date(date);
        newDate.setDate(newDate.getDate() - 1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        newDate = new Date(date);
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'ArrowDown':
        e.preventDefault();
        newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'PageUp':
        e.preventDefault();
        newDate = new Date(date);
        if (e.shiftKey) {
          newDate.setFullYear(newDate.getFullYear() - 1);
        } else {
          newDate.setMonth(newDate.getMonth() - 1);
        }
        break;
      case 'PageDown':
        e.preventDefault();
        newDate = new Date(date);
        if (e.shiftKey) {
          newDate.setFullYear(newDate.getFullYear() + 1);
        } else {
          newDate.setMonth(newDate.getMonth() + 1);
        }
        break;
      case 'Home':
        e.preventDefault();
        newDate = new Date(date);
        {
          const dow = newDate.getDay();
          const diff = (dow - weekStart + 7) % 7;
          newDate.setDate(newDate.getDate() - diff);
        }
        break;
      case 'End':
        e.preventDefault();
        newDate = new Date(date);
        {
          const dow = newDate.getDay();
          const diff = (6 - dow + weekStart + 7) % 7;
          newDate.setDate(newDate.getDate() + diff);
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        selectDate(date);
        return;
      default:
        return;
    }

    if (newDate) {
      moveFocus(newDate);
    }
  }

  function toggle() {
    if (disabled) return;
    open = !open;
    if (open) {
      originalStart = start;
      originalEnd = end;
      selectingEnd = false;
      hoverDate = '';
      if (start) calendarMonth = parseDateToMonth(start);
    }
  }

  function close() {
    open = false;
    selectingEnd = false;
    hoverDate = '';
    tick().then(() => triggerEl?.focus());
  }

  function cancel() {
    start = originalStart;
    end = originalEnd;
    close();
  }

  function formatDisplay(str: string): string {
    if (!str) return '';
    const [y, m, d] = str.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  const displayText = $derived(
    start && end
      ? `${formatDisplay(start)} – ${formatDisplay(end)}`
      : start
        ? `${formatDisplay(start)} – ...`
        : ''
  );

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && open) {
      e.preventDefault();
      cancel();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    } else if (e.key === 'ArrowDown' && !open) {
      e.preventDefault();
      open = true;
      if (start) calendarMonth = parseDateToMonth(start);
    }
  }

  const sizeClasses: Record<DateRangePickerSize, string> = {
    sm: 'py-1.5 text-xs',
    md: 'py-2 text-xs',
    lg: 'py-2.5 text-sm',
  };

  const variantClasses: Record<DateRangePickerVariant, string> = {
    primary: 'bg-[var(--ca-surface)] border border-[var(--ca-border)] text-[var(--ca-text-primary)]',
    outline: 'bg-transparent border border-[var(--ca-border)] text-[var(--ca-text-primary)]',
  };

  const cellSizeClasses: Record<DateRangePickerSize, string> = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };
</script>

<div class="flex flex-col gap-1.5 w-full {customClass}">
  {#if label}
    <label for={inputId} class="text-xs font-medium text-[var(--ca-text-secondary)]">{label}</label>
  {/if}

  <div class="relative" use:clickOutside={cancel}>
    <div
      id={inputId}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="dialog"
      aria-controls={open ? calendarId : undefined}
      tabindex={disabled ? -1 : 0}
      bind:this={triggerEl}
      onclick={toggle}
      onkeydown={handleKeydown}
      class="w-full flex items-center justify-between rounded-lg {variantClasses[variant]} {sizeClasses[size]} pl-3 pr-9 transition-colors cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
    >
      <span class={displayText ? 'text-[var(--ca-text-primary)]' : 'text-[var(--ca-text-muted)]'}>
        {displayText || 'Select date range'}
      </span>
      <span class="absolute right-3 text-[var(--ca-text-muted)] pointer-events-none">
        <CalendarRange size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
      </span>
    </div>

    {#if open}
      <div
        id={calendarId}
        role="dialog"
        aria-label="Choose date range"
        class="absolute z-50 mt-1 rounded-xl border border-[var(--ca-border)] bg-[var(--ca-surface-elevated)] p-3 shadow-2xl animate-in fade-in zoom-in-95"
        use:focusTrap={{ onEscape: cancel, returnFocus: true }}
      >
        <div class="flex items-center justify-between mb-3">
          <button
            type="button"
            onclick={prevMonth}
            aria-label="Previous month"
            class="p-1 rounded-lg text-[var(--ca-text-secondary)] hover:text-[var(--ca-text-primary)] hover:bg-[var(--ca-surface-subtle)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
          >
            <ChevronLeft size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
          </button>
          <span class="font-semibold text-[var(--ca-text-primary)] text-sm">
            {names[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
          </span>
          <button
            type="button"
            onclick={nextMonth}
            aria-label="Next month"
            class="p-1 rounded-lg text-[var(--ca-text-secondary)] hover:text-[var(--ca-text-primary)] hover:bg-[var(--ca-surface-subtle)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
          >
            <ChevronRight size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
          </button>
        </div>

        <table role="grid" aria-label="Calendar">
          <thead>
            <tr>
              {#each dayNames as day}
                <th
                  role="columnheader"
                  scope="col"
                  class="font-medium text-[var(--ca-text-muted)] pb-2 {cellSizeClasses[size]}"
                >
                  {day}
                </th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each weeks as week (week[0]?.toISOString() ?? 'week')}
              <tr>
                {#each week as date (date.toISOString())}
                  {@const inMonth = date.getMonth() === calendarMonth.getMonth()}
                  {@const dateDisabled = isDateDisabled(date)}
                  {@const rangeStart = isRangeStart(date)}
                  {@const rangeEnd = isRangeEnd(date)}
                  {@const inRange = isInRange(date)}
                  {@const focused = isSameDay(date, focusedDate)}
                  <td
                    role="gridcell"
                    aria-selected={rangeStart || rangeEnd || undefined}
                    aria-disabled={disabled || dateDisabled || undefined}
                    aria-label={formatLabel(date)}
                    tabindex={focused ? 0 : -1}
                    id="{calendarId}-{formatDate(date)}"
                    class="relative {cellSizeClasses[size]}
                      {!inMonth ? 'opacity-30' : ''}
                      {inRange ? 'bg-[var(--ca-brand)]/10' : ''}
                      {(rangeStart && rangeEnd) ? 'rounded-lg' : ''}
                      {rangeStart && !rangeEnd ? 'rounded-l-lg' : ''}
                      {rangeEnd && !rangeStart ? 'rounded-r-lg' : ''}
                    "
                    onclick={() => selectDate(date)}
                    onmouseenter={() => handleMouseEnter(date)}
                    onmouseleave={handleMouseLeave}
                    onkeydown={(e) => handleCellKeydown(e, date)}
                  >
                    <span
                      class="inline-flex items-center justify-center w-full h-full rounded-lg cursor-pointer transition-colors
                        {cellSizeClasses[size]} leading-none
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]
                        {(rangeStart || rangeEnd) ? 'bg-[var(--ca-brand)] text-white' : ''}
                        {!(rangeStart || rangeEnd) && inMonth && !dateDisabled ? 'text-[var(--ca-text-primary)] hover:bg-[var(--ca-surface-subtle)]' : ''}
                        {!inMonth ? 'text-[var(--ca-text-muted)]' : ''}
                        {(disabled || dateDisabled) ? 'opacity-30 cursor-not-allowed pointer-events-none' : ''}
                      "
                    >
                      {date.getDate()}
                    </span>
                  </td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>