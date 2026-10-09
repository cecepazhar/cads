<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    max?: number;
    spacing?: 'tight' | 'normal' | 'loose';
    class?: string;
    children?: Snippet;
  }

  let {
    max,
    spacing = 'tight',
    class: customClass = '',
    children,
  }: Props = $props();

  const spacingClasses = {
    tight: '-space-x-3',
    normal: '-space-x-2',
    loose: '-space-x-1',
  };
</script>

<div class="inline-flex items-center {spacingClasses[spacing]} {customClass}">
  {@render children?.()}
</div>
