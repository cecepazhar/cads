<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentVariant, ComponentSize } from './types';
  import { ChevronLeft } from 'lucide-svelte';

  type SidebarVariant = Extract<ComponentVariant, 'primary' | 'ghost'>;
  type SidebarSize = Extract<ComponentSize, 'sm' | 'md'>;

  interface Props {
    collapsed?: boolean;
    variant?: SidebarVariant;
    size?: SidebarSize;
    class?: string;
    header?: Snippet;
    footer?: Snippet;
    children?: Snippet;
  }

  let {
    collapsed = $bindable(false),
    variant = 'primary',
    size = 'md',
    class: customClass = '',
    header,
    footer,
    children,
  }: Props = $props();

  const variantBg: Record<SidebarVariant, string> = {
    primary: 'bg-white dark:bg-[var(--ca-surface)]',
    ghost: 'bg-transparent',
  };

  const sizePadding: Record<SidebarSize, string> = {
    sm: 'p-1.5',
    md: 'p-2',
  };
</script>

<aside
  class="flex flex-col h-full {variantBg[variant]} border-r border-neutral-200 dark:border-[var(--ca-border)] select-none transition-all duration-200 {collapsed ? 'w-16' : 'w-64'} {customClass}"
  aria-label="Sidebar navigation"
>
  <div class="p-2 flex {collapsed ? 'justify-center' : 'justify-end'}">
    <button
      type="button"
      aria-expanded={!collapsed}
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      onclick={() => (collapsed = !collapsed)}
      class="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
    >
      <ChevronLeft class="w-4 h-4 transition-transform {collapsed ? 'rotate-180' : ''}" />
    </button>
  </div>

  {#if header}
    <div class="{sizePadding[size]} border-b border-neutral-200 dark:border-[var(--ca-border)] flex items-center {collapsed ? 'justify-center' : 'justify-between'}">
      {@render header()}
    </div>
  {/if}

  <nav class="flex-1 overflow-y-auto {sizePadding[size]} space-y-1">
    {@render children?.()}
  </nav>

  {#if footer}
    <div class="{sizePadding[size]} border-t border-neutral-200 dark:border-[var(--ca-border)]">
      {@render footer()}
    </div>
  {/if}
</aside>