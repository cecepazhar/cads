<script lang="ts">
  import type { ComponentVariant, ComponentSize } from './types';

  type TelemetryCardVariant = Extract<ComponentVariant, 'primary' | 'brand' | 'info' | 'success' | 'warning' | 'danger'>;
  type TelemetryCardSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    title: string;
    value: string;
    unit?: string;
    status?: 'normal' | 'warning' | 'critical';
    percentage?: number;
    variant?: TelemetryCardVariant;
    size?: TelemetryCardSize;
    class?: string;
  }

  let {
    title,
    value,
    unit = '',
    status = 'normal',
    percentage = 0,
    variant = 'primary',
    size = 'md',
    class: customClass = '',
  }: Props = $props();

  const statusColors = {
    normal: 'text-[var(--ca-brand)]',
    warning: 'text-amber-400',
    critical: 'text-rose-400'
  };

  const barColors = {
    normal: 'bg-[var(--ca-brand)]',
    warning: 'bg-amber-400',
    critical: 'bg-rose-400'
  };

  const variantBorderClasses: Record<TelemetryCardVariant, string> = {
    primary: 'border-[var(--ca-border)]',
    brand: 'border-[var(--ca-brand)]',
    info: 'border-blue-500/30',
    success: 'border-emerald-500/30',
    warning: 'border-amber-500/30',
    danger: 'border-rose-500/30',
  };

  const sizeClasses: Record<TelemetryCardSize, string> = {
    sm: 'p-3 space-y-2',
    md: 'p-4 space-y-3',
    lg: 'p-5 space-y-4',
  };
</script>

<div class="rounded-xl bg-[var(--ca-surface-elevated)] border {variantBorderClasses[variant]} flex flex-col justify-between font-sans {sizeClasses[size]} {customClass}">
  <div class="flex items-center justify-between">
    <span class="text-xs text-[var(--ca-text-muted)] font-medium">{title}</span>
    <span class="text-[10px] font-mono {statusColors[status]} uppercase font-bold">● {status}</span>
  </div>

  <div class="flex items-baseline gap-1.5">
    <span class="text-2xl font-bold font-mono text-[var(--ca-text-primary)] tracking-tight">{value}</span>
    {#if unit}
      <span class="text-xs font-mono text-[var(--ca-text-muted)]">{unit}</span>
    {/if}
  </div>

  {#if percentage > 0}
    <div class="space-y-1"
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="{title} usage"
    >
      <div class="w-full h-1.5 rounded-full bg-[var(--ca-surface-subtle)] overflow-hidden">
        <div class="h-full rounded-full transition-all duration-300 {barColors[status]}" style="width: {percentage}%;"></div>
      </div>
      <div class="flex items-center justify-between text-[10px] font-mono text-[var(--ca-text-muted)]">
        <span>Usage</span>
        <span>{percentage}%</span>
      </div>
    </div>
  {/if}
</div>