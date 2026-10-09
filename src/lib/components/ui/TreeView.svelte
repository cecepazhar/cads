<script lang="ts">
  export interface TreeNode {
    id: string;
    name: string;
    isFolder?: boolean;
    children?: TreeNode[];
  }

  interface Props {
    nodes: TreeNode[];
    class?: string;
  }

  let { nodes = [], class: customClass = '' }: Props = $props();
  let expanded = $state<Record<string, boolean>>({});

  function toggle(id: string) {
    expanded[id] = !expanded[id];
  }
</script>

{#snippet renderNode(node: TreeNode, depth: number)}
  <div class="flex flex-col">
    <button
      type="button"
      onclick={() => (node.isFolder ? toggle(node.id) : null)}
      class="flex items-center gap-2 py-1 px-2 rounded hover:bg-neutral-800/60 text-xs text-neutral-300 hover:text-white transition cursor-pointer"
      style="padding-left: {depth * 16 + 8}px;"
    >
      {#if node.isFolder}
        <svg class="w-3.5 h-3.5 text-neutral-500 transition-transform {expanded[node.id] ? 'rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        <span class="text-amber-400 font-mono">📁</span>
      {:else}
        <span class="w-3.5"></span>
        <span class="text-neutral-400 font-mono">📄</span>
      {/if}
      <span>{node.name}</span>
    </button>
    {#if node.isFolder && expanded[node.id] && node.children}
      {#each node.children as child}
        {@render renderNode(child, depth + 1)}
      {/each}
    {/if}
  </div>
{/snippet}

<div class="flex flex-col w-full font-mono {customClass}">
  {#each nodes as node}
    {@render renderNode(node, 0)}
  {/each}
</div>
