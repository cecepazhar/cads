<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentSize } from './types';

  type KbdSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    size?: KbdSize;
    class?: string;
    children?: Snippet;
  }

  let { size = 'sm', class: customClass = '', children }: Props = $props();

  const sizeClasses: Record<KbdSize, string> = {
    sm: 'text-[11px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-2.5 py-1.5',
  };
</script>

<kbd
  class="inline-flex items-center justify-center font-mono font-semibold rounded border border-[var(--ca-border)] bg-[var(--ca-surface-elevated)] text-[var(--ca-text-secondary)] shadow-xs select-none {sizeClasses[size]} {customClass}"
>
  {@render children?.()}
</kbd>