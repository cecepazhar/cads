<script lang="ts">
  import type { ComponentVariant, ComponentSize } from '../ui/types';

  type ProgressVariant = Extract<ComponentVariant, 'primary' | 'secondary' | 'outline' | 'ghost' | 'brand' | 'neutral' | 'info' | 'success' | 'warning' | 'danger'>;
  type ProgressSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    value?: number;
    max?: number;
    showLabel?: boolean;
    label?: string;
    variant?: ProgressVariant;
    size?: ProgressSize;
    class?: string;
  }

  let {
    value = 0,
    max = 100,
    showLabel = false,
    label = 'Progress',
    variant = 'brand',
    size = 'md',
    class: customClass = '',
  }: Props = $props();

  const percent = $derived(Math.min(100, Math.max(0, Math.round((value / max) * 100))));

  const sizeClasses: Record<ProgressSize, string> = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const variantClasses: Record<ProgressVariant, string> = {
    primary: 'bg-[var(--ca-brand)]',
    secondary: 'bg-[var(--ca-text-secondary)]',
    outline: 'bg-[var(--ca-border)]',
    ghost: 'bg-[var(--ca-surface-subtle)]',
    brand: 'bg-[var(--ca-brand)]',
    neutral: 'bg-[var(--ca-text-muted)]',
    info: 'bg-[var(--ca-info)]',
    success: 'bg-[var(--ca-success)]',
    warning: 'bg-[var(--ca-warning)]',
    danger: 'bg-[var(--ca-danger)]',
  };
</script>

<div
  role="progressbar"
  aria-valuenow={value}
  aria-valuemin={0}
  aria-valuemax={max}
  aria-label={label}
  class="flex flex-col gap-1 w-full {customClass}"
>
  {#if showLabel}
    <div class="flex justify-between text-[11px] font-mono text-[var(--ca-text-muted)]">
      <span>{label}</span>
      <span>{percent}%</span>
    </div>
  {/if}
  <div class="w-full overflow-hidden rounded-full bg-[var(--ca-surface-subtle)] {sizeClasses[size]}">
    <div
      class="h-full {variantClasses[variant]} transition-all duration-300"
      style="width: {percent}%"
    ></div>
  </div>
</div>