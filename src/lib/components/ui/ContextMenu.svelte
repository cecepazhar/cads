<script lang="ts">
  import type { Snippet } from 'svelte';

  export interface ContextMenuItem {
    id?: string;
    label: string;
    icon?: Snippet;
    shortcut?: string;
    danger?: boolean;
    disabled?: boolean;
    action?: () => void;
  }

  interface Props {
    items: ContextMenuItem[];
    open?: boolean;
    x?: number;
    y?: number;
    class?: string;
  }

  let {
    items = [],
    open = $bindable(false),
    x = $bindable(0),
    y = $bindable(0),
    class: customClass = '',
  }: Props = $props();

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.cads-context-menu')) {
      open = false;
    }
  }

  $effect(() => {
    if (open) {
      window.addEventListener('click', handleClickOutside);
      window.addEventListener('contextmenu', handleClickOutside);
      return () => {
        window.removeEventListener('click', handleClickOutside);
        window.removeEventListener('contextmenu', handleClickOutside);
      };
    }
  });
</script>

{#if open}
  <div
    class="cads-context-menu fixed z-50 min-w-[180px] rounded-lg bg-neutral-900 border border-neutral-800 p-1 shadow-2xl backdrop-blur-md {customClass}"
    style="left: {x}px; top: {y}px;"
    role="menu"
    tabindex="-1"
  >
    <div class="py-0.5">
      {#each items as item}
        <button
          type="button"
          disabled={item.disabled}
          onclick={() => {
            if (!item.disabled) {
              item.action?.();
              open = false;
            }
          }}
          class="group flex w-full items-center justify-between gap-3 rounded-md px-2.5 py-1.5 text-xs text-left transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed {item.danger ? 'text-rose-400 hover:bg-rose-500/10' : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'}"
        >
          <span class="flex items-center gap-2">
            {#if item.icon}
              {@render item.icon()}
            {/if}
            <span>{item.label}</span>
          </span>
          {#if item.shortcut}
            <kbd class="font-mono text-[10px] text-neutral-500 group-hover:text-neutral-400">{item.shortcut}</kbd>
          {/if}
        </button>
      {/each}
    </div>
  </div>
{/if}
