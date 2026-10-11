<script lang="ts">
  import type { ComponentSize } from './types';
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';

  type PaginationSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    page: number;
    pageSize: number;
    total: number;
    pageSizeOptions?: number[];
    size?: PaginationSize;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    class?: string;
  }

  let {
    page,
    pageSize,
    total,
    pageSizeOptions = [10, 25, 50, 100],
    size = 'md',
    onPageChange,
    onPageSizeChange,
    class: customClass = '',
  }: Props = $props();

  const pageCount = $derived(Math.max(1, Math.ceil(total / pageSize)));
  const from = $derived(total === 0 ? 0 : (page - 1) * pageSize + 1);
  const to = $derived(Math.min(page * pageSize, total));

  const sizeCls: Record<PaginationSize, string> = {
    sm: 'text-xs h-7 px-2',
    md: 'text-sm h-8 px-2.5',
    lg: 'text-base h-10 px-3',
  };

  function go(next: number) {
    const clamped = Math.min(pageCount, Math.max(1, next));
    if (clamped !== page) onPageChange(clamped);
  }
</script>

<nav
  aria-label="Pagination"
  class="flex items-center justify-between gap-3 flex-wrap text-[var(--ca-text-secondary)] {customClass}"
>
  <p class="text-xs tabular-nums" aria-live="polite">
    {from}–{to} of {total}
  </p>

  <div class="flex items-center gap-1.5">
    {#if onPageSizeChange}
      <label class="flex items-center gap-1.5 text-xs">
        <span class="sr-only sm:not-sr-only">Per page</span>
        <select
          value={pageSize}
          onchange={(e) => onPageSizeChange(Number((e.currentTarget as HTMLSelectElement).value))}
          class="rounded-md bg-[var(--ca-surface)] border border-[var(--ca-border)] text-[var(--ca-text-primary)] {sizeCls[size]} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)]"
        >
          {#each pageSizeOptions as opt (opt)}
            <option value={opt}>{opt}</option>
          {/each}
        </select>
      </label>
    {/if}

    <button
      type="button"
      aria-label="Previous page"
      disabled={page <= 1}
      onclick={() => go(page - 1)}
      class="inline-flex items-center justify-center rounded-md border border-[var(--ca-border)] hover:bg-[var(--ca-surface-subtle)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors duration-[var(--ca-motion-duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] {sizeCls[size]}"
    >
      <ChevronLeft class="w-4 h-4" aria-hidden="true" />
    </button>
    <span class="px-2 text-xs tabular-nums">Page {page} / {pageCount}</span>
    <button
      type="button"
      aria-label="Next page"
      disabled={page >= pageCount}
      onclick={() => go(page + 1)}
      class="inline-flex items-center justify-center rounded-md border border-[var(--ca-border)] hover:bg-[var(--ca-surface-subtle)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors duration-[var(--ca-motion-duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] {sizeCls[size]}"
    >
      <ChevronRight class="w-4 h-4" aria-hidden="true" />
    </button>
  </div>
</nav>
