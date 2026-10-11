<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentVariant, ComponentSize } from './types';
  import { uid } from '../../utils/a11y';

  type AccordionVariant = Extract<ComponentVariant, 'primary' | 'outline' | 'ghost'>;
  type AccordionSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  export interface AccordionItem {
    id: string;
    title: string;
    content?: string;
  }

  interface Props {
    items: AccordionItem[];
    allowMultiple?: boolean;
    variant?: AccordionVariant;
    size?: AccordionSize;
    class?: string;
    itemContent?: Snippet<[AccordionItem]>;
  }

  let {
    items = [],
    allowMultiple = false,
    variant = 'primary',
    size = 'md',
    class: customClass = '',
    itemContent,
  }: Props = $props();

  let openIds = $state<string[]>([items[0]?.id || '']);

  const panelIds = $derived(items.map(() => uid('accordion-panel')));
  const triggerIds = $derived(items.map(() => uid('accordion-trigger')));

  function toggle(id: string) {
    if (openIds.includes(id)) {
      openIds = openIds.filter((x) => x !== id);
    } else {
      openIds = allowMultiple ? [...openIds, id] : [id];
    }
  }

  function handleKeydown(e: KeyboardEvent, index: number) {
    const triggers = Array.from(document.querySelectorAll<HTMLElement>('[data-accordion-trigger]'));
    let nextIndex = -1;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % triggers.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + triggers.length) % triggers.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = triggers.length - 1;
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle(items[index].id);
      return;
    }

    if (nextIndex >= 0) {
      triggers[nextIndex]?.focus();
    }
  }

  const variantClasses: Record<AccordionVariant, string> = {
    primary: 'border-[var(--ca-border)] bg-[var(--ca-surface-elevated)]',
    outline: 'border-[var(--ca-border)] bg-transparent',
    ghost: 'border-transparent bg-transparent',
  };

  const sizeClasses: Record<AccordionSize, string> = {
    sm: 'text-[11px]',
    md: 'text-xs',
    lg: 'text-sm',
  };
</script>

<div class="flex flex-col gap-2 w-full {customClass}">
  {#each items as item, i}
    {@const isOpen = openIds.includes(item.id)}
    <div class="rounded-lg border overflow-hidden {variantClasses[variant]}">
      <button
        id={triggerIds[i]}
        type="button"
        data-accordion-trigger
        aria-expanded={isOpen}
        aria-controls={panelIds[i]}
        onclick={() => toggle(item.id)}
        onkeydown={(e) => handleKeydown(e, i)}
        class="w-full px-4 py-3 flex items-center justify-between text-left font-medium text-[var(--ca-text-primary)] hover:bg-[var(--ca-surface-subtle)] transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {sizeClasses[size]}"
      >
        <span>{item.title}</span>
        <svg
          class="w-4 h-4 text-[var(--ca-text-muted)] transition-transform {isOpen ? 'rotate-180' : ''}"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
      </button>
      {#if isOpen}
        <div
          id={panelIds[i]}
          role="region"
          aria-labelledby={triggerIds[i]}
          class="px-4 py-3 border-t border-[var(--ca-border)] text-[var(--ca-text-secondary)] {sizeClasses[size]}"
        >
          {#if itemContent}
            {@render itemContent(item)}
          {:else}
            <p>{item.content || ''}</p>
          {/if}
        </div>
      {/if}
    </div>
  {/each}
</div>