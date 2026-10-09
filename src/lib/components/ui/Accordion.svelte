<script lang="ts">
  import type { Snippet } from 'svelte';

  export interface AccordionItem {
    id: string;
    title: string;
    content?: string;
  }

  interface Props {
    items: AccordionItem[];
    allowMultiple?: boolean;
    class?: string;
    itemContent?: Snippet<[AccordionItem]>;
  }

  let {
    items = [],
    allowMultiple = false,
    class: customClass = '',
    itemContent,
  }: Props = $props();

  let openIds = $state<string[]>([items[0]?.id || '']);

  function toggle(id: string) {
    if (openIds.includes(id)) {
      openIds = openIds.filter((x) => x !== id);
    } else {
      openIds = allowMultiple ? [...openIds, id] : [id];
    }
  }
</script>

<div class="flex flex-col gap-2 w-full {customClass}">
  {#each items as item}
    {@const isOpen = openIds.includes(item.id)}
    <div class="rounded-lg border border-neutral-800 bg-[#121217] overflow-hidden">
      <button
        type="button"
        onclick={() => toggle(item.id)}
        class="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-medium text-neutral-200 hover:bg-neutral-800/40 transition cursor-pointer"
      >
        <span>{item.title}</span>
        <svg
          class="w-4 h-4 text-neutral-400 transition-transform {isOpen ? 'rotate-180' : ''}"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
      </button>
      {#if isOpen}
        <div class="px-4 py-3 border-t border-neutral-800/60 text-xs text-neutral-300">
          {#if itemContent}
            {@render itemContent(item)}
          {:else}
            <p>{item.content || ''}</p>
          {/if}
        </div>
      {/if}
    </div>
  {/each}
</div>
