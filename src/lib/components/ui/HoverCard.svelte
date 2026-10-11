<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentVariant, ComponentSize } from './types';
  import { uid } from '../../utils/a11y';

  type HoverCardVariant = Extract<ComponentVariant, 'primary' | 'outline'>;
  type HoverCardSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    open?: boolean;
    variant?: HoverCardVariant;
    size?: HoverCardSize;
    class?: string;
    trigger?: Snippet;
    children?: Snippet;
  }

  let {
    open = $bindable(false),
    variant = 'primary',
    size = 'md',
    class: customClass = '',
    trigger,
    children,
  }: Props = $props();

  const bubbleId = uid('hover-card');

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      open = false;
    }
  }
</script>

<div
  class="relative inline-block {customClass}"
  onmouseenter={() => (open = true)}
  onmouseleave={() => (open = false)}
  onfocusin={() => (open = true)}
  onfocusout={() => (open = false)}
  onkeydown={handleKeydown}
>
  <span
    aria-expanded={open}
    aria-describedby={open ? bubbleId : undefined}
  >
    {#if trigger}
      {@render trigger()}
    {/if}
  </span>

  {#if open}
    <div
      id={bubbleId}
      role="tooltip"
      class="absolute z-40 mt-2 p-3 rounded-xl border border-[var(--ca-border)] bg-[var(--ca-surface-elevated)] text-[var(--ca-text-primary)] shadow-2xl font-sans text-xs min-w-56 animate-in fade-in duration-150"
    >
      {@render children?.()}
    </div>
  {/if}
</div>