<script lang="ts">
  interface Props {
    value?: string;
    label?: string;
    presets?: string[];
    class?: string;
  }

  let {
    value = $bindable('#06b6d4'),
    label = '',
    presets = ['#71717a', '#ef4444', '#06b6d4', '#10b981', '#8b5cf6', '#eab308', '#3b82f6'],
    class: customClass = '',
  }: Props = $props();
</script>

<div class="flex flex-col gap-2 text-left {customClass}">
  {#if label}
    <label class="text-xs font-medium text-neutral-300">{label}</label>
  {/if}
  <div class="flex items-center gap-3">
    <div class="relative">
      <input
        type="color"
        bind:value
        class="h-8 w-8 rounded cursor-pointer border border-neutral-700 bg-neutral-900 p-0.5"
      />
    </div>
    <span class="font-mono text-xs text-neutral-300 bg-neutral-900 border border-neutral-800 px-2 py-1 rounded">{value}</span>
  </div>
  <div class="flex items-center gap-1.5 pt-1">
    {#each presets as preset}
      <button
        type="button"
        onclick={() => (value = preset)}
        class="h-5 w-5 rounded-full border border-white/20 transition-transform hover:scale-110 cursor-pointer {value === preset ? 'ring-2 ring-white ring-offset-2 ring-offset-neutral-900' : ''}"
        style="background-color: {preset};"
        aria-label="Preset color {preset}"
      ></button>
    {/each}
  </div>
</div>
