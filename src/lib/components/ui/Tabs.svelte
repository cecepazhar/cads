<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentSize } from '../ui/types';

  type TabsVariant = 'underline' | 'pills' | 'segmented';
  type TabsSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  export interface TabItem {
    id: string;
    label: string;
    icon?: Snippet;
    badge?: string | number;
    disabled?: boolean;
  }

  interface Props {
    items: TabItem[];
    value?: string;
    variant?: TabsVariant;
    size?: TabsSize;
    class?: string;
    children?: Snippet;
  }

  let {
    items = [],
    value = $bindable(items[0]?.id || ''),
    variant = 'underline',
    size = 'md',
    class: customClass = '',
    children,
  }: Props = $props();

  const sizeClasses: Record<TabsSize, string> = {
    sm: 'text-[11px] px-2 py-1',
    md: 'text-xs px-3 py-1.5',
    lg: 'text-sm px-4 py-2',
  };

  const variantStyles: Record<TabsVariant, string> = {
    underline: 'border-b border-[var(--ca-border)] gap-6',
    pills: 'gap-2 bg-transparent',
    segmented: 'p-1 bg-[var(--ca-surface-subtle)] border border-[var(--ca-border)] rounded-lg gap-1',
  };

  const itemStyles: Record<TabsVariant, (active: boolean, sizeClass: string) => string> = {
    underline: (active, sizeClass) =>
      `pb-2.5 font-medium transition-all relative ${sizeClass} ${
        active
          ? 'text-[var(--ca-text-primary)] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--ca-brand)]'
          : 'text-[var(--ca-text-muted)] hover:text-[var(--ca-text-secondary)]'
      }`,
    pills: (active, sizeClass) =>
      `font-medium rounded-lg transition-all ${sizeClass} ${
        active
          ? 'bg-[var(--ca-surface-subtle)] text-[var(--ca-text-primary)] shadow-sm'
          : 'text-[var(--ca-text-muted)] hover:text-[var(--ca-text-secondary)] hover:bg-[var(--ca-surface-subtle)]'
      }`,
    segmented: (active, sizeClass) =>
      `font-medium rounded-md transition-all flex-1 text-center ${sizeClass} ${
        active
          ? 'bg-[var(--ca-surface-subtle)] text-[var(--ca-text-primary)] shadow-sm font-semibold'
          : 'text-[var(--ca-text-muted)] hover:text-[var(--ca-text-secondary)]'
      }`,
  };

  function handleKeydown(e: KeyboardEvent, index: number) {
    const enabled = items.filter((item) => !item.disabled);
    const currentEnabledIndex = enabled.findIndex((item) => item.id === items[index].id);
    let nextIndex = -1;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentEnabledIndex + 1) % enabled.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentEnabledIndex - 1 + enabled.length) % enabled.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = enabled.length - 1;
    }

    if (nextIndex >= 0) {
      const nextItem = enabled[nextIndex];
      value = nextItem.id;
      const nextBtn = document.getElementById(`tab-${nextItem.id}`);
      nextBtn?.focus();
    }
  }
</script>

<div class="w-full flex flex-col {customClass}">
  <div role="tablist" class="flex items-center {variantStyles[variant]}">
    {#each items as item, i}
      <button
        id="tab-{item.id}"
        type="button"
        role="tab"
        aria-selected={value === item.id}
        aria-controls="tabpanel-{item.id}"
        tabindex={value === item.id ? 0 : -1}
        disabled={item.disabled}
        onclick={() => (value = item.id)}
        onkeydown={(e) => handleKeydown(e, i)}
        class="inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {itemStyles[variant](value === item.id, sizeClasses[size])}"
      >
        {#if item.icon}
          {@render item.icon()}
        {/if}
        <span>{item.label}</span>
        {#if item.badge !== undefined}
          <span class="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-[var(--ca-surface-subtle)] text-[var(--ca-text-secondary)]">
            {item.badge}
          </span>
        {/if}
      </button>
    {/each}
  </div>

  {#if children}
    <div
      id="tabpanel-{value}"
      role="tabpanel"
      aria-labelledby="tab-{value}"
      class="mt-4"
    >
      {@render children()}
    </div>
  {/if}
</div>