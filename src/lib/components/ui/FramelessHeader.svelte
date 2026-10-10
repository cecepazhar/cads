<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentVariant, ComponentSize } from './types';
  import Icon from './Icon.svelte';

  type FramelessHeaderVariant = Extract<ComponentVariant, 'primary' | 'ghost'>;
  type FramelessHeaderSize = Extract<ComponentSize, 'sm' | 'md'>;

  interface Props {
    title?: string;
    subtitle?: string;
    showControls?: boolean;
    onMinimize?: () => void;
    onMaximize?: () => void;
    onClose?: () => void;
    leadingSlot?: Snippet;
    trailingSlot?: Snippet;
    variant?: FramelessHeaderVariant;
    size?: FramelessHeaderSize;
  }

  let {
    title = 'CATerm',
    subtitle = '',
    showControls = true,
    onMinimize,
    onMaximize,
    onClose,
    leadingSlot,
    trailingSlot,
    variant = 'primary',
    size = 'md',
  }: Props = $props();

  const variantClasses: Record<FramelessHeaderVariant, string> = {
    primary: 'bg-[var(--ca-surface)] border-[var(--ca-border)]',
    ghost: 'bg-transparent border-transparent',
  };

  const sizeClasses: Record<FramelessHeaderSize, string> = {
    sm: 'h-8 text-[10px] px-2',
    md: 'h-10 text-xs px-3',
  };
</script>

<header
  role="banner"
  data-tauri-drag-region
  class="w-full border-b flex items-center justify-between select-none z-40 font-sans {variantClasses[variant]} {sizeClasses[size]}"
>
  <!-- Left section -->
  <div class="flex items-center gap-2.5">
    {#if leadingSlot}
      {@render leadingSlot()}
    {:else}
      <div class="w-3 h-3 rounded-full bg-[var(--ca-brand)]/80"></div>
    {/if}
    <div class="flex items-baseline gap-2">
      <span class="font-bold text-[var(--ca-text-primary)] tracking-wide">{title}</span>
      {#if subtitle}
        <span class="text-[10px] text-[var(--ca-text-muted)] font-mono">{subtitle}</span>
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
      <div class="flex items-center gap-1 border-l border-[var(--ca-border)] pl-2 ml-1">
        <button
          onclick={onMinimize}
          class="w-6 h-6 rounded flex items-center justify-center text-[var(--ca-text-muted)] hover:text-[var(--ca-text-primary)] hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
          aria-label="Minimize"
        >
          <Icon name="minus" size={12} />
        </button>
        <button
          onclick={onMaximize}
          class="w-6 h-6 rounded flex items-center justify-center text-[var(--ca-text-muted)] hover:text-[var(--ca-text-primary)] hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
          aria-label="Maximize"
        >
          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="5" y="5" width="14" height="14" rx="2" stroke-width="2" />
          </svg>
        </button>
        <button
          onclick={onClose}
          class="w-6 h-6 rounded flex items-center justify-center text-[var(--ca-text-muted)] hover:text-rose-400 hover:bg-rose-500/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
          aria-label="Close"
        >
          <Icon name="x" size={12} />
        </button>
      </div>
    {/if}
  </div>
</header>