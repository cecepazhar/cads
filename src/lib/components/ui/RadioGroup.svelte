<script lang="ts">
  import type { ComponentVariant, ComponentSize } from './types';
  import { uid } from '../../utils/a11y';

  export type RadioGroupVariant = Extract<ComponentVariant, 'primary' | 'brand'>;
  export type RadioGroupSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Option {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }

  interface Props {
    variant?: RadioGroupVariant;
    size?: RadioGroupSize;
    options: Option[];
    value?: string;
    name?: string;
    orientation?: 'horizontal' | 'vertical';
    /** Accessible label for the group. */
    label?: string;
    class?: string;
  }

  let {
    variant: _variant = 'primary',
    size = 'md',
    options = [],
    value = $bindable(''),
    name = 'radio-group',
    orientation = 'vertical',
    label = '',
    class: customClass = '',
  }: Props = $props();

  const labelId = uid('radiogroup-label');

  const sizeClasses: Record<RadioGroupSize, { radio: string; text: string; desc: string }> = {
    sm: { radio: 'h-3.5 w-3.5', text: 'text-[11px]', desc: 'text-[10px]' },
    md: { radio: 'h-4 w-4', text: 'text-xs', desc: 'text-[11px]' },
    lg: { radio: 'h-5 w-5', text: 'text-sm', desc: 'text-xs' },
  };
</script>

<div
  role="radiogroup"
  aria-labelledby={label ? labelId : undefined}
  aria-label={label ? undefined : 'Radio group'}
  class="flex {orientation === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-2'} {customClass}"
>
  {#if label}
    <span id={labelId} class="text-xs font-medium text-[var(--ca-text-secondary)] mb-1">{label}</span>
  {/if}
  {#each options as opt (opt.value)}
    <label class="inline-flex items-start gap-2.5 cursor-pointer select-none {opt.disabled ? 'opacity-40 cursor-not-allowed' : ''}">
      <input
        type="radio"
        {name}
        value={opt.value}
        checked={value === opt.value}
        disabled={opt.disabled}
        onchange={() => (value = opt.value)}
        class="mt-0.5 appearance-none rounded-full border border-[var(--ca-border)] bg-[var(--ca-surface)] checked:border-[var(--ca-brand)] checked:bg-[var(--ca-brand)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] transition-all {sizeClasses[size].radio}"
      />
      <div class="flex flex-col text-left">
        <span class="font-medium text-[var(--ca-text-primary)] {sizeClasses[size].text}">{opt.label}</span>
        {#if opt.description}
          <span class="text-[var(--ca-text-muted)] mt-0.5 {sizeClasses[size].desc}">{opt.description}</span>
        {/if}
      </div>
    </label>
  {/each}
</div>