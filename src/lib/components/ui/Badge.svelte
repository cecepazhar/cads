<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentVariant, ComponentSize } from './types';

  /** Full ComponentVariant vocabulary + neutral (neutral is already in ComponentVariant). */
  export type BadgeVariant = Extract<
    ComponentVariant,
    'primary' | 'secondary' | 'outline' | 'ghost' | 'brand' | 'neutral' | 'info' | 'success' | 'warning' | 'danger'
  >;
  export type BadgeSize = Extract<ComponentSize, 'xs' | 'sm' | 'md'>;

  interface Props {
    variant?: BadgeVariant;
    size?: BadgeSize;
    /** Accessible label for screen readers. */
    ariaLabel?: string;
    class?: string;
    children?: Snippet;
  }

  let {
    variant = 'neutral',
    size = 'sm',
    ariaLabel,
    class: customClass = '',
    children,
  }: Props = $props();

  const variantClasses: Record<BadgeVariant, string> = {
    primary:
      'bg-[var(--ca-brand)]/15 text-[var(--ca-brand)] border border-[var(--ca-brand)]/35',
    secondary:
      'bg-[var(--ca-surface-subtle)] text-[var(--ca-text-secondary)] border border-[var(--ca-border)]',
    outline:
      'bg-transparent text-[var(--ca-text-primary)] border border-[var(--ca-border)]',
    ghost:
      'bg-transparent text-[var(--ca-text-secondary)]',
    brand:
      'bg-[var(--ca-brand)]/15 text-[var(--ca-brand)] border border-[var(--ca-brand)]/35',
    neutral:
      'bg-[var(--ca-surface-subtle)] text-[var(--ca-text-secondary)] border border-[var(--ca-border)]',
    info:
      'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30',
    success:
      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
    warning:
      'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30',
    danger:
      'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30',
  };

  const sizeClasses: Record<BadgeSize, string> = {
    xs: 'text-[10px] px-1.5 py-0.5 rounded-md font-mono font-medium gap-1',
    sm: 'text-xs px-2 py-0.5 rounded-lg font-medium gap-1.5',
    md: 'text-sm px-2.5 py-1 rounded-lg font-medium gap-2',
  };
</script>

<span
  role="status"
  aria-label={ariaLabel}
  class="inline-flex items-center justify-center select-none tracking-tight {variantClasses[variant]} {sizeClasses[size]} {customClass}"
>
  {@render children?.()}
</span>