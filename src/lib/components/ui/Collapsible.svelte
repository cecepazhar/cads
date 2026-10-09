<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    open?: boolean;
    title?: string;
    class?: string;
    children?: Snippet;
  }

  let {
    open = $bindable(false),
    title = '',
    class: customClass = '',
    children,
  }: Props = $props();
</script>

<div class="rounded-lg border border-neutral-800 bg-[#121217] overflow-hidden {customClass}">
  <button
    type="button"
    onclick={() => (open = !open)}
    class="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-medium text-neutral-200 hover:bg-neutral-800/50 transition cursor-pointer"
  >
    <span>{title}</span>
    <svg
      class="w-4 h-4 text-neutral-400 transition-transform {open ? 'rotate-180' : ''}"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
  </button>
  {#if open}
    <div class="px-4 py-3 border-t border-neutral-800/80 text-xs text-neutral-300">
      {@render children?.()}
    </div>
  {/if}
</div>
