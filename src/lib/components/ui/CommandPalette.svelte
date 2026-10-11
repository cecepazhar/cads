<script lang="ts">
  import type { ComponentVariant, ComponentSize } from './types';
  import { focusTrap, uid } from '../../utils/a11y';
  import Icon from './Icon.svelte';

  interface CommandItem {
    id: string;
    title: string;
    category: string;
    shortcut?: string;
    action: () => void;
  }

  type CommandPaletteVariant = Extract<ComponentVariant, 'primary' | 'outline'>;
  type CommandPaletteSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    open?: boolean;
    items?: CommandItem[];
    variant?: CommandPaletteVariant;
    size?: CommandPaletteSize;
  }

  let {
    open = $bindable(false),
    items = [],
    variant = 'primary',
    size = 'md',
  }: Props = $props();

  let query = $state('');
  let selectedIndex = $state(0);

  const listboxId = uid('cmd-listbox');

  let filtered = $derived(
    items.filter((i) =>
      i.title.toLowerCase().includes(query.toLowerCase()) ||
      i.category.toLowerCase().includes(query.toLowerCase())
    )
  );

  // Reset selectedIndex when query changes
  $effect(() => {
    void query;
    selectedIndex = 0;
  });

  // Compute the active descendant id for aria-activedescendant
  let activeDescendantId = $derived(
    filtered.length > 0 && selectedIndex >= 0 && selectedIndex < filtered.length
      ? `cmd-option-${filtered[selectedIndex].id}`
      : undefined
  );

  function handleInputKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (selectedIndex < filtered.length - 1) {
          selectedIndex++;
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (selectedIndex > 0) {
          selectedIndex--;
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
          open = false;
        }
        break;
      case 'Escape':
        e.preventDefault();
        open = false;
        break;
    }
  }

  function handleItemClick(item: CommandItem) {
    item.action();
    open = false;
  }

  function handleClose() {
    open = false;
  }
</script>

{#if open}
  <div
    role="presentation"
    onclick={handleClose}
    class="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/70 backdrop-blur-xs"
  >
    <div
      role="dialog"
      tabindex="-1"
      aria-label="Command palette"
      onclick={(e) => e.stopPropagation()}
      class="w-full max-w-lg bg-[var(--ca-surface-elevated)] border border-[var(--ca-border)] rounded-xl shadow-2xl overflow-hidden flex flex-col font-sans"
      use:focusTrap={{ onEscape: handleClose, returnFocus: true }}
    >
      <!-- Search Input -->
      <div class="flex items-center gap-3 px-4 py-3 border-b border-[var(--ca-border)]">
        <Icon name="search" size={16} class="text-neutral-400" />
        <input
          bind:value={query}
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={activeDescendantId}
          onkeydown={handleInputKeydown}
          placeholder="Type a command or search (e.g. Host, Snippet, Theme)..."
          class="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
        />
        <span class="text-[10px] font-mono text-neutral-500 border border-[var(--ca-border)] px-1.5 py-0.5 rounded">ESC</span>
      </div>

      <!-- Results List -->
      <div
        id={listboxId}
        role="listbox"
        class="max-h-80 overflow-y-auto p-2 space-y-1"
      >
        {#if filtered.length === 0}
          <div class="py-8 text-center text-xs text-neutral-500">No matching commands found.</div>
        {:else}
          {#each filtered as item, idx (item.id)}
            <button
              id="cmd-option-{item.id}"
              role="option"
              aria-selected={idx === selectedIndex}
              onclick={() => handleItemClick(item)}
              onmouseenter={() => (selectedIndex = idx)}
              class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer {idx === selectedIndex ? 'bg-white/10 text-white' : 'text-neutral-300 hover:bg-white/5'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
            >
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-mono uppercase text-neutral-500 bg-[var(--ca-surface-subtle)] px-1.5 py-0.5 rounded">{item.category}</span>
                <span class="font-medium">{item.title}</span>
              </div>
              {#if item.shortcut}
                <span class="text-[10px] font-mono text-neutral-400">{item.shortcut}</span>
              {/if}
            </button>
          {/each}
        {/if}
      </div>
    </div>
  </div>
{/if}