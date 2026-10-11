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

<div class="flex items-center gap-1.5 {customClass}">
  {@render children?.()}
</div>
