<script lang="ts">
  import type { ComponentVariant, ComponentSize } from './types';
  import { uid as _uid } from '../../utils/a11y';
  import { Check } from 'lucide-svelte';

  export type StepperVariant = Extract<ComponentVariant, 'primary' | 'ghost'>;
  export type StepperSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  export interface StepperStep {
    id: string;
    label: string;
    description?: string;
    status?: 'complete' | 'current' | 'upcoming';
  }

  interface Props {
    steps: StepperStep[];
    current?: string;
    orientation?: 'horizontal' | 'vertical';
    variant?: StepperVariant;
    size?: StepperSize;
    class?: string;
    onstepclick?: (id: string) => void;
  }

  let {
    steps,
    current = $bindable(''),
    orientation = 'horizontal',
    variant = 'primary',
    size = 'md',
    class: customClass = '',
    onstepclick,
  }: Props = $props();

  function getStepStatus(step: StepperStep, index: number): 'complete' | 'current' | 'upcoming' {
    if (step.status) return step.status;
    const currentIndex = steps.findIndex((s) => s.id === current);
    if (currentIndex < 0) return index === 0 ? 'current' : 'upcoming';
    if (index < currentIndex) return 'complete';
    if (index === currentIndex) return 'current';
    return 'upcoming';
  }

  function handleStepClick(step: StepperStep) {
    current = step.id;
    onstepclick?.(step.id);
  }

  const isHorizontal = $derived(orientation === 'horizontal');

  const sizeClasses: Record<StepperSize, { circle: string; text: string; desc: string }> = {
    sm: { circle: 'h-6 w-6 text-[10px]', text: 'text-[11px]', desc: 'text-[10px]' },
    md: { circle: 'h-8 w-8 text-xs', text: 'text-xs', desc: 'text-[11px]' },
    lg: { circle: 'h-10 w-10 text-sm', text: 'text-sm', desc: 'text-xs' },
  };

  const connectorTop: Record<StepperSize, string> = {
    sm: '12px',
    md: '16px',
    lg: '20px',
  };

  const verticalConnectorMargin: Record<StepperSize, string> = {
    sm: '0.75rem',
    md: '1rem',
    lg: '1.25rem',
  };

  const connectorClasses: Record<StepperVariant, string> = {
    primary: 'bg-[var(--ca-border)]',
    ghost: 'bg-[var(--ca-surface-subtle)]',
  };
</script>

<nav
  aria-label="Progress"
  class="{isHorizontal ? 'w-full' : ''} {customClass}"
>
  <ol
    class="flex {isHorizontal ? 'flex-row items-start' : 'flex-col items-start'} gap-0"
    role="list"
  >
    {#each steps as step, index (step.id)}
      {@const status = getStepStatus(step, index)}
      {@const isFirst = index === 0}
      {@const isLast = index === steps.length - 1}

      <li
        class="flex {isHorizontal ? 'flex-col items-center flex-1' : 'flex-row items-start'} relative"
        role="listitem"
      >
        <!-- Connector (before the circle, except for first step) -->
        {#if !isFirst}
          {#if isHorizontal}
            <div
              class="absolute left-0 right-1/2 h-0.5 -translate-y-1/2 {status === 'complete' ? 'bg-[var(--ca-success)]' : connectorClasses[variant]}"
              style="top: {connectorTop[size]}"
              aria-hidden="true"
            ></div>
            <div
              class="absolute left-1/2 right-0 h-0.5 -translate-y-1/2 {status === 'complete' ? 'bg-[var(--ca-success)]' : connectorClasses[variant]}"
              style="top: {connectorTop[size]}"
              aria-hidden="true"
            ></div>
          {:else}
            <div class="flex flex-col items-center">
              <div
                class="w-0.5 h-4 {status === 'complete' ? 'bg-[var(--ca-success)]' : connectorClasses[variant]}"
                aria-hidden="true"
              ></div>
            </div>
          {/if}
        {/if}

        <button
          type="button"
          aria-current={status === 'current' ? 'step' : undefined}
          aria-label="{step.label}{status === 'complete' ? ' — complete' : ''}"
          onclick={() => handleStepClick(step)}
          disabled={status === 'upcoming'}
          class="relative z-10 flex {isHorizontal ? 'flex-col items-center' : 'flex-row items-start gap-3'} cursor-pointer
            disabled:cursor-default
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] rounded-lg"
        >
          <!-- Circle / Step indicator -->
          <div
            class="flex items-center justify-center rounded-full shrink-0 transition-colors
              {sizeClasses[size].circle}
              {status === 'complete'
                ? 'bg-[var(--ca-success)] text-white'
                : status === 'current'
                  ? 'bg-[var(--ca-brand)] text-white ring-2 ring-[var(--ca-brand)] ring-offset-2 ring-offset-[var(--ca-surface)]'
                  : 'bg-[var(--ca-surface-subtle)] text-[var(--ca-text-muted)] border border-[var(--ca-border)]'}"
          >
            {#if status === 'complete'}
              <Check class="h-3/5 w-3/5" />
            {:else}
              <span class="font-semibold">{index + 1}</span>
            {/if}
          </div>

          <!-- Label + Description -->
          <div class="{isHorizontal ? 'mt-2 text-center' : 'pt-1'} {isHorizontal ? 'max-w-[120px]' : ''}">
            <span
              class="block font-medium leading-tight {sizeClasses[size].text}
                {status === 'current'
                  ? 'text-[var(--ca-text-primary)]'
                  : status === 'complete'
                    ? 'text-[var(--ca-text-primary)]'
                    : 'text-[var(--ca-text-muted)]'}"
            >
              {step.label}
            </span>
            {#if step.description}
              <span
                class="block mt-0.5 leading-tight {sizeClasses[size].desc} text-[var(--ca-text-muted)]"
              >
                {step.description}
              </span>
            {/if}
          </div>
        </button>

        <!-- Vertical connector after the step (except last) -->
        {#if !isLast && !isHorizontal}
          <div class="flex flex-col items-center" style="margin-left: {verticalConnectorMargin[size]}">
            <div
              class="w-0.5 h-6 {status === 'complete' ? 'bg-[var(--ca-success)]' : connectorClasses[variant]}"
              aria-hidden="true"
            ></div>
          </div>
        {/if}
      </li>
    {/each}
  </ol>
</nav>