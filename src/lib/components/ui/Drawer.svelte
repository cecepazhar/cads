<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    open?: boolean;
    position?: 'left' | 'right' | 'top' | 'bottom';
    title?: string;
    class?: string;
    children?: Snippet;
  }

  let {
    open = $bindable(false),
    position = 'right',
    title = '',
    class: customClass = '',
    children,
  }: Props = $props();

  const posClasses = {
    right: 'inset-y-0 right-0 w-80 sm:w-96 border-l',
    left: 'inset-y-0 left-0 w-80 sm:w-96 border-r',
    top: 'inset-x-0 top-0 h-80 border-b',
    bottom: 'inset-x-0 bottom-0 h-80 border-t',
  };

  function handleBackdrop(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      open = false;
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
    onkeydown={(e) => e.key === 'Escape' && (open = false)}
  >
    <div
      class="fixed bg-[#121217] border-neutral-800 shadow-2xl flex flex-col z-50 text-neutral-200 {posClasses[position]} {customClass}"
      role="document"
    >
      <div class="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
        <h3 class="text-sm font-semibold text-white">{title || 'Panel'}</h3>
        <button
          type="button"
          onclick={() => (open = false)}
          class="text-neutral-400 hover:text-white p-1 rounded-md hover:bg-neutral-800 transition cursor-pointer"
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
