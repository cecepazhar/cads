<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
    class?: string;
  }

  let {
    children,
    class: customClass = '',
  }: Props = $props();
</script>

<div
  role="main"
  class="min-h-screen bg-[var(--ca-canvas)] {customClass}"
>
  {@render children?.()}
</div>
