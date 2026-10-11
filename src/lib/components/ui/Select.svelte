<script lang="ts">
  import type { ComponentVariant, ComponentSize } from './types';
  import { uid } from '../../utils/a11y';

  export type SelectVariant = Extract<ComponentVariant, 'primary' | 'outline' | 'ghost'>;
  export type SelectSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
  }

  interface Props {
    variant?: SelectVariant;
    size?: SelectSize;
    options: SelectOption[];
    value?: string;
    id?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    class?: string;
  }

  let {
    variant = 'primary',
    size = 'md',
    options = [],
    value = $bindable(''),
    id,
    label = '',
    placeholder = 'Select option...',
    disabled = false,
    error = '',
    class: customClass = '',
  }: Props = $props();

  const errorId = uid('select-error');

  const variantClasses: Record<SelectVariant, string> = {
    primary:
      'bg-[var(--ca-surface)] border border-[var(--ca-border)] text-[var(--ca-text-primary)] focus:border-[var(--ca-brand)]',
    outline:
      'bg-transparent border border-[var(--ca-border)] text-[var(--ca-text-primary)] focus:border-[var(--ca-brand)]',
    ghost:
      'bg-transparent border border-transparent text-[var(--ca-text-primary)] hover:border-[var(--ca-border)] focus:border-[var(--ca-brand)]',
  };

  const sizeClasses: Record<SelectSize, string> = {
    sm: 'py-1.5 text-xs',
    md: 'py-2 text-xs',
    lg: 'py-2.5 text-sm',
  };
</script>

<div class="flex flex-col gap-1.5 w-full text-left {customClass}">
  {#if label}
    <label for={id} class="text-xs font-medium text-[var(--ca-text-secondary)]">{label}</label>
  {/if}
  <div class="relative">
    <select
      {id}
      bind:value
      {disabled}
      aria-invalid={!!error || undefined}
      aria-describedby={error ? errorId : undefined}
      class="w-full appearance-none rounded-lg {variantClasses[variant]} {sizeClasses[size]} px-3 pr-8 transition-all disabled:opacity-40 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {error ? 'border-rose-500 focus:border-rose-500 focus-visible:ring-rose-500' : ''}"
    >
      {#if placeholder}
        <option value="" disabled selected={!value}>{placeholder}</option>
      {/if}
      {#each options as opt (opt.value)}
        <option value={opt.value} disabled={opt.disabled}>{opt.label}</option>
      {/each}
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[var(--ca-text-muted)]">
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
    </div>
  </div>
  {#if error}
    <span id={errorId} class="text-[11px] text-rose-400">{error}</span>
  {/if}
</div>