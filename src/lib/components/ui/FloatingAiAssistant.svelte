<script lang="ts">
  import type { ComponentSize } from './types';
  import { X, Send } from 'lucide-svelte';
  import { uid, clickOutside } from '../../utils/a11y';

  type FloatingAiAssistantSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;
  type FloatingAiPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

  interface Props {
    open?: boolean;
    position?: FloatingAiPosition;
    size?: FloatingAiAssistantSize;
    title?: string;
    class?: string;
    onOpenChange?: (open: boolean) => void;
  }

  let {
    open = $bindable(false),
    position = 'bottom-right',
    size = 'md',
    title = 'AI Assistant',
    class: customClass = '',
    onOpenChange,
  }: Props = $props();

  const positionCls: Record<FloatingAiPosition, string> = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };

  const widthCls: Record<FloatingAiAssistantSize, string> = {
    sm: 'w-72',
    md: 'w-80',
    lg: 'w-96',
  };

  const panelId = uid('ai-panel');

  function handleClose() {
    open = false;
    onOpenChange?.(false);
  }
</script>

{#if open}
  <div
    class="fixed z-50 flex flex-col rounded-2xl border border-[var(--ca-border)] bg-[var(--ca-surface-elevated)] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-[var(--ca-motion-duration-normal)] {widthCls[size]} {positionCls[position]} {customClass}"
    role="dialog"
    aria-modal="false"
    aria-labelledby={panelId}
    use:clickOutside={handleClose}
  >
    <div class="flex items-center justify-between px-4 py-3 border-b border-[var(--ca-border)] bg-[var(--ca-surface-subtle)]">
      <h2 id={panelId} class="text-sm font-semibold text-[var(--ca-text-primary)]">{title}</h2>
      <button
        type="button"
        aria-label="Close assistant"
        onclick={handleClose}
        class="p-1 rounded-lg text-[var(--ca-text-muted)] hover:text-[var(--ca-text-primary)] hover:bg-[var(--ca-surface)] transition-colors duration-[var(--ca-motion-duration-fast)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)]"
      >
        <X class="w-4 h-4" aria-hidden="true" />
      </button>
    </div>

    <div class="flex-1 overflow-y-auto p-4 min-h-[200px] max-h-[60vh]">
      <div class="flex justify-center py-6 text-sm text-[var(--ca-text-muted)]">Chat area</div>
    </div>

    <div class="border-t border-[var(--ca-border)] p-3">
      <div class="relative">
        <input
          type="text"
          placeholder="Ask anything…"
          aria-label="Message the AI assistant"
          class="w-full rounded-lg bg-[var(--ca-surface)] border border-[var(--ca-border)] pl-3 pr-10 py-2 text-sm text-[var(--ca-text-primary)] placeholder:text-[var(--ca-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--ca-brand)]"
        />
        <button
          type="button"
          aria-label="Send message"
          class="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-[var(--ca-brand)] text-white hover:opacity-90 transition-opacity duration-[var(--ca-motion-duration-fast)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)]"
        >
          <Send class="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
{/if}
