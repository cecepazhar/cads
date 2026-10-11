<script lang="ts">
  import type { ComponentVariant, ComponentSize } from './types';
  import { uid, clickOutside } from '../../utils/a11y';

  export type MentionInputVariant = Extract<ComponentVariant, 'primary' | 'outline' | 'ghost'>;
  export type MentionInputSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  export interface MentionItem {
    id: string;
    label: string;
    avatar?: string;
  }

  interface Props {
    value?: string;
    items: MentionItem[];
    trigger?: string;
    placeholder?: string;
    disabled?: boolean;
    label?: string;
    rows?: number;
    variant?: MentionInputVariant;
    size?: MentionInputSize;
    class?: string;
    onmention?: (item: { id: string; label: string }) => void;
  }

  let {
    value = $bindable(''),
    items,
    trigger = '@',
    placeholder = '',
    disabled = false,
    label = '',
    rows = 3,
    variant = 'primary',
    size = 'md',
    class: customClass = '',
    onmention,
  }: Props = $props();

  let open = $state(false);
  let activeIndex = $state(0);
  let query = $state('');
  let triggerPos = $state(-1);
  let textareaEl = $state<HTMLTextAreaElement | null>(null);

  const listId = uid('mention-list');
  const textareaId = uid('mention-input');

  const filtered = $derived(
    query.length > 0
      ? items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
      : items
  );

  function getOptionId(index: number): string {
    return `${listId}-option-${index}`;
  }

  function handleInput(e: Event) {
    const textarea = e.target as HTMLTextAreaElement;
    const cursorPos = textarea.selectionStart ?? 0;
    const textBefore = textarea.value.slice(0, cursorPos);
    const lastTriggerIdx = textBefore.lastIndexOf(trigger);

    value = textarea.value;

    if (lastTriggerIdx >= 0) {
      const textAfterTrigger = textBefore.slice(lastTriggerIdx + trigger.length);
      const hasSpace = textAfterTrigger.includes(' ');
      if (!hasSpace) {
        query = textAfterTrigger;
        triggerPos = lastTriggerIdx;
        open = filtered.length > 0;
        activeIndex = 0;
        return;
      }
    }

    closePopup();
  }

  function insertMention(item: MentionItem) {
    if (triggerPos < 0 || !textareaEl) return;
    const cursorPos = textareaEl.selectionStart ?? 0;
    const before = value.slice(0, triggerPos);
    const after = value.slice(cursorPos);
    const mention = `${trigger}${item.label} `;
    value = before + mention + after;
    onmention?.({ id: item.id, label: item.label });
    closePopup();

    requestAnimationFrame(() => {
      if (textareaEl) {
        const newPos = triggerPos + mention.length;
        textareaEl.setSelectionRange(newPos, newPos);
        textareaEl.focus();
      }
    });
  }

  function closePopup() {
    open = false;
    activeIndex = 0;
    query = '';
    triggerPos = -1;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!open) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % filtered.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + filtered.length) % filtered.length;
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[activeIndex]) {
        insertMention(filtered[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closePopup();
    }
  }

  function handleClickOutside() {
    if (open) closePopup();
  }

  const variantClasses: Record<MentionInputVariant, string> = {
    primary:
      'bg-[var(--ca-surface)] border-[var(--ca-border)] text-[var(--ca-text-primary)] placeholder-[var(--ca-text-muted)]',
    outline:
      'bg-transparent border-[var(--ca-border)] text-[var(--ca-text-primary)] placeholder-[var(--ca-text-muted)]',
    ghost:
      'bg-transparent border-transparent text-[var(--ca-text-primary)] placeholder-[var(--ca-text-muted)] hover:border-[var(--ca-border)]',
  };

  const sizeClasses: Record<MentionInputSize, string> = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-3 py-2 text-xs',
    lg: 'px-3.5 py-2.5 text-sm',
  };
</script>

<div class="flex flex-col gap-1.5 w-full {customClass}" use:clickOutside={handleClickOutside}>
  {#if label}
    <label for={textareaId} class="text-xs font-medium text-[var(--ca-text-secondary)]">{label}</label>
  {/if}

  <div class="relative">
    <textarea
      bind:this={textareaEl}
      bind:value
      id={textareaId}
      {placeholder}
      {disabled}
      {rows}
      role="combobox"
      aria-expanded={open}
      aria-controls={listId}
      aria-activedescendant={open && activeIndex >= 0 ? getOptionId(activeIndex) : undefined}
      aria-haspopup="listbox"
      oninput={handleInput}
      onkeydown={handleKeydown}
      class="w-full rounded-lg border {variantClasses[variant]} {sizeClasses[size]}
        transition-colors disabled:opacity-50 disabled:cursor-not-allowed
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] resize-none"
    ></textarea>

    {#if open && filtered.length > 0}
      <div
        id={listId}
        role="listbox"
        class="absolute z-50 bottom-full mb-1 w-full max-h-48 overflow-y-auto rounded-lg border border-[var(--ca-border)] bg-[var(--ca-surface-elevated)] p-1 shadow-2xl"
      >
        {#each filtered as item, i (item.id)}
          <button
            id={getOptionId(i)}
            type="button"
            role="option"
            aria-selected={activeIndex === i}
            onmousedown={(e) => { e.preventDefault(); insertMention(item); }}
            onmouseenter={() => (activeIndex = i)}
            class="flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-left {sizeClasses[size]}
              text-[var(--ca-text-secondary)] hover:bg-[var(--ca-surface-subtle)] hover:text-[var(--ca-text-primary)] cursor-pointer
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]
              {activeIndex === i ? 'bg-[var(--ca-surface-subtle)] text-[var(--ca-text-primary)]' : ''}"
          >
            {#if item.avatar}
              <img
                src={item.avatar}
                alt=""
                class="h-5 w-5 rounded-full object-cover shrink-0"
                aria-hidden="true"
              />
            {:else}
              <div
                class="flex items-center justify-center h-5 w-5 rounded-full bg-[var(--ca-surface-subtle)] text-[10px] font-medium text-[var(--ca-text-muted)] shrink-0"
                aria-hidden="true"
              >
                {item.label.charAt(0).toUpperCase()}
              </div>
            {/if}
            <span class="truncate">{item.label}</span>
          </button>
        {/each}
      </div>
    {/if}
  </div>
</div>