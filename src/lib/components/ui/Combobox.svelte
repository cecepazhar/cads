<script lang="ts">
  import type { ComponentVariant, ComponentSize } from './types';
  import { uid } from '../../utils/a11y';

  type ComboboxVariant = Extract<ComponentVariant, 'primary' | 'outline' | 'ghost'>;
  type ComboboxSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  export interface ComboboxOption {
    value: string;
    label: string;
  }

  interface Props {
    options: ComboboxOption[];
    value?: string;
    placeholder?: string;
    variant?: ComboboxVariant;
    size?: ComboboxSize;
    class?: string;
  }

  let {
    options = [],
    // eslint-disable-next-line no-unused-vars, no-useless-assignment
    value = $bindable(''),
    placeholder = 'Search...',
    variant = 'primary',
    size = 'md',
    class: customClass = '',
  }: Props = $props();

  let query = $state('');
  let open = $state(false);
  let activeIndex = $state(-1);

  const listId = uid('combobox-list');

  const filtered = $derived(
    query ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())) : options
  );

  function getOptionId(index: number): string {
    return `${listId}-option-${index}`;
  }

  function selectOption(opt: ComboboxOption) {
    value = opt.value;
    query = opt.label;
    open = false;
    activeIndex = -1;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      open = true;
      activeIndex = 0;
      e.preventDefault();
      return;
    }

    if (!open) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % filtered.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + filtered.length) % filtered.length;
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && filtered[activeIndex]) {
        selectOption(filtered[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      open = false;
      activeIndex = -1;
    }
  }

  function handleClickOutside(e: PointerEvent) {
    const target = e.target as HTMLElement;
    if (!target.closest('[data-combobox]')) {
      open = false;
      activeIndex = -1;
    }
  }

  $effect(() => {
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  });

  const sizeClasses: Record<ComboboxSize, string> = {
    sm: 'text-[11px] px-2.5 py-1.5',
    md: 'text-xs px-3 py-2',
    lg: 'text-sm px-4 py-2.5',
  };

  const variantClasses: Record<ComboboxVariant, string> = {
    primary: 'border-[var(--ca-border)] bg-[var(--ca-surface-elevated)]',
    outline: 'border-[var(--ca-border)] bg-transparent',
    ghost: 'border-transparent bg-transparent',
  };
</script>

<div class="relative w-full text-left {customClass}" data-combobox>
  <input
    type="text"
    role="combobox"
    aria-expanded={open}
    aria-controls={listId}
    aria-activedescendant={activeIndex >= 0 ? getOptionId(activeIndex) : undefined}
    bind:value={query}
    {placeholder}
    onfocus={() => (open = true)}
    onkeydown={handleKeydown}
    class="w-full rounded-lg border {variantClasses[variant]} {sizeClasses[size]} text-[var(--ca-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
  />
  {#if open && filtered.length > 0}
    <div
      id={listId}
      role="listbox"
      class="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-[var(--ca-border)] bg-[var(--ca-surface-subtle)] p-1 shadow-2xl"
    >
      {#each filtered as opt, i}
        <button
          id={getOptionId(i)}
          type="button"
          role="option"
          aria-selected={activeIndex === i}
          onclick={() => selectOption(opt)}
          class="w-full rounded px-2.5 py-1.5 text-left {sizeClasses[size]} text-[var(--ca-text-secondary)] hover:bg-[var(--ca-surface-subtle)] hover:text-[var(--ca-text-primary)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {activeIndex === i ? 'bg-[var(--ca-surface-subtle)] text-[var(--ca-text-primary)]' : ''}"
        >
          {opt.label}
        </button>
      {/each}
    </div>
  {/if}
</div>