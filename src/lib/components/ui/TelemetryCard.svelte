<script lang="ts">
  interface Props {
    title: string;
    value: string;
    unit?: string;
    trend?: string;
    status?: 'normal' | 'warning' | 'critical';
    percentage?: number;
  }

  let {
    title,
    value,
    unit = '',
    trend = '',
    status = 'normal',
    percentage = 0
  }: Props = $props();

  const statusColors = {
    normal: 'text-[var(--ca-brand,#ef4444)]',
    warning: 'text-amber-400',
    critical: 'text-rose-400'
  };

  const barColors = {
    normal: 'bg-[var(--ca-brand,#ef4444)]',
    warning: 'bg-amber-400',
    critical: 'bg-rose-400'
  };
</script>

<div class="p-4 rounded-xl bg-[#111116] border border-[#22222B] flex flex-col justify-between space-y-3 font-sans">
  <div class="flex items-center justify-between">
    <span class="text-xs text-neutral-400 font-medium">{title}</span>
    <span class="text-[10px] font-mono {statusColors[status]} uppercase font-bold">● {status}</span>
  </div>

  <div class="flex items-baseline gap-1.5">
    <span class="text-2xl font-bold font-mono text-white tracking-tight">{value}</span>
    {#if unit}
      <span class="text-xs font-mono text-neutral-400">{unit}</span>
    {/if}
  </div>

  {#if percentage > 0}
    <div class="space-y-1">
      <div class="w-full h-1.5 rounded-full bg-[#1F1F28] overflow-hidden">
        <div class="h-full rounded-full transition-all duration-300 {barColors[status]}" style="width: {percentage}%;"></div>
      </div>
      <div class="flex items-center justify-between text-[10px] font-mono text-neutral-500">
        <span>Usage</span>
        <span>{percentage}%</span>
      </div>
    </div>
  {/if}
</div>
