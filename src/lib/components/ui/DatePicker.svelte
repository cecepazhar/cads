<script lang="ts">
  import type { ComponentVariant, ComponentSize } from './types';
  import { Calendar as CalendarIcon } from 'lucide-svelte';
  import { focusTrap, clickOutside, uid } from '../../utils/a11y';
  import Calendar from './Calendar.svelte';
  import { tick } from 'svelte';

  export type DatePickerVariant = Extract<ComponentVariant, 'primary' | 'outline'>;
  export type DatePickerSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  export interface DatePickerProps {
    value?: string;
    placeholder?: string;
    min?: string;
    max?: string;
    disabled?: boolean;
    readonly?: boolean;
    label?: string;
    error?: string;
    id?: string;
    variant?: DatePickerVariant;
    size?: DatePickerSize;
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
    error,
    id,
    variant = 'primary',
    size = 'md',
    class: customClass = '',
    monthNames,
    weekStart,
  }: DatePickerProps = $props();

  const inputId = id ?? uid('dp-input');
  const calendarId = uid('dp-calendar');
  const errorId = uid('dp-error');

  let open = $state(false);
  let triggerEl = $state<HTMLDivElement | null>(null);
  let calendarMonth = $state(value ? parseDateToMonth(value) : new Date());

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

  function toggle() {
    if (disabled) return;
    open = !open;
    if (open && value) {
      calendarMonth = parseDateToMonth(value);
    }
  }

  function close() {
    open = false;
    tick().then(() => triggerEl?.focus());
  }

  function handleSelect(date: string) {
    value = date;
    close();
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
      if (value) calendarMonth = parseDateToMonth(value);
    }
  }

  const sizeClasses: Record<DatePickerSize, string> = {
    sm: 'py-1.5 text-xs',
    md: 'py-2 text-xs',
    lg: 'py-2.5 text-sm',
  };

  const variantClasses: Record<DatePickerVariant, string> = {
    primary: 'bg-[var(--ca-surface)] border border-[var(--ca-border)] text-[var(--ca-text-primary)]',
    outline: 'bg-transparent border border-[var(--ca-border)] text-[var(--ca-text-primary)]',
  };
</script>

<div class="flex flex-col gap-1.5 w-full {customClass}">
  {#if label}
    <label for={inputId} class="text-xs font-medium text-[var(--ca-text-secondary)]">{label}</label>
  {/if}

  <div class="relative" use:clickOutside={close}>
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
      <span class={value ? 'text-[var(--ca-text-primary)]' : 'text-[var(--ca-text-muted)]'}>
        {value ? formatDisplay(value) : placeholder}
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
          {value}
          bind:month={calendarMonth}
          {min}
          {max}
          {disabled}
          {variant}
          {size}
          {monthNames}
          {weekStart}
          onselect={handleSelect}
        />
      </div>
    {/if}
  </div>

  {#if error}
    <span id={errorId} class="text-[11px] text-[var(--ca-danger)]">{error}</span>
  {/if}
</div>