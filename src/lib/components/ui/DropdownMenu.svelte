<script lang="ts">
  import type { Snippet } from 'svelte';

  export interface DropdownItem {
    id?: string;
    label: string;
    icon?: Snippet;
    shortcut?: string;
    danger?: boolean;
    disabled?: boolean;
    action?: () => void;
  }

  interface Props {
    items: DropdownItem[];
    trigger?: Snippet;
    align?: 'left' | 'right';
    class?: string;
    children?: Snippet;
  }

  let {
    items = [],
    trigger,
    align = 'left',
    class: customClass = '',
    children,
  }: Props = $props();

  let open = $state(false);

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.cads-dropdown-container')) {
      open = false;
    }
  }

  $effect(() => {
    if (open) {
      window.addEventListener('click', handleClickOutside);
      return () => window.removeEventListener('click', handleClickOutside);
    }
  });
</script>

<div class="cads-dropdown-container relative inline-block text-left {customClass}">
  <div onclick={() => (open = !open)} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && (open = !open)}>
    {#if trigger}
      {@render trigger()}
    {:else if children}
      {@render children()}
    {/if}
  </div>

  {#if open}
    <div
      class="absolute z-50 mt-1 min-w-[180px] rounded-lg bg-neutral-900 border border-neutral-800 p-1 shadow-2xl backdrop-blur-md focus:outline-none {align === 'right' ? 'right-0' : 'left-0'}"
    >
      <div class="py-1">
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
</div>
