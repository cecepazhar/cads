<script lang="ts">
  import type { ComponentVariant, ComponentSize } from './types';
  import { Calendar as CalendarIcon } from 'lucide-svelte';
  import { focusTrap, clickOutside, uid } from '../../utils/a11y';
  import Calendar from './Calendar.svelte';
  import { tick } from 'svelte';

  export type DateTimePickerVariant = Extract<ComponentVariant, 'primary' | 'outline'>;
  export type DateTimePickerSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  export interface DateTimePickerProps {
    value?: string;
    placeholder?: string;
    min?: string;
    max?: string;
    disabled?: boolean;
    readonly?: boolean;
    label?: string;
    timeLabel?: string;
    error?: string;
    id?: string;
    variant?: DateTimePickerVariant;
    size?: DateTimePickerSize;
    class?: string;
    monthNames?: string[];
    weekStart?: 0 | 1;
  }

  let {
    value = $bindable(''),
    placeholder = 'Select date',
    min = '',
    max = '',
    disabled = false,
    readonly: _readonly = true,
    label,
    timeLabel = 'Time',
    error,
    id,
    variant = 'primary',
    size = 'md',
    class: customClass = '',
    monthNames,
    weekStart,
  }: DateTimePickerProps = $props();

  const inputId = id ?? uid('dtp-input');
  const timeInputId = uid('dtp-time');
  const calendarId = uid('dtp-calendar');
  const errorId = uid('dtp-error');

  function extractDate(val: string): string {
    return val.split('T')[0] || '';
  }

  function extractTime(val: string): string {
    const parts = val.split('T');
    if (parts.length < 2) return '';
    return parts[1].substring(0, 5);
  }

  const dateValue = $derived(extractDate(value));
  const timeValue = $derived(extractTime(value));

  let open = $state(false);
  let triggerEl = $state<HTMLDivElement | null>(null);
  let calendarMonth = $state(dateValue ? parseDateToMonth(dateValue) : new Date());

  function parseDateToMonth(str: string): Date {
    const [y, m] = str.split('-').map(Number);
    return new Date(y, m - 1, 1);
  }

  function formatDisplay(str: string): string {
    if (!str) return '';
    const [y, m, d] = str.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  function formatDateStr(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function toggle() {
    if (disabled) return;
    open = !open;
    if (open && dateValue) {
      calendarMonth = parseDateToMonth(dateValue);
    }
  }

  function close() {
    open = false;
    tick().then(() => triggerEl?.focus());
  }

  function handleDateSelect(date: string) {
    const time = timeValue || '00:00';
    value = `${date}T${time}`;
    close();
  }

  function handleTimeChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const time = input.value;
    const date = dateValue || formatDateStr(new Date());
    value = `${date}T${time}`;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && open) {
      e.preventDefault();
      close();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    } else if (e.key === 'ArrowDown' && !open) {
      e.preventDefault();
      open = true;
      if (dateValue) calendarMonth = parseDateToMonth(dateValue);
    }
  }

  const sizeClasses: Record<DateTimePickerSize, string> = {
    sm: 'py-1.5 text-xs',
    md: 'py-2 text-xs',
    lg: 'py-2.5 text-sm',
  };

  const variantClasses: Record<DateTimePickerVariant, string> = {
    primary: 'bg-[var(--ca-surface)] border border-[var(--ca-border)] text-[var(--ca-text-primary)]',
    outline: 'bg-transparent border border-[var(--ca-border)] text-[var(--ca-text-primary)]',
  };
</script>

<div class="flex flex-col gap-1.5 w-full {customClass}">
  {#if label}
    <label for={inputId} class="text-xs font-medium text-[var(--ca-text-secondary)]">{label}</label>
  {/if}

  <div class="flex items-start gap-2" use:clickOutside={close}>
    <div class="relative flex-1">
      <div
        id={inputId}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? calendarId : undefined}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? errorId : undefined}
        tabindex={disabled ? -1 : 0}
        bind:this={triggerEl}
        onclick={toggle}
        onkeydown={handleKeydown}
        class="w-full flex items-center justify-between rounded-lg {variantClasses[variant]} {sizeClasses[size]} pl-3 pr-9 transition-colors cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]
          {error ? 'border-[var(--ca-danger)]' : ''}"
      >
        <span class={dateValue ? 'text-[var(--ca-text-primary)]' : 'text-[var(--ca-text-muted)]'}>
          {dateValue ? formatDisplay(dateValue) : placeholder}
        </span>
        <span class="absolute right-3 text-[var(--ca-text-muted)] pointer-events-none">
          <CalendarIcon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
        </span>
      </div>

      {#if open}
        <div
          id={calendarId}
          role="dialog"
          aria-label="Choose date"
          class="absolute z-50 mt-1 rounded-xl border border-[var(--ca-border)] bg-[var(--ca-surface-elevated)] p-3 shadow-2xl animate-in fade-in zoom-in-95"
          use:focusTrap={{ onEscape: close, returnFocus: true }}
        >
          <Calendar
            value={dateValue}
            bind:month={calendarMonth}
            {min}
            {max}
            {disabled}
            {variant}
            {size}
            {monthNames}
            {weekStart}
            onselect={handleDateSelect}
          />
        </div>
      {/if}
    </div>

    <div class="flex flex-col gap-1.5">
      {#if timeLabel}
        <label for={timeInputId} class="text-xs font-medium text-[var(--ca-text-secondary)]">{timeLabel}</label>
      {/if}
      <input
        type="time"
        id={timeInputId}
        value={timeValue}
        {disabled}
        oninput={handleTimeChange}
        class="rounded-lg {variantClasses[variant]} {sizeClasses[size]} px-3 transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
      />
    </div>
  </div>

  {#if error}
    <span id={errorId} class="text-[11px] text-[var(--ca-danger)]">{error}</span>
  {/if}
</div>