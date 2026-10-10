<script lang="ts">
  import type { ComponentVariant, ComponentSize } from '../ui/types';

  type RangeVariant = Extract<ComponentVariant, 'primary' | 'brand'>;
  type RangeSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    min?: number;
    max?: number;
    step?: number;
    minVal?: number;
    maxVal?: number;
    disabled?: boolean;
    variant?: RangeVariant;
    size?: RangeSize;
    class?: string;
  }

  let {
    min = 0,
    max = 100,
    step = 1,
    minVal = $bindable(20),
    maxVal = $bindable(80),
    disabled = false,
    variant = 'primary',
    size = 'md',
    class: customClass = '',
  }: Props = $props();

  $effect(() => {
    if (minVal > maxVal) {
      minVal = Math.min(minVal, maxVal);
      maxVal = Math.max(minVal, maxVal);
    }
  });

  const sizeClasses: Record<RangeSize, string> = {
    sm: 'h-1',
    md: 'h-1.5',
    lg: 'h-2',
  };
</script>

<div class="flex flex-col gap-2 w-full {customClass}">
  <div class="flex items-center justify-between text-xs font-mono text-[var(--ca-text-muted)]">
    <span>{minVal}</span>
    <span>{maxVal}</span>
  </div>
  <div class="relative flex items-center gap-2">
    <input
      type="range"
      {min}
      {max}
      {step}
      {disabled}
      aria-label="Minimum value"
      bind:value={minVal}
      class="w-full {sizeClasses[size]} bg-[var(--ca-surface-subtle)] rounded-lg appearance-none cursor-pointer accent-[var(--ca-brand)] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
    />
    <input
      type="range"
      {min}
      {max}
      {step}
      {disabled}
      aria-label="Maximum value"
      bind:value={maxVal}
      class="w-full {sizeClasses[size]} bg-[var(--ca-surface-subtle)] rounded-lg appearance-none cursor-pointer accent-[var(--ca-brand)] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
    />
  </div>
</div>