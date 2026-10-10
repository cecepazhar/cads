<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentVariant, ComponentSize } from '../ui/types';
  import { uid } from '../../utils/a11y';

  type CollapsibleVariant = Extract<ComponentVariant, 'primary' | 'outline' | 'ghost'>;
  type CollapsibleSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    open?: boolean;
    title?: string;
    variant?: CollapsibleVariant;
    size?: CollapsibleSize;
    class?: string;
    children?: Snippet;
  }

  let {
    open = $bindable(false),
    title = '',
    variant = 'primary',
    size = 'md',
    class: customClass = '',
    children,
  }: Props = $props();

  const triggerId = uid('collapsible-trigger');
  const panelId = uid('collapsible-panel');

  const variantClasses: Record<CollapsibleVariant, string> = {
    primary: 'border-[var(--ca-border)] bg-[var(--ca-surface-elevated)]',
    outline: 'border-[var(--ca-border)] bg-transparent',
    ghost: 'border-transparent bg-transparent',
  };

  const sizeClasses: Record<CollapsibleSize, string> = {
    sm: 'text-[11px] px-3 py-2',
    md: 'text-xs px-4 py-3',
    lg: 'text-sm px-5 py-4',
  };
</script>

<div class="rounded-lg border overflow-hidden {variantClasses[variant]} {customClass}">
  <button
    id={triggerId}
    type="button"
    aria-expanded={open}
    aria-controls={panelId}
    onclick={() => (open = !open)}
    class="w-full flex items-center justify-between text-left font-medium text-[var(--ca-text-primary)] hover:bg-[var(--ca-surface-subtle)] transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {sizeClasses[size]}"
  >
    <span>{title}</span>
    <svg
      class="w-4 h-4 text-[var(--ca-text-muted)] transition-transform {open ? 'rotate-180' : ''}"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
  </button>
  {#if open}
    <div
      id={panelId}
      role="region"
      aria-labelledby={triggerId}
      class="border-t border-[var(--ca-border)] text-[var(--ca-text-secondary)] {sizeClasses[size]}"
    >
      {@render children?.()}
    </div>
  {/if}
</div>