<script lang="ts">
  import type { ComponentVariant, ComponentSize } from './types';
  import { X, Bell, AlertCircle, Info } from 'lucide-svelte';

  export interface NotificationItem {
    id: string;
    title: string;
    description?: string;
    variant?: Extract<ComponentVariant, 'primary' | 'secondary' | 'danger' | 'ghost'>;
    read?: boolean;
    timestamp?: string;
  }

  type NotificationCenterSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    items?: NotificationItem[];
    variant?: Extract<ComponentVariant, 'primary' | 'secondary' | 'danger' | 'ghost'>;
    size?: NotificationCenterSize;
    onClose?: (id: string) => void;
    class?: string;
  }

  let {
    items = [],
    variant = 'primary',
    size = 'md',
    onClose,
    class: customClass = '',
  }: Props = $props();

  const sizeClasses: Record<NotificationCenterSize, string> = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const variantClasses: Record<string, string> = {
    primary: 'bg-[var(--ca-surface-elevated)] border-[var(--ca-border)]',
    secondary: 'bg-[var(--ca-surface-subtle)] border-[var(--ca-border)]',
    danger: 'border-rose-500/30 bg-rose-500/10',
    ghost: 'bg-transparent border-transparent',
  };
</script>

<div
  role="region"
  aria-label="Notifications"
  class="{variantClasses[variant]} border rounded-xl shadow-lg {sizeClasses[size]} {customClass}"
>
  {#each items as item (item.id)}
    <div class="flex items-start gap-3 p-3 hover:bg-[var(--ca-surface-subtle)] transition-colors">
      {#if item.variant === 'danger'}
        <AlertCircle class="w-4 h-4 shrink-0 mt-0.5 text-rose-400" aria-hidden="true" />
      {:else if item.variant === 'secondary'}
        <Bell class="w-4 h-4 shrink-0 mt-0.5 text-[var(--ca-text-secondary)]" aria-hidden="true" />
      {:else}
        <Info class="w-4 h-4 shrink-0 mt-0.5 text-[var(--ca-brand)]" aria-hidden="true" />
      {/if}
      <div class="flex-1 min-w-0">
        <p class="font-medium truncate">{item.title}</p>
        {#if item.description}
          <p class="text-[var(--ca-text-muted)] text-xs truncate">{item.description}</p>
        {/if}
        {#if item.timestamp}
          <p class="text-[10px] text-[var(--ca-text-muted)] mt-0.5">{item.timestamp}</p>
        {/if}
      </div>
      {#if onClose}
        <button
          type="button"
          aria-label="Dismiss notification"
          onclick={() => onClose(item.id)}
          class="text-[var(--ca-text-muted)] hover:text-[var(--ca-text-primary)] p-1 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)]"
        >
          <X class="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      {/if}
    </div>
  {/each}
</div>
