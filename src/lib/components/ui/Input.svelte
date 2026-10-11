<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentVariant, ComponentSize } from './types';
  import { uid } from '../../utils/a11y';

  export type InputVariant = Extract<ComponentVariant, 'primary' | 'outline' | 'ghost'>;
  export type InputSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    variant?: InputVariant;
    size?: InputSize;
    value?: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    id?: string;
    label?: string;
    /** Error message — sets `aria-invalid` and links via `aria-describedby`. */
    error?: string;
    /** Shows success styling when true. */
    success?: boolean;
    class?: string;
    leadingIcon?: Snippet;
    trailingAction?: Snippet;
    oninput?: (e: Event) => void;
    onkeydown?: (e: KeyboardEvent) => void;
  }

  let {
    variant = 'primary',
    size = 'md',
    value = $bindable(''),
    type = 'text',
    placeholder = '',
    disabled = false,
    readonly = false,
    required = false,
    id,
    label = '',
    error = '',
    success = false,
    class: customClass = '',
    leadingIcon,
    trailingAction,
    oninput,
    onkeydown,
  }: Props = $props();

  const errorId = uid('input-error');

  const variantClasses: Record<InputVariant, string> = {
    primary:
      'bg-[var(--ca-surface)] border border-[var(--ca-border)] text-[var(--ca-text-primary)] placeholder-[var(--ca-text-muted)] focus:border-[var(--ca-brand)]',
    outline:
      'bg-transparent border border-[var(--ca-border)] text-[var(--ca-text-primary)] placeholder-[var(--ca-text-muted)] focus:border-[var(--ca-brand)]',
    ghost:
      'bg-transparent border border-transparent text-[var(--ca-text-primary)] placeholder-[var(--ca-text-muted)] hover:border-[var(--ca-border)] focus:border-[var(--ca-brand)]',
  };

  const sizeClasses: Record<InputSize, string> = {
    sm: 'py-1.5 text-xs',
    md: 'py-2 text-xs',
    lg: 'py-2.5 text-sm',
  };
</script>

<div class="flex flex-col gap-1.5 w-full {customClass}">
  {#if label}
    <label for={id} class="text-xs font-medium text-[var(--ca-text-secondary)]">{label}</label>
  {/if}

  <div class="relative flex items-center w-full">
    {#if leadingIcon}
      <div class="absolute left-3 flex items-center pointer-events-none text-[var(--ca-text-muted)]">
        {@render leadingIcon()}
      </div>
    {/if}

    <input
      {id}
      {type}
      {placeholder}
      {disabled}
      {readonly}
      {required}
      bind:value
      {oninput}
      {onkeydown}
      aria-invalid={!!error || undefined}
      aria-describedby={error ? errorId : undefined}
      class="w-full rounded-lg {variantClasses[variant]} {sizeClasses[size]} {leadingIcon ? 'pl-9' : 'pl-3'} {trailingAction ? 'pr-9' : 'pr-3'} transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {error ? 'border-rose-500 focus:border-rose-500 focus-visible:ring-rose-500' : ''} {success ? 'border-emerald-500' : ''}"
    />

    {#if trailingAction}
      <div class="absolute right-2 flex items-center">
        {@render trailingAction()}
      </div>
    {/if}
  </div>

  {#if error}
    <span id={errorId} class="text-[11px] text-rose-400">{error}</span>
  {/if}
</div>