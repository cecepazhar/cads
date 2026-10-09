<script lang="ts">
  import type { Snippet } from 'svelte';

  export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

  interface Props {
    content?: string;
    placement?: TooltipPlacement;
    delay?: number;
    class?: string;
    trigger?: Snippet;
    children?: Snippet;
  }

  let {
    content = '',
    placement = 'top',
    class: customClass = '',
    trigger,
    children,
  }: Props = $props();

  let visible = $state(false);

  const placementClasses: Record<TooltipPlacement, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };
</script>

<div
  class="relative inline-flex {customClass}"
  role="tooltip"
  onmouseenter={() => (visible = true)}
  onmouseleave={() => (visible = false)}
  onfocusin={() => (visible = true)}
  onfocusout={() => (visible = false)}
>
  {#if trigger}
    {@render trigger()}
  {:else if children}
    {@render children()}
  {/if}

  {#if visible && content}
    <div
      class="absolute z-50 pointer-events-none whitespace-nowrap rounded-md bg-neutral-900 border border-neutral-700/80 px-2 py-1 text-[11px] font-mono text-neutral-200 shadow-xl backdrop-blur-md transition-opacity duration-150 animate-in fade-in {placementClasses[placement]}"
    >
      {content}
    </div>
  {/if}
</div>
