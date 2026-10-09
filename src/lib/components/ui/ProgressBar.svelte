<script lang="ts">
  interface Props {
    value?: number;
    max?: number;
    showLabel?: boolean;
    class?: string;
  }

  let { value = 0, max = 100, showLabel = false, class: customClass = '' }: Props = $props();
  const percent = $derived(Math.min(100, Math.max(0, Math.round((value / max) * 100))));
</script>

<div class="flex flex-col gap-1 w-full {customClass}">
  {#if showLabel}
    <div class="flex justify-between text-[11px] font-mono text-neutral-400">
      <span>Progress</span>
      <span>{percent}%</span>
    </div>
  {/if}
  <div class="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
    <div
      class="h-full bg-[var(--ca-brand,#3B82F6)] transition-all duration-300"
      style="width: {percent}%"
    ></div>
  </div>
</div>
