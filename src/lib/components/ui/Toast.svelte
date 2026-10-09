<script lang="ts">
  import { toast, type ToastMessage } from './toast.svelte';

  const typeIcons = {
    success: 'text-emerald-400 border-emerald-500/30',
    error: 'text-rose-400 border-rose-500/30',
    warning: 'text-amber-400 border-amber-500/30',
    info: 'text-sky-400 border-sky-500/30',
  };
</script>

<div class="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
  {#each toast.toasts as item (item.id)}
    <div
      class="pointer-events-auto rounded-lg bg-[#121217] border p-3.5 shadow-2xl backdrop-blur-md flex items-start justify-between gap-3 animate-in fade-in slide-in-from-top-2 {item.type ? typeIcons[item.type] : 'border-neutral-800 text-neutral-200'}"
    >
      <div class="flex flex-col text-left">
        <h4 class="text-xs font-semibold text-white">{item.title}</h4>
        {#if item.description}
          <p class="text-[11px] text-neutral-400 mt-0.5">{item.description}</p>
        {/if}
      </div>
      <button
        type="button"
        onclick={() => toast.remove(item.id)}
        class="text-neutral-500 hover:text-white p-0.5 rounded cursor-pointer"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
  {/each}
</div>
