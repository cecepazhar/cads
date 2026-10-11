<script lang="ts">
  import type { ComponentVariant, ComponentSize } from './types';

  type BreadcrumbVariant = Extract<ComponentVariant, 'primary' | 'ghost'>;
  type BreadcrumbSize = Extract<ComponentSize, 'sm' | 'md'>;

  export interface BreadcrumbItem {
    label: string;
    href?: string;
  }

  interface Props {
    items: BreadcrumbItem[];
    separator?: string;
    variant?: BreadcrumbVariant;
    size?: BreadcrumbSize;
    class?: string;
  }

  let { items = [], separator = '/', variant = 'primary', size = 'sm', class: customClass = '' }: Props = $props();

  const variantClasses: Record<BreadcrumbVariant, string> = {
    primary: 'text-neutral-400',
    ghost: 'text-neutral-500',
  };

  const sizeClasses: Record<BreadcrumbSize, string> = {
    sm: 'text-xs',
    md: 'text-sm',
  };
</script>

<nav aria-label="Breadcrumb" class="{variantClasses[variant]} {sizeClasses[size]} {customClass}">
  <ol class="flex items-center gap-2">
    {#each items as item, index (index)}
      {#if index > 0}
        <li aria-hidden="true" class="text-neutral-600 select-none">{separator}</li>
      {/if}
      <li>
        {#if index === items.length - 1}
          <span aria-current="page" class="text-neutral-100 font-medium">{item.label}</span>
        {:else if item.href}
          <a
            href={item.href}
            class="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] rounded"
          >{item.label}</a>
        {:else}
          <span>{item.label}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>