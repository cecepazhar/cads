<script lang="ts">
  interface Props {
    min?: number;
    max?: number;
    step?: number;
    minVal?: number;
    maxVal?: number;
    class?: string;
  }

  let {
    min = 0,
    max = 100,
    step = 1,
    minVal = $bindable(20),
    maxVal = $bindable(80),
    class: customClass = '',
  }: Props = $props();
</script>

<div class="flex flex-col gap-2 w-full {customClass}">
  <div class="flex items-center justify-between text-xs font-mono text-neutral-400">
    <span>{minVal}</span>
    <span>{maxVal}</span>
  </div>
  <div class="relative flex items-center gap-2">
    <input
      type="range"
      {min}
      {max}
      {step}
      bind:value={minVal}
      class="w-full accent-[var(--ca-brand)]"
    />
    <input
      type="range"
      {min}
      {max}
      {step}
      bind:value={maxVal}
      class="w-full accent-[var(--ca-brand)]"
    />
  </div>
</div>
