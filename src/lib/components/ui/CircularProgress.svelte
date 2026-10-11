<script lang="ts">
  import type { ComponentVariant } from './types';

  type CircularProgressVariant = Extract<ComponentVariant, 'primary' | 'secondary' | 'outline' | 'ghost' | 'brand' | 'neutral' | 'info' | 'success' | 'warning' | 'danger'>;

  interface Props {
    value?: number;
    size?: number;
    strokeWidth?: number;
    variant?: CircularProgressVariant;
    class?: string;
  }

  let {
    value = 0,
    size = 40,
    strokeWidth = 3.5,
    variant = 'brand',
    class: customClass = '',
  }: Props = $props();

  const radius = $derived((size - strokeWidth) / 2);
  const circumference = $derived(2 * Math.PI * radius);
  const strokeDashoffset = $derived(circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference);

  const variantColors: Record<CircularProgressVariant, string> = {
    primary: 'var(--ca-brand)',
    secondary: 'var(--ca-text-secondary)',
    outline: 'var(--ca-border)',
    ghost: 'var(--ca-surface-subtle)',
    brand: 'var(--ca-brand)',
    neutral: 'var(--ca-text-muted)',
    info: 'var(--ca-info)',
    success: 'var(--ca-success)',
    warning: 'var(--ca-warning)',
    danger: 'var(--ca-danger)',
  };
</script>

<div
  role="progressbar"
  aria-valuenow={value}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="Progress"
  class="relative inline-flex items-center justify-center {customClass}"
  style="width: {size}px; height: {size}px;"
>
  <svg class="transform -rotate-90" width={size} height={size}>
    <circle
      cx={size / 2}
      cy={size / 2}
      r={radius}
      stroke="currentColor"
      stroke-width={strokeWidth}
      fill="transparent"
      class="text-[var(--ca-surface-subtle)]"
    />
    <circle
      cx={size / 2}
      cy={size / 2}
      r={radius}
      stroke={variantColors[variant]}
      stroke-width={strokeWidth}
      fill="transparent"
      stroke-dasharray={circumference}
      stroke-dashoffset={strokeDashoffset}
      stroke-linecap="round"
      class="transition-all duration-300"
    />
  </svg>
  <span class="absolute font-mono text-[10px] text-[var(--ca-text-secondary)] font-semibold">{Math.round(value)}%</span>
</div>