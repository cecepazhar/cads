<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentVariant, ComponentSize } from './types';
  import { Loader2 } from 'lucide-svelte';

  type TableVariant = Extract<ComponentVariant, 'primary' | 'outline'>;
  type TableSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  export interface Column<T = unknown> {
    key: string;
    label: string;
    sortable?: boolean;
    align?: 'left' | 'center' | 'right';
    width?: string;
  }

  interface Props<T = unknown> {
    columns: Column<T>[];
    data: T[];
    sortKey?: string;
    sortDirection?: 'asc' | 'desc';
    striped?: boolean;
    /** @deprecated Use `size="sm"` instead. */
    compact?: boolean;
    variant?: TableVariant;
    size?: TableSize;
    loading?: boolean;
    caption?: string;
    pageSize?: number;
    emptyText?: string;
    class?: string;
    onRowClick?: (row: T) => void;
    onSort?: (key: string, direction: 'asc' | 'desc') => void;
    cell?: Snippet<[{ item: T; column: Column<T>; value: unknown }]>;
    actions?: Snippet<[{ item: T }]>;
  }

  let {
    columns,
    data = [],
    sortKey = $bindable(''),
    sortDirection = $bindable<'asc' | 'desc'>('asc'),
    striped = false,
    compact = false,
    variant = 'primary',
    size = 'md',
    loading = false,
    caption,
    pageSize = 10,
    emptyText = 'No records found',
    class: customClass = '',
    onRowClick,
    onSort,
    cell,
    actions,
  }: Props = $props();

  let effectiveSize = $derived<TableSize>(compact ? 'sm' : size);

  const cellPadding: Record<TableSize, string> = {
    sm: 'py-2 px-3',
    md: 'py-3 px-4',
    lg: 'py-4 px-5',
  };

  const variantBorder: Record<TableVariant, string> = {
    primary: 'border-neutral-200 dark:border-[var(--ca-border)] bg-white dark:bg-[var(--ca-surface)]',
    outline: 'border-neutral-300 dark:border-[var(--ca-border)] bg-transparent',
  };

  let currentPage = $state(1);

  function handleHeaderClick(col: Column) {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey = col.key;
      sortDirection = 'asc';
    }
    onSort?.(sortKey, sortDirection);
  }

  function getCellValue(row: unknown, key: string): unknown {
    return (row as Record<string, unknown>)[key];
  }

  const sortedData = $derived.by(() => {
    if (!sortKey) return data;
    return [...data].sort((a: any, b: any) => {
      const valA = getCellValue(a, sortKey);
      const valB = getCellValue(b, sortKey);
      if (valA === valB) return 0;
      if (valA == null) return 1;
      if (valB == null) return -1;
      const comparison = valA < valB ? -1 : 1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  });

  const totalPages = $derived(Math.max(1, Math.ceil(sortedData.length / (pageSize || 10))));
  const paginatedData = $derived(
    pageSize > 0
      ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      : sortedData
  );

  function prevPage() {
    if (currentPage > 1) currentPage--;
  }

  function nextPage() {
    if (currentPage < totalPages) currentPage++;
  }
</script>

<div class="relative w-full rounded-xl border {variantBorder[variant]} overflow-hidden flex flex-col font-sans {customClass}">
  {#if loading}
    <div class="absolute inset-0 bg-white/50 dark:bg-black/30 flex items-center justify-center z-10">
      <Loader2 class="w-5 h-5 animate-spin text-[var(--ca-brand)]" />
    </div>
  {/if}
  <div class="overflow-x-auto w-full">
    <table class="w-full text-left {effectiveSize === 'sm' ? 'text-[11px]' : effectiveSize === 'lg' ? 'text-sm' : 'text-xs'} border-collapse" aria-busy={loading || undefined}>
      <caption class="sr-only">{caption ?? 'Data table'}</caption>
      <thead class="bg-neutral-50 dark:bg-[var(--ca-surface-elevated)] border-b border-neutral-200 dark:border-[var(--ca-border)] text-neutral-600 dark:text-neutral-400 font-semibold uppercase tracking-wider text-[11px] select-none">
        <tr>
          {#each columns as col (col.key)}
            <th
              class="{cellPadding[effectiveSize]} transition-colors {col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}"
              style={col.width ? `width: ${col.width}` : ''}
              aria-sort={col.sortable ? (sortKey === col.key ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none') : undefined}
            >
              {#if col.sortable}
                <button
                  type="button"
                  onclick={() => handleHeaderClick(col)}
                  class="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider cursor-pointer hover:text-neutral-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] rounded {col.align === 'center' ? 'justify-center' : col.align === 'right' ? 'justify-end' : 'justify-start'}"
                >
                  <span>{col.label}</span>
                  <span class="inline-flex flex-col text-[8px] leading-[8px] {sortKey === col.key ? 'text-[var(--ca-brand)]' : 'text-neutral-400 dark:text-neutral-600'}">
                    {#if sortKey === col.key}
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    {:else}
                      ▲▼
                    {/if}
                  </span>
                </button>
              {:else}
                <span>{col.label}</span>
              {/if}
            </th>
          {/each}
          {#if actions}
            <th class="{cellPadding[effectiveSize]} text-right w-24">Actions</th>
          {/if}
        </tr>
      </thead>
      <tbody class="divide-y divide-neutral-200 dark:divide-[var(--ca-border)]/60 text-neutral-800 dark:text-neutral-200">
        {#if paginatedData.length === 0}
          <tr>
            <td
              colspan={columns.length + (actions ? 1 : 0)}
              class="py-8 text-center text-neutral-400 dark:text-neutral-500 italic"
            >
              {emptyText}
            </td>
          </tr>
        {:else}
          {#each paginatedData as row, idx (idx)}
            <tr
              class="transition-colors duration-100 {striped && idx % 2 === 1 ? 'bg-neutral-50/50 dark:bg-[var(--ca-surface-elevated)]/50' : 'bg-transparent'} hover:bg-neutral-100/80 dark:hover:bg-[var(--ca-surface-subtle)]/80 {onRowClick ? 'cursor-pointer' : ''} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ca-brand)]"
              tabindex={onRowClick ? 0 : undefined}
              onclick={() => onRowClick?.(row)}
              onkeydown={(e: KeyboardEvent) => {
                if (onRowClick && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  onRowClick(row);
                }
              }}
            >
              {#each columns as col (col.key)}
                <td class="{cellPadding[effectiveSize]} {col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}">
                  {#if cell}
                    {@render cell({ item: row, column: col, value: getCellValue(row, col.key) })}
                  {:else}
                    <span class="truncate block">{getCellValue(row, col.key) ?? '—'}</span>
                  {/if}
                </td>
              {/each}
              {#if actions}
                <td class="{cellPadding[effectiveSize]} text-right whitespace-nowrap" onclick={(e) => e.stopPropagation()}>
                  {@render actions({ item: row })}
                </td>
              {/if}
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>

  {#if pageSize > 0 && sortedData.length > 0}
    <div class="px-4 py-2.5 bg-neutral-50 dark:bg-[var(--ca-surface-elevated)] border-t border-neutral-200 dark:border-[var(--ca-border)] flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 select-none">
      <div>
        Showing <span class="font-medium text-neutral-800 dark:text-neutral-200">{(currentPage - 1) * pageSize + 1}</span> to <span class="font-medium text-neutral-800 dark:text-neutral-200">{Math.min(currentPage * pageSize, sortedData.length)}</span> of <span class="font-medium text-neutral-800 dark:text-neutral-200">{sortedData.length}</span> results
      </div>
      <div class="flex items-center gap-1.5">
        <button
          type="button"
          disabled={currentPage === 1}
          onclick={prevPage}
          class="px-2.5 py-1 rounded border border-neutral-200 dark:border-[var(--ca-border)] bg-white dark:bg-[var(--ca-surface-subtle)] text-neutral-700 dark:text-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
        >
          Previous
        </button>
        <span class="px-2 font-mono text-[11px]">
          {currentPage} / {totalPages}
        </span>
        <button
          type="button"
          disabled={currentPage === totalPages}
          onclick={nextPage}
          class="px-2.5 py-1 rounded border border-neutral-200 dark:border-[var(--ca-border)] bg-white dark:bg-[var(--ca-surface-subtle)] text-neutral-700 dark:text-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
        >
          Next
        </button>
      </div>
    </div>
  {/if}
</div>