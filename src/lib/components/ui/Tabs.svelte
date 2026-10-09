<script lang="ts">
  import type { Snippet } from 'svelte';

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
    variant?: 'underline' | 'pills' | 'segmented';
    class?: string;
    children?: Snippet;
  }

  let {
    items = [],
    value = $bindable(items[0]?.id || ''),
    variant = 'underline',
    class: customClass = '',
    children,
  }: Props = $props();

  const variantStyles = {
    underline: 'border-b border-neutral-800 gap-6',
    pills: 'gap-2 bg-transparent',
    segmented: 'p-1 bg-neutral-900 border border-neutral-800 rounded-lg gap-1',
  };

  const itemStyles = {
    underline: (active: boolean) =>
      `pb-2.5 text-xs font-medium transition-all relative ${
        active
          ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--ca-brand)]'
          : 'text-neutral-400 hover:text-neutral-200'
      }`,
    pills: (active: boolean) =>
      `px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
        active
          ? 'bg-neutral-800 text-white shadow-sm'
          : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
      }`,
    segmented: (active: boolean) =>
      `px-3 py-1.5 text-xs font-medium rounded-md transition-all flex-1 text-center ${
        active
          ? 'bg-neutral-800 text-white shadow-sm font-semibold'
          : 'text-neutral-400 hover:text-neutral-200'
      }`,
  };
</script>

<div class="w-full flex flex-col {customClass}">
  <div class="flex items-center {variantStyles[variant]}">
    {#each items as item}
      <button
        type="button"
        disabled={item.disabled}
        onclick={() => (value = item.id)}
        class="inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed {itemStyles[variant](value === item.id)}"
      >
        {#if item.icon}
          {@render item.icon()}
        {/if}
        <span>{item.label}</span>
        {#if item.badge !== undefined}
          <span class="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-neutral-800 text-neutral-300">
            {item.badge}
          </span>
        {/if}
      </button>
    {/each}
  </div>

  {#if children}
    <div class="mt-4">
      {@render children()}
    </div>
  {/if}
</div>
