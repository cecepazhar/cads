<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentVariant, ComponentSize } from './types';

  export type AlertVariant = Extract<
    ComponentVariant,
    'neutral' | 'info' | 'success' | 'warning' | 'danger'
  > & string;
  /** @deprecated Use 'danger' instead. Kept for CATerm backward compatibility. */
  type AlertVariantWithAlias = AlertVariant | 'error';

  export type AlertSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    variant?: AlertVariantWithAlias;
    size?: AlertSize;
    title?: string;
    description?: string;
    dismissible?: boolean;
    class?: string;
    ondismiss?: () => void;
    children?: Snippet;
    action?: Snippet;
  }

  let {
    variant = 'info',
    size = 'md',
    title = '',
    description = '',
    dismissible = false,
    class: customClass = '',
    ondismiss,
    children,
    action,
  }: Props = $props();

  let visible = $state(true);

  /** Resolve deprecated 'error' alias to 'danger'. */
  const resolvedVariant = $derived<AlertVariant>(variant === 'error' ? 'danger' : variant);

  function handleDismiss() {
    visible = false;
    ondismiss?.();
  }

  const variantStyles: Record<AlertVariant, { bg: string; border: string; text: string; iconColor: string; path: string }> = {
    neutral: {
      bg: 'bg-[var(--ca-surface-subtle)]',
      border: 'border-[var(--ca-border)]',
      text: 'text-[var(--ca-text-primary)]',
      iconColor: 'text-[var(--ca-text-muted)]',
      path: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    info: {
      bg: 'bg-sky-500/10 dark:bg-sky-500/10',
      border: 'border-sky-500/30',
      text: 'text-sky-800 dark:text-sky-300',
      iconColor: 'text-sky-500',
      path: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    success: {
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-800 dark:text-emerald-300',
      iconColor: 'text-emerald-500',
      path: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    warning: {
      bg: 'bg-amber-500/10 dark:bg-amber-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-800 dark:text-amber-300',
      iconColor: 'text-amber-500',
      path: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    },
    danger: {
      bg: 'bg-rose-500/10 dark:bg-rose-500/10',
      border: 'border-rose-500/30',
      text: 'text-rose-800 dark:text-rose-300',
      iconColor: 'text-rose-500',
      path: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  };

  const sizeClasses: Record<AlertSize, string> = {
    sm: 'p-2.5 text-[11px] gap-2',
    md: 'p-3.5 text-xs gap-3',
    lg: 'p-4 text-sm gap-3.5',
  };

  const current = $derived(variantStyles[resolvedVariant]);
</script>

{#if visible}
  <div
    class="flex items-start rounded-xl border font-sans transition-all {current.bg} {current.border} {sizeClasses[size]} {customClass}"
    role="alert"
    aria-live={resolvedVariant === 'danger' ? 'assertive' : 'polite'}
  >
    <div class="shrink-0 mt-0.5 {current.iconColor}">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={current.path} />
      </svg>
    </div>

    <div class="flex-1 min-w-0">
      {#if title}
        <h4 class="font-semibold mb-0.5 {current.text}">{title}</h4>
      {/if}
      {#if description}
        <p class="opacity-90 leading-relaxed {current.text}">{description}</p>
      {/if}
      {@render children?.()}
    </div>

    {#if action}
      <div class="shrink-0 ml-2">
        {@render action()}
      </div>
    {/if}

    {#if dismissible}
      <button
        type="button"
        onclick={handleDismiss}
        class="shrink-0 p-1 rounded-md opacity-60 hover:opacity-100 transition cursor-pointer text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
        aria-label="Dismiss alert"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    {/if}
  </div>
{/if}