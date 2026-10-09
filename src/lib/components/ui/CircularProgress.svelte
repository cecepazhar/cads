<script lang="ts">
  interface Props {
    value?: number;
    size?: number;
    strokeWidth?: number;
    class?: string;
  }

  let {
    value = 0,
    size = 40,
    strokeWidth = 3.5,
    class: customClass = '',
  }: Props = $props();

  const radius = $derived((size - strokeWidth) / 2);
  const circumference = $derived(2 * Math.PI * radius);
  const strokeDashoffset = $derived(circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference);
</script>

<div class="relative inline-flex items-center justify-center {customClass}" style="width: {size}px; height: {size}px;">
  <svg class="transform -rotate-90" width={size} height={size}>
    <circle
      cx={size / 2}
      cy={size / 2}
      r={radius}
      stroke="currentColor"
      stroke-width={strokeWidth}
      fill="transparent"
      class="text-neutral-800"
    />
    <circle
      cx={size / 2}
      cy={size / 2}
      r={radius}
      stroke="var(--ca-brand, #3B82F6)"
      stroke-width={strokeWidth}
      fill="transparent"
      stroke-dasharray={circumference}
      stroke-dashoffset={strokeDashoffset}
      stroke-linecap="round"
      class="transition-all duration-300"
    />
  </svg>
  <span class="absolute font-mono text-[10px] text-neutral-300 font-semibold">{Math.round(value)}%</span>
</div>
