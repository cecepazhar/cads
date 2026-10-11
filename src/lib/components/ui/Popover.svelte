<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ComponentVariant, ComponentSize } from './types';
  import { focusTrap, clickOutside, uid } from '../../utils/a11y';

  type PopoverVariant = Extract<ComponentVariant, 'primary' | 'outline'>;
  type PopoverSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    open?: boolean;
    variant?: PopoverVariant;
    size?: PopoverSize;
    class?: string;
    trigger?: Snippet;
    children?: Snippet;
  }

  let {
    open = $bindable(false),
    variant: _variant = 'primary',
    size: _size = 'md',
    class: customClass = '',
    trigger,
    children,
  }: Props = $props();

  const popupId = uid('popover');

  function close() {
    open = false;
  }

  function toggle() {
    open = !open;
  }
</script>

<div class="relative inline-block {customClass}" use:clickOutside={close}>
  <div
    role="button"
    tabindex="0"
    aria-haspopup="dialog"
    aria-expanded={open}
    aria-controls={open ? popupId : undefined}
    onclick={toggle}
    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
    class="inline-flex cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]"
  >
    {#if trigger}
      {@render trigger()}
    {/if}
  </div>

  {#if open}
    <div
      id={popupId}
      role="dialog"
      tabindex="-1"
      class="absolute z-50 mt-2 p-3 rounded-xl border border-[var(--ca-border)] bg-[var(--ca-surface-elevated)] text-[var(--ca-text-primary)] shadow-2xl font-sans text-xs min-w-48 animate-in fade-in zoom-in-95"
      use:focusTrap={{ onEscape: close, returnFocus: true }}
    >
      {@render children?.()}
    </div>
  {/if}
</div>