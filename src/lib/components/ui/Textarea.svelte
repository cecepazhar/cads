<script lang="ts">
  import type { ComponentVariant, ComponentSize } from './types';
  import { uid } from '../../utils/a11y';

  export type TextareaVariant = Extract<ComponentVariant, 'primary' | 'outline' | 'ghost'>;
  export type TextareaSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    variant?: TextareaVariant;
    size?: TextareaSize;
    value?: string;
    placeholder?: string;
    rows?: number;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    id?: string;
    label?: string;
    error?: string;
    success?: boolean;
    class?: string;
  }

  let {
    variant = 'primary',
    size = 'md',
    value = $bindable(''),
    placeholder = '',
    rows = 4,
    disabled = false,
    readonly = false,
    required = false,
    id,
    label = '',
    error = '',
    success = false,
    class: customClass = '',
  }: Props = $props();

  const errorId = uid('textarea-error');

  const variantClasses: Record<TextareaVariant, string> = {
    primary:
      'bg-[var(--ca-surface)] border border-[var(--ca-border)] text-[var(--ca-text-primary)] placeholder-[var(--ca-text-muted)] focus:border-[var(--ca-brand)]',
    outline:
      'bg-transparent border border-[var(--ca-border)] text-[var(--ca-text-primary)] placeholder-[var(--ca-text-muted)] focus:border-[var(--ca-brand)]',
    ghost:
      'bg-transparent border border-transparent text-[var(--ca-text-primary)] placeholder-[var(--ca-text-muted)] hover:border-[var(--ca-border)] focus:border-[var(--ca-brand)]',
  };

  const sizeClasses: Record<TextareaSize, string> = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-3 py-2 text-xs',
    lg: 'px-3.5 py-2.5 text-sm',
  };
</script>

<div class="flex flex-col gap-1.5 w-full text-left {customClass}">
  {#if label}
    <label for={id} class="text-xs font-medium text-[var(--ca-text-secondary)]">{label}</label>
  {/if}
  <textarea
    {id}
    bind:value
    {placeholder}
    {rows}
    {disabled}
    {readonly}
    {required}
    aria-invalid={!!error || undefined}
    aria-describedby={error ? errorId : undefined}
    class="w-full rounded-lg {variantClasses[variant]} {sizeClasses[size]} transition-all disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {error ? 'border-rose-500 focus:border-rose-500 focus-visible:ring-rose-500' : ''} {success ? 'border-emerald-500' : ''}"
  ></textarea>
  {#if error}
    <span id={errorId} class="text-[11px] text-rose-400">{error}</span>
  {/if}
</div>