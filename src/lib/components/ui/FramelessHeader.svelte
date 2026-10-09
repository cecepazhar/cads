<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title?: string;
    subtitle?: string;
    showControls?: boolean;
    onMinimize?: () => void;
    onMaximize?: () => void;
    onClose?: () => void;
    leadingSlot?: Snippet;
    trailingSlot?: Snippet;
  }

  let {
    title = 'CATerm',
    subtitle = '',
    showControls = true,
    onMinimize,
    onMaximize,
    onClose,
    leadingSlot,
    trailingSlot
  }: Props = $props();
</script>

<header
  data-tauri-drag-region
  class="h-10 w-full bg-[#0A0A0C] border-b border-[#1E1E24] flex items-center justify-between px-3 select-none z-40 text-xs font-sans"
>
  <!-- Left section -->
  <div class="flex items-center gap-2.5">
    {#if leadingSlot}
      {@render leadingSlot()}
    {:else}
      <div class="w-3 h-3 rounded-full bg-[var(--ca-brand,#ef4444)]/80"></div>
    {/if}
    <div class="flex items-baseline gap-2">
      <span class="font-bold text-white tracking-wide">{title}</span>
      {#if subtitle}
        <span class="text-[10px] text-neutral-500 font-mono">{subtitle}</span>
      {/if}
    </div>
  </div>

  <!-- Center draggable space -->
  <div data-tauri-drag-region class="flex-1 h-full"></div>

  <!-- Right section / Window controls -->
  <div class="flex items-center gap-2">
    {#if trailingSlot}
      {@render trailingSlot()}
    {/if}

    {#if showControls}
      <div class="flex items-center gap-1 border-l border-[#1E1E24] pl-2 ml-1">
        <button
          onclick={onMinimize}
          class="w-6 h-6 rounded flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          title="Minimize"
        >
          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
          </svg>
        </button>
        <button
          onclick={onMaximize}
          class="w-6 h-6 rounded flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          title="Maximize"
        >
          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="5" y="5" width="14" height="14" rx="2" stroke-width="2" />
          </svg>
        </button>
        <button
          onclick={onClose}
          class="w-6 h-6 rounded flex items-center justify-center text-neutral-400 hover:text-white hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
          title="Close"
        >
          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    {/if}
  </div>
</header>
