<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: customClass = '', children }: Props = $props();
</script>

<kbd
  class="inline-flex items-center justify-center font-mono text-[11px] font-semibold px-1.5 py-0.5 rounded border border-neutral-700 bg-neutral-900 text-neutral-300 shadow-xs select-none {customClass}"
>
  {@render children?.()}
</kbd>
