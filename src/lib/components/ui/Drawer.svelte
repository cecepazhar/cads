<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentVariant, ComponentSize } from './types';
  import { focusTrap, uid } from '../../utils/a11y';

  type DrawerVariant = Extract<ComponentVariant, 'primary' | 'outline'>;
  type DrawerSize = Extract<ComponentSize, 'sm' | 'md' | 'lg' | 'xl'> | 'full';

  interface Props {
    open?: boolean;
    position?: 'left' | 'right' | 'top' | 'bottom';
    title?: string;
    variant?: DrawerVariant;
    size?: DrawerSize;
    class?: string;
    children?: Snippet;
  }

  let {
    open = $bindable(false),
    position = 'right',
    title = '',
    variant = 'primary',
    size = 'md',
    class: customClass = '',
    children,
  }: Props = $props();

  const titleId = uid('drawer-title');

  const posClasses = {
    right: 'inset-y-0 right-0 w-80 sm:w-96 border-l',
    left: 'inset-y-0 left-0 w-80 sm:w-96 border-r',
    top: 'inset-x-0 top-0 h-80 border-b',
    bottom: 'inset-x-0 bottom-0 h-80 border-t',
  };

  function handleClose() {
    open = false;
  }

  function handleBackdrop(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }
</script>

{#if open}
  <div
    class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex transition-opacity"
    onclick={handleBackdrop}
    role="dialog"
    tabindex="-1"
    aria-modal="true"
    aria-labelledby={title ? titleId : undefined}
    use:focusTrap={{ onEscape: handleClose, returnFocus: true }}
  >
    <div
      class="fixed bg-[var(--ca-surface-elevated)] border-neutral-800 shadow-2xl flex flex-col z-50 text-neutral-200 {posClasses[position]} {customClass}"
    >
      <div class="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
        <h3 id={titleId} class="text-sm font-semibold text-white">{title || 'Panel'}</h3>
        <button
          type="button"
          onclick={handleClose}
          class="text-neutral-400 hover:text-white p-1 rounded-md hover:bg-neutral-800 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
          aria-label="Close"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="p-5 flex-1 overflow-y-auto">
        {@render children?.()}
      </div>
    </div>
  </div>
{/if}