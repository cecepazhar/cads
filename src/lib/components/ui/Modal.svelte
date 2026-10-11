<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentVariant, ComponentSize } from './types';
  import { focusTrap, uid } from '../../utils/a11y';

  type ModalVariant = Extract<ComponentVariant, 'primary' | 'outline'>;
  type ModalSize = Extract<ComponentSize, 'sm' | 'md' | 'lg' | 'xl'> | 'full';

  interface Props {
    open?: boolean;
    title?: string;
    description?: string;
    variant?: ModalVariant;
    size?: ModalSize;
    closeOnEsc?: boolean;
    closeOnBackdrop?: boolean;
    showCloseButton?: boolean;
    class?: string;
    onclose?: () => void;
    children?: Snippet;
    header?: Snippet;
    footer?: Snippet;
  }

  let {
    open = $bindable(false),
    title = '',
    description = '',
    variant: _variant = 'primary',
    size = 'md',
    closeOnEsc = true,
    closeOnBackdrop = true,
    showCloseButton = true,
    class: customClass = '',
    onclose,
    children,
    header,
    footer,
  }: Props = $props();

  const titleId = uid('modal-title');
  const descId = uid('modal-desc');

  const sizeClasses: Record<ModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-xl',
    xl: 'max-w-3xl',
    full: 'max-w-[95vw] w-[95vw]',
  };

  function handleClose() {
    open = false;
    onclose?.();
  }

  function handleEscape() {
    if (closeOnEsc) {
      handleClose();
    }
  }

  function handleBackdropClick(e: MouseEvent) {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      handleClose();
    }
  }
</script>

{#if open}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs transition-opacity duration-200"
    onclick={handleBackdropClick}
    role="dialog"
    tabindex="-1"
    aria-modal="true"
    aria-labelledby={title ? titleId : undefined}
    aria-describedby={description ? descId : undefined}
    use:focusTrap={{ onEscape: handleEscape, returnFocus: true }}
  >
    <div
      class="w-full bg-[var(--ca-surface-elevated)] border border-[var(--ca-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[var(--ca-text-primary)] font-sans animate-in fade-in zoom-in-95 duration-150 {sizeClasses[size]} {customClass}"
      onclick={(e) => e.stopPropagation()}
    >
      <!-- Modal Header -->
      {#if header}
        {@render header()}
      {:else if title || showCloseButton}
        <div class="px-6 py-4 border-b border-[var(--ca-border)] flex items-center justify-between gap-3 bg-[var(--ca-surface-subtle)]">
          <div class="min-w-0 flex-1">
            {#if title}
              <h3 id={titleId} class="text-base font-semibold text-white truncate">{title}</h3>
            {/if}
            {#if description}
              <p id={descId} class="text-xs text-neutral-400 mt-0.5">{description}</p>
            {/if}
          </div>
          {#if showCloseButton}
            <button
              type="button"
              onclick={handleClose}
              class="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
              aria-label="Close"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          {/if}
        </div>
      {/if}

      <!-- Modal Body -->
      <div class="px-6 py-5 overflow-y-auto flex-1">
        {@render children?.()}
      </div>

      <!-- Modal Footer -->
      {#if footer}
        <div class="px-6 py-3.5 border-t border-[var(--ca-border)] bg-[var(--ca-surface-subtle)] flex items-center justify-end gap-2.5">
          {@render footer()}
        </div>
      {/if}
    </div>
  </div>
{/if}