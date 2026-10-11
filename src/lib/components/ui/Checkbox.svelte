<script lang="ts">
  import type { ComponentVariant, ComponentSize } from './types';
  import { uid } from '../../utils/a11y';

  export type CheckboxVariant = Extract<ComponentVariant, 'primary' | 'brand'>;
  export type CheckboxSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    variant?: CheckboxVariant;
    size?: CheckboxSize;
    checked?: boolean;
    /** When true, shows an indeterminate (mixed) state. */
    indeterminate?: boolean;
    disabled?: boolean;
    label?: string;
    description?: string;
    class?: string;
    onchange?: (c: boolean) => void;
  }

  let {
    variant: _variant = 'primary',
    size = 'md',
    checked = $bindable(false),
    indeterminate = false,
    disabled = false,
    label = '',
    description = '',
    class: customClass = '',
    onchange,
  }: Props = $props();

  const descId = uid('checkbox-desc');

  function toggle() {
    if (disabled) return;
    checked = !checked;
    onchange?.(checked);
  }

  const sizeClasses: Record<CheckboxSize, { box: string; icon: string }> = {
    sm: { box: 'w-3.5 h-3.5', icon: 'w-2.5 h-2.5' },
    md: { box: 'w-4 h-4', icon: 'w-3 h-3' },
    lg: { box: 'w-5 h-5', icon: 'w-3.5 h-3.5' },
  };
</script>

<label class="inline-flex items-start gap-2.5 cursor-pointer select-none {disabled ? 'opacity-40 cursor-not-allowed' : ''} {customClass}">
  <button
    type="button"
    role="checkbox"
    aria-checked={indeterminate ? 'mixed' : checked}
    aria-describedby={description ? descId : undefined}
    {disabled}
    onclick={toggle}
    class="mt-0.5 rounded border flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {sizeClasses[size].box} {checked || indeterminate ? 'bg-[var(--ca-brand)] border-[var(--ca-brand)] text-white' : 'bg-[var(--ca-surface)] border-[var(--ca-border)] hover:border-[var(--ca-text-muted)]'}"
  >
    {#if indeterminate && !checked}
      <svg class="{sizeClasses[size].icon} stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>
    {:else if checked}
      <svg class="{sizeClasses[size].icon} stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
    {/if}
  </button>
  <div class="flex flex-col">
    {#if label}
      <span class="text-xs font-medium text-[var(--ca-text-primary)]">{label}</span>
    {/if}
    {#if description}
      <span id={descId} class="text-[11px] text-[var(--ca-text-muted)] mt-0.5">{description}</span>
    {/if}
  </div>
</label>