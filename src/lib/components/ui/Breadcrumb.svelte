<script lang="ts">
  export interface BreadcrumbItem {
    label: string;
    href?: string;
  }

  interface Props {
    items: BreadcrumbItem[];
    separator?: string;
    class?: string;
  }

  let { items = [], separator = '/', class: customClass = '' }: Props = $props();
</script>

<nav class="flex items-center gap-2 text-xs text-neutral-400 {customClass}" aria-label="Breadcrumb">
  {#each items as item, index}
    {#if index > 0}
      <span class="text-neutral-600 select-none">{separator}</span>
    {/if}
    {#if index === items.length - 1}
      <span class="text-neutral-100 font-medium">{item.label}</span>
    {:else if item.href}
      <a href={item.href} class="hover:text-white transition-colors">{item.label}</a>
    {:else}
      <span>{item.label}</span>
    {/if}
  {/each}
</nav>
