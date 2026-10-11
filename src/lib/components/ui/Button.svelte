<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentVariant, ComponentSize } from './types';

  export type ButtonVariant = Extract<
    ComponentVariant,
    'primary' | 'secondary' | 'outline' | 'ghost' | 'brand' | 'neutral' | 'info' | 'success' | 'warning' | 'danger'
  >;
  export type ButtonSize = Extract<ComponentSize, 'sm' | 'md' | 'lg' | 'icon'>;

  interface Props {
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    title?: string;
    /** Required when size="icon" for accessibility. */
    'aria-label'?: string;
    class?: string;
    onclick?: (e: MouseEvent) => void;
    children?: Snippet;
  }

  let {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    type = 'button',
    title,
    'aria-label': ariaLabel,
    class: customClass = '',
    onclick,
    children,
  }: Props = $props();

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-[var(--ca-brand)] text-white font-semibold hover:opacity-90 border border-[var(--ca-brand)] shadow-sm',
    secondary:
      'bg-[var(--ca-surface-subtle)] border border-[var(--ca-border)] text-[var(--ca-text-primary)] hover:opacity-80',
    outline:
      'bg-transparent border border-[var(--ca-border)] text-[var(--ca-text-primary)] hover:bg-[var(--ca-surface-subtle)]',
    ghost:
      'bg-transparent text-[var(--ca-text-secondary)] hover:bg-[var(--ca-surface-subtle)] hover:text-[var(--ca-text-primary)]',
    danger:
      'bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/50',
    brand:
      'bg-[var(--ca-brand)]/10 border border-[var(--ca-brand)]/40 text-[var(--ca-brand)] hover:bg-[var(--ca-brand)]/20 hover:border-[var(--ca-brand)]/60 shadow-xs',
    neutral:
      'bg-[var(--ca-surface-subtle)] text-[var(--ca-text-secondary)] hover:text-[var(--ca-text-primary)] border border-[var(--ca-border)]',
    info:
      'bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 hover:border-sky-500/50',
    success:
      'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50',
    warning:
      'bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/50',
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-2.5 py-1 text-xs rounded-lg gap-1.5',
    md: 'px-3.5 py-1.5 text-xs font-semibold rounded-lg gap-2',
    lg: 'px-4 py-2 text-sm font-bold rounded-xl gap-2.5',
    icon: 'p-1.5 rounded-lg justify-center',
  };
</script>

<button
  {type}
  {title}
  disabled={disabled || loading}
  aria-busy={loading || undefined}
  aria-label={size === 'icon' ? ariaLabel : undefined}
  {onclick}
  class="inline-flex items-center justify-center font-sans select-none transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {variantClasses[variant]} {sizeClasses[size]} {customClass}"
>
  {#if loading}
    <svg class="animate-spin -ml-0.5 mr-1.5 h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
    </svg>
  {/if}
  {@render children?.()}
</button>