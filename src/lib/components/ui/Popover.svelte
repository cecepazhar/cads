<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    open?: boolean;
    class?: string;
    trigger?: Snippet;
    children?: Snippet;
  }

  let {
    open = $bindable(false),
    class: customClass = '',
    trigger,
    children,
  }: Props = $props();
</script>

<div class="relative inline-block {customClass}">
  {#if trigger}
    <div onclick={() => (open = !open)}>
      {@render trigger()}
    </div>
  {/if}

  {#if open}
    <div
      class="absolute z-50 mt-2 p-3 rounded-xl border border-[#272732] bg-[#121217] text-[#EDEDED] shadow-2xl font-sans text-xs min-w-48 animate-in fade-in zoom-in-95"
    >
      {@render children?.()}
    </div>
  {/if}
</div>
