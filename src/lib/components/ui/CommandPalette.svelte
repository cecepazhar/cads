<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from './Icon.svelte';

  interface CommandItem {
    id: string;
    title: string;
    category: string;
    shortcut?: string;
    action: () => void;
  }

  interface Props {
    open?: boolean;
    items?: CommandItem[];
  }

  let { open = $bindable(false), items = [] }: Props = $props();
  let query = $state('');
  let selectedIndex = $state(0);

  let filtered = $derived(
    items.filter((i) =>
      i.title.toLowerCase().includes(query.toLowerCase()) ||
      i.category.toLowerCase().includes(query.toLowerCase())
    )
  );

  onMount(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        open = !open;
      } else if (open && e.key === 'Escape') {
        open = false;
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });
</script>

{#if open}
  <div
    role="presentation"
    onclick={() => (open = false)}
    class="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/70 backdrop-blur-xs"
  >
    <div
      role="dialog"
      tabindex="-1"
      onclick={(e) => e.stopPropagation()}
      class="w-full max-w-lg bg-[#111116] border border-[#272732] rounded-xl shadow-2xl overflow-hidden flex flex-col font-sans"
    >
      <!-- Search Input -->
      <div class="flex items-center gap-3 px-4 py-3 border-b border-[#272732]">
        <Icon name="search" size={16} class="text-neutral-400" />
        <input
          bind:value={query}
          placeholder="Type a command or search (e.g. Host, Snippet, Theme)..."
          class="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
        />
        <span class="text-[10px] font-mono text-neutral-500 border border-[#272732] px-1.5 py-0.5 rounded">ESC</span>
      </div>

      <!-- Results List -->
      <div class="max-h-80 overflow-y-auto p-2 space-y-1">
        {#if filtered.length === 0}
          <div class="py-8 text-center text-xs text-neutral-500">No matching commands found.</div>
        {:else}
          {#each filtered as item, idx}
            <button
              onclick={() => {
                item.action();
                open = false;
              }}
              class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer {idx === selectedIndex ? 'bg-white/10 text-white' : 'text-neutral-300 hover:bg-white/5'}"
            >
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-mono uppercase text-neutral-500 bg-[#1A1A22] px-1.5 py-0.5 rounded">{item.category}</span>
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
