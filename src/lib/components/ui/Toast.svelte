<script lang="ts">
  import { toast } from './toast.svelte';
  import type { ComponentVariant, ComponentSize } from './types';
  import { X } from 'lucide-svelte';

  type ToastSize = Extract<ComponentSize, 'sm' | 'md'>;

  interface Props {
    size?: ToastSize;
    class?: string;
  }

  let { size = 'md', class: customClass = '' }: Props = $props();

  const typeVariantMap: Record<string, Extract<ComponentVariant, 'info' | 'success' | 'warning' | 'danger'>> = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'danger',
  };

  const typeStyles: Record<string, string> = {
    success: 'text-emerald-400 border-emerald-500/30',
    error: 'text-rose-400 border-rose-500/30',
    warning: 'text-amber-400 border-amber-500/30',
    info: 'text-sky-400 border-sky-500/30',
  };

  const sizeStyles: Record<ToastSize, string> = {
    sm: 'p-2.5 text-[11px]',
    md: 'p-3.5 text-xs',
  };

  function isDanger(itemType?: string): boolean {
    return itemType === 'error';
  }
</script>

<div class="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none {customClass}">
  {#each toast.toasts as item (item.id)}
    {@const danger = isDanger(item.type)}
    <div
      role={danger ? 'alert' : 'status'}
      aria-live={danger ? 'assertive' : 'polite'}
      class="pointer-events-auto rounded-lg bg-[var(--ca-surface-elevated)] border {sizeStyles[size]} shadow-2xl backdrop-blur-md flex items-start justify-between gap-3 animate-in fade-in slide-in-from-top-2 {item.type ? typeStyles[item.type] : 'border-neutral-800 text-neutral-200'}"
      onmouseenter={() => toast.pause(item.id)}
      onmouseleave={() => toast.resume(item.id)}
      onfocusin={() => toast.pause(item.id)}
      onfocusout={() => toast.resume(item.id)}
    >
      <div class="flex flex-col text-left">
        <h4 class="font-semibold text-white {size === 'sm' ? 'text-[11px]' : 'text-xs'}">{item.title}</h4>
        {#if item.description}
          <p class="{size === 'sm' ? 'text-[10px]' : 'text-[11px]'} text-neutral-400 mt-0.5">{item.description}</p>
        {/if}
      </div>
      <button
        type="button"
        aria-label="Dismiss notification"
        onclick={() => toast.remove(item.id)}
        class="text-neutral-500 hover:text-white p-0.5 rounded cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
      >
        <X class="w-3.5 h-3.5" />
      </button>
    </div>
  {/each}
</div>