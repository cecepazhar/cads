<script lang="ts">
  import type { Snippet } from 'svelte';
  import { uid } from '../../utils/a11y';

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
    delay = 0,
    class: customClass = '',
    trigger,
    children,
  }: Props = $props();

  let visible = $state(false);
  let showTimeout: ReturnType<typeof setTimeout> | undefined;

  const bubbleId = uid('tooltip');

  const placementClasses: Record<TooltipPlacement, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  function show() {
    clearTimeout(showTimeout);
    if (delay > 0) {
      showTimeout = setTimeout(() => {
        visible = true;
      }, delay);
    } else {
      visible = true;
    }
  }

  function hide() {
    clearTimeout(showTimeout);
    visible = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      hide();
    }
  }
</script>

<div
  class="relative inline-flex {customClass}"
  onmouseenter={show}
  onmouseleave={hide}
  onfocusin={show}
  onfocusout={hide}
  onkeydown={handleKeydown}
>
  <span
    aria-describedby={visible && content ? bubbleId : undefined}
  >
    {#if trigger}
      {@render trigger()}
    {:else if children}
      {@render children()}
    {/if}
  </span>

  {#if visible && content}
    <div
      id={bubbleId}
      role="tooltip"
      class="absolute z-50 pointer-events-none whitespace-nowrap rounded-md bg-neutral-900 border border-neutral-700/80 px-2 py-1 text-[11px] font-mono text-neutral-200 shadow-xl backdrop-blur-md transition-opacity duration-150 animate-in fade-in {placementClasses[placement]}"
    >
      {content}
    </div>
  {/if}
</div>