<script lang="ts">
  import type { ComponentVariant, ComponentSize } from './types';
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { uid } from '../../utils/a11y';
  import { tick } from 'svelte';

  export type CalendarVariant = Extract<ComponentVariant, 'primary' | 'outline'>;
  export type CalendarSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  export interface CalendarProps {
    value?: string;
    month?: Date;
    min?: string;
    max?: string;
    disabled?: boolean;
    variant?: CalendarVariant;
    size?: CalendarSize;
    weekStart?: 0 | 1;
    monthNames?: string[];
    class?: string;
    onselect?: (date: string) => void;
  }

  let {
    value = $bindable(''),
    month = $bindable(new Date()),
    min = '',
    max = '',
    disabled = false,
    variant = 'primary',
    size = 'md',
    weekStart = 1,
    monthNames,
    class: customClass = '',
    onselect,
  }: CalendarProps = $props();

  const gridId = uid('cal');

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

  let focusedDate = $state(value ? parseDate(value) : new Date());

  $effect(() => {
    const v = value;
    if (v) {
      focusedDate = parseDate(v);
    }
  });

  const weeks = $derived.by(() => {
    const year = month.getFullYear();
    const m = month.getMonth();
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

  function isToday(date: Date): boolean {
    return isSameDay(date, new Date());
  }

  function isSelected(date: Date): boolean {
    return value !== '' && isSameDay(date, parseDate(value));
  }

  function isDateDisabled(date: Date): boolean {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  }

  function isFocused(date: Date): boolean {
    return isSameDay(date, focusedDate);
  }

  function selectDate(date: Date) {
    if (disabled || isDateDisabled(date)) return;
    value = formatDate(date);
    onselect?.(value);
  }

  function prevMonth() {
    const d = new Date(month);
    d.setMonth(d.getMonth() - 1);
    month = d;
  }

  function nextMonth() {
    const d = new Date(month);
    d.setMonth(d.getMonth() + 1);
    month = d;
  }

  function moveFocus(newDate: Date) {
    focusedDate = newDate;
    if (
      newDate.getMonth() !== month.getMonth() ||
      newDate.getFullYear() !== month.getFullYear()
    ) {
      month = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
    }
    tick().then(() => {
      const cell = document.getElementById(`${gridId}-${formatDate(newDate)}`);
      cell?.focus();
    });
  }

  function handleKeydown(e: KeyboardEvent, date: Date) {
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

  const sizeClasses: Record<CalendarSize, string> = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const cellSizeClasses: Record<CalendarSize, string> = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const variantSelectedClasses: Record<CalendarVariant, string> = {
    primary: 'bg-[var(--ca-brand)] text-white',
    outline: 'border border-[var(--ca-brand)] text-[var(--ca-brand)]',
  };

  const variantTodayClasses: Record<CalendarVariant, string> = {
    primary: 'border border-[var(--ca-brand)] text-[var(--ca-brand)]',
    outline: 'border border-[var(--ca-brand)] text-[var(--ca-brand)]',
  };
</script>

<div class="font-sans {sizeClasses[size]} {customClass}">
  <div class="flex items-center justify-between mb-3">
    <button
      type="button"
      onclick={prevMonth}
      {disabled}
      aria-label="Previous month"
      class="p-1 rounded-lg text-[var(--ca-text-secondary)] hover:text-[var(--ca-text-primary)] hover:bg-[var(--ca-surface-subtle)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
    >
      <ChevronLeft size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
    </button>

    <span class="font-semibold text-[var(--ca-text-primary)]">
      {names[month.getMonth()]} {month.getFullYear()}
    </span>

    <button
      type="button"
      onclick={nextMonth}
      {disabled}
      aria-label="Next month"
      class="p-1 rounded-lg text-[var(--ca-text-secondary)] hover:text-[var(--ca-text-primary)] hover:bg-[var(--ca-surface-subtle)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
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
      {#each weeks as week}
        <tr>
          {#each week as date}
            {@const selected = isSelected(date)}
            {@const today = isToday(date)}
            {@const dateDisabled = isDateDisabled(date)}
            {@const focused = isFocused(date)}
            {@const inMonth = date.getMonth() === month.getMonth()}
            <td
              role="gridcell"
              aria-selected={selected || undefined}
              aria-disabled={disabled || dateDisabled || undefined}
              aria-label={formatLabel(date)}
              tabindex={focused ? 0 : -1}
              id="{gridId}-{formatDate(date)}"
              onclick={() => selectDate(date)}
              onkeydown={(e) => handleKeydown(e, date)}
              class="text-center rounded-lg cursor-pointer transition-colors
                {cellSizeClasses[size]} leading-none
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]
                {selected ? variantSelectedClasses[variant] : ''}
                {!selected && today ? variantTodayClasses[variant] : ''}
                {!selected && !today && inMonth ? 'text-[var(--ca-text-primary)] hover:bg-[var(--ca-surface-subtle)]' : ''}
                {!inMonth ? 'text-[var(--ca-text-muted)] opacity-50' : ''}
                {(disabled || dateDisabled) ? 'opacity-30 cursor-not-allowed pointer-events-none' : ''}
              "
            >
              {date.getDate()}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>