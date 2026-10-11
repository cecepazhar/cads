<script lang="ts">
  import type { ComponentVariant, ComponentSize } from './types';
  import { uid } from '../../utils/a11y';

  export type SwitchVariant = Extract<ComponentVariant, 'primary' | 'brand'>;
  export type SwitchSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    variant?: SwitchVariant;
    size?: SwitchSize;
    checked?: boolean;
    disabled?: boolean;
    label?: string;
    description?: string;
    /** Explicit aria-label when no visible label is provided. */
    'aria-label'?: string;
    class?: string;
    onchange?: (checked: boolean) => void;
  }

  let {
    variant: _variant = 'primary',
    size = 'md',
    checked = $bindable(false),
    disabled = false,
    label = '',
    description = '',
    'aria-label': ariaLabel,
    class: customClass = '',
    onchange,
  }: Props = $props();

  const labelId = uid('switch-label');

  const trackSizes: Record<SwitchSize, string> = {
    sm: 'w-7 h-4',
    md: 'w-9 h-5',
    lg: 'w-11 h-6',
  };

  const thumbSizes: Record<SwitchSize, string> = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const translateSizes: Record<SwitchSize, string> = {
    sm: 'translate-x-3',
    md: 'translate-x-4',
    lg: 'translate-x-5',
  };

  function toggle() {
    if (disabled) return;
    checked = !checked;
    onchange?.(checked);
  }
</script>

<label class="inline-flex items-start gap-3 select-none cursor-pointer {disabled ? 'opacity-40 cursor-not-allowed' : ''} {customClass}">
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-labelledby={label ? labelId : undefined}
    aria-label={label ? undefined : ariaLabel}
    {disabled}
    onclick={toggle}
    class="relative inline-flex shrink-0 items-center rounded-full p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {trackSizes[size]} {checked ? 'bg-[var(--ca-brand)]' : 'bg-[var(--ca-surface-subtle)] border border-[var(--ca-border)]'}"
  >
    <span
      class="pointer-events-none inline-block rounded-full bg-[var(--ca-surface)] shadow transform transition-transform {thumbSizes[size]} {checked ? translateSizes[size] : 'translate-x-0'}"
    ></span>
  </button>

  {#if label || description}
    <div class="flex flex-col text-left">
      {#if label}
        <span id={labelId} class="text-xs font-medium text-[var(--ca-text-primary)]">{label}</span>
      {/if}
      {#if description}
        <span class="text-[11px] text-[var(--ca-text-muted)] mt-0.5">{description}</span>
      {/if}
    </div>
  {/if}
</label>