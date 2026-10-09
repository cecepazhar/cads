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

<div
  class="relative inline-block {customClass}"
  onmouseenter={() => (open = true)}
  onmouseleave={() => (open = false)}
  role="region"
>
  {#if trigger}
    {@render trigger()}
  {/if}

  {#if open}
    <div
      class="absolute z-40 mt-2 p-3 rounded-xl border border-[#272732] bg-[#121217] text-[#EDEDED] shadow-2xl font-sans text-xs min-w-56 animate-in fade-in duration-150"
    >
      {@render children?.()}
    </div>
  {/if}
</div>
