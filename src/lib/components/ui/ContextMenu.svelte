<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentVariant, ComponentSize } from './types';
  import { clickOutside, uid } from '../../utils/a11y';

  export interface ContextMenuItem {
    id?: string;
    label: string;
    icon?: Snippet;
    shortcut?: string;
    danger?: boolean;
    disabled?: boolean;
    action?: () => void;
  }

  type ContextMenuVariant = Extract<ComponentVariant, 'primary' | 'outline'>;
  type ContextMenuSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    items: ContextMenuItem[];
    open?: boolean;
    x?: number;
    y?: number;
    variant?: ContextMenuVariant;
    size?: ContextMenuSize;
    class?: string;
  }

  let {
    items = [],
    open = $bindable(false),
    x = $bindable(0),
    y = $bindable(0),
    variant = 'primary',
    size = 'md',
    class: customClass = '',
  }: Props = $props();

  let activeIndex = $state(0);

  const menuId = uid('context-menu');

  function close() {
    open = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    const enabled = items
      .map((item, i) => ({ item, i }))
      .filter(({ item }) => !item.disabled);
    if (enabled.length === 0) return;

    const currentIdx = enabled.findIndex(({ i }) => i === activeIndex);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        activeIndex = currentIdx < enabled.length - 1
          ? enabled[currentIdx + 1].i
          : enabled[0].i;
        break;
      case 'ArrowUp':
        e.preventDefault();
        activeIndex = currentIdx > 0
          ? enabled[currentIdx - 1].i
          : enabled[enabled.length - 1].i;
        break;
      case 'Home':
        e.preventDefault();
        activeIndex = enabled[0].i;
        break;
      case 'End':
        e.preventDefault();
        activeIndex = enabled[enabled.length - 1].i;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        items[activeIndex]?.action?.();
        close();
        break;
      case 'Escape':
        e.preventDefault();
        close();
        break;
    }
  }

  $effect(() => {
    if (open) {
      const first = items.findIndex((i) => !i.disabled);
      activeIndex = first >= 0 ? first : 0;
    }
  });

  $effect(() => {
    if (open) {
      const container = document.getElementById(menuId);
      const active = container?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
      active?.focus();
    }
  });
</script>

{#if open}
  <div
    id={menuId}
    class="fixed z-50 min-w-[180px] rounded-lg bg-neutral-900 border border-neutral-800 p-1 shadow-2xl backdrop-blur-md {customClass}"
    style="left: {x}px; top: {y}px;"
    role="menu"
    tabindex="-1"
    onkeydown={handleKeydown}
    use:clickOutside={close}
  >
    <div class="py-0.5">
      {#each items as item, idx}
        <button
          type="button"
          role="menuitem"
          data-index={idx}
          tabindex={idx === activeIndex ? 0 : -1}
          disabled={item.disabled}
          aria-disabled={item.disabled ? true : undefined}
          onclick={() => {
            if (!item.disabled) {
              item.action?.();
              close();
            }
          }}
          onmouseenter={() => { if (!item.disabled) activeIndex = idx; }}
          class="group flex w-full items-center justify-between gap-3 rounded-md px-2.5 py-1.5 text-xs text-left transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed {item.danger ? 'text-rose-400 hover:bg-rose-500/10' : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
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