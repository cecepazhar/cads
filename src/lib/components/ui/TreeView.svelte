<script lang="ts">
  import { Folder, File, ChevronRight } from 'lucide-svelte';
  import { tick } from 'svelte';
  import type { ComponentVariant, ComponentSize } from './types';

  type TreeVariant = Extract<ComponentVariant, 'primary' | 'ghost'>;
  type TreeSize = Extract<ComponentSize, 'sm' | 'md'>;

  export interface TreeNode {
    id: string;
    name: string;
    isFolder?: boolean;
    children?: TreeNode[];
  }

  interface Props {
    nodes: TreeNode[];
    variant?: TreeVariant;
    size?: TreeSize;
    class?: string;
  }

  let { nodes = [], variant = 'primary', size = 'md', class: customClass = '' }: Props = $props();
  let expanded = $state<Record<string, boolean>>({});
  let focusedId = $state<string>('');
  let containerEl: HTMLDivElement | undefined = $state();

  interface FlatNode {
    id: string;
    depth: number;
    isFolder: boolean;
    node: TreeNode;
  }

  function flattenVisible(nodeList: TreeNode[], depth = 0): FlatNode[] {
    const result: FlatNode[] = [];
    for (const node of nodeList) {
      result.push({ id: node.id, depth, isFolder: !!node.isFolder, node });
      if (node.isFolder && expanded[node.id] && node.children) {
        result.push(...flattenVisible(node.children, depth + 1));
      }
    }
    return result;
  }

  let visibleNodes = $derived(flattenVisible(nodes));

  function toggle(id: string) {
    expanded[id] = !expanded[id];
  }

  function findNodeById(nodeList: TreeNode[], id: string): TreeNode | undefined {
    for (const node of nodeList) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return undefined;
  }

  function findParentId(nodeList: TreeNode[], childId: string, parentId?: string): string | undefined {
    for (const node of nodeList) {
      if (node.id === childId) return parentId;
      if (node.children) {
        const found = findParentId(node.children, childId, node.id);
        if (found !== undefined) return found;
      }
    }
    return undefined;
  }

  function handleKeydown(event: KeyboardEvent) {
    const currentIdx = visibleNodes.findIndex((n) => n.id === focusedId);
    if (currentIdx === -1) return;

    const currentFlat = visibleNodes[currentIdx];
    const currentNode = currentFlat.node;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (currentIdx < visibleNodes.length - 1) {
          focusedId = visibleNodes[currentIdx + 1].id;
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (currentIdx > 0) {
          focusedId = visibleNodes[currentIdx - 1].id;
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (currentFlat.isFolder) {
          if (!expanded[currentNode.id]) {
            expanded[currentNode.id] = true;
          } else if (currentNode.children && currentNode.children.length > 0) {
            focusedId = currentNode.children[0].id;
          }
        }
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (currentFlat.isFolder && expanded[currentNode.id]) {
          expanded[currentNode.id] = false;
        } else {
          const parentId = findParentId(nodes, focusedId);
          if (parentId) focusedId = parentId;
        }
        break;
      case 'Home':
        event.preventDefault();
        if (visibleNodes.length > 0) focusedId = visibleNodes[0].id;
        break;
      case 'End':
        event.preventDefault();
        if (visibleNodes.length > 0) focusedId = visibleNodes[visibleNodes.length - 1].id;
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (currentFlat.isFolder) {
          toggle(currentNode.id);
        }
        break;
    }
  }

  $effect(() => {
    if (!focusedId && visibleNodes.length > 0) {
      focusedId = visibleNodes[0].id;
    }
  });

  $effect(() => {
    const id = focusedId;
    if (!id || !containerEl) return;
    tick().then(() => {
      const el = containerEl?.querySelector(`[data-tree-id="${id}"]`) as HTMLElement | null;
      if (el && document.activeElement !== el) {
        el.focus();
      }
    });
  });

  const sizeClasses: Record<TreeSize, string> = {
    sm: 'text-[11px] py-0.5',
    md: 'text-xs py-1',
  };

  const hoverClass: Record<TreeVariant, string> = {
    primary: 'hover:bg-neutral-800/60',
    ghost: 'hover:bg-neutral-800/30',
  };
</script>

{#snippet renderNode(node: TreeNode, depth: number)}
  {@const isFolder = !!node.isFolder}
  {@const isExpanded = isFolder && expanded[node.id]}
  <div
    role="treeitem"
    aria-expanded={isFolder ? isExpanded : undefined}
    tabindex={focusedId === node.id ? 0 : -1}
    data-tree-id={node.id}
    class="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
    onclick={() => {
      if (isFolder) toggle(node.id);
      focusedId = node.id;
    }}
  >
    <div
      class="flex items-center gap-2 {sizeClasses[size]} px-2 rounded cursor-pointer {hoverClass[variant]} text-neutral-300 hover:text-white transition"
      style="padding-left: {depth * 16 + 8}px;"
    >
      {#if isFolder}
        <ChevronRight class="w-3.5 h-3.5 shrink-0 transition-transform {isExpanded ? 'rotate-90' : ''}" />
        <Folder class="w-3.5 h-3.5 shrink-0 text-amber-400" />
      {:else}
        <span class="w-3.5 shrink-0"></span>
        <File class="w-3.5 h-3.5 shrink-0 text-neutral-400" />
      {/if}
      <span>{node.name}</span>
    </div>
    {#if isFolder && isExpanded && node.children}
      <div role="group">
        {#each node.children as child}
          {@render renderNode(child, depth + 1)}
        {/each}
      </div>
    {/if}
  </div>
{/snippet}

<div
  bind:this={containerEl}
  role="tree"
  aria-label="Tree view"
  class="flex flex-col w-full font-mono {customClass}"
  onkeydown={handleKeydown}
>
  {#each nodes as node}
    {@render renderNode(node, 0)}
  {/each}
</div>