<script lang="ts">
  interface Option {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }

  interface Props {
    options: Option[];
    value?: string;
    name?: string;
    orientation?: 'horizontal' | 'vertical';
    class?: string;
  }

  let {
    options = [],
    value = $bindable(''),
    name = 'radio-group',
    orientation = 'vertical',
    class: customClass = '',
  }: Props = $props();
</script>

<div class="flex {orientation === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-2'} {customClass}">
  {#each options as opt}
    <label class="inline-flex items-start gap-2.5 cursor-pointer select-none {opt.disabled ? 'opacity-40 cursor-not-allowed' : ''}">
      <input
        type="radio"
        {name}
        value={opt.value}
        checked={value === opt.value}
        disabled={opt.disabled}
        onchange={() => (value = opt.value)}
        class="mt-0.5 h-4 w-4 appearance-none rounded-full border border-neutral-600 bg-neutral-900 checked:border-[var(--ca-brand)] checked:bg-[var(--ca-brand)] focus:outline-none transition-all cursor-pointer"
      />
      <div class="flex flex-col text-left">
        <span class="text-xs font-medium text-neutral-200">{opt.label}</span>
        {#if opt.description}
          <span class="text-[11px] text-neutral-400 mt-0.5">{opt.description}</span>
        {/if}
      </div>
    </label>
  {/each}
</div>
