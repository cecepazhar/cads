<script lang="ts">
  export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
  }

  interface Props {
    options: SelectOption[];
    value?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    class?: string;
  }

  let {
    options = [],
    value = $bindable(''),
    label = '',
    placeholder = 'Select option...',
    disabled = false,
    class: customClass = '',
  }: Props = $props();
</script>

<div class="flex flex-col gap-1.5 w-full text-left">
  {#if label}
    <label class="text-xs font-medium text-neutral-300">{label}</label>
  {/if}
  <div class="relative">
    <select
      bind:value
      {disabled}
      class="w-full appearance-none rounded-lg border border-neutral-700 bg-[#121217] px-3 py-2 pr-8 text-xs text-neutral-200 focus:border-[var(--ca-brand)] focus:ring-1 focus:ring-[var(--ca-brand)] focus:outline-none transition-all disabled:opacity-40 cursor-pointer {customClass}"
    >
      {#if placeholder}
        <option value="" disabled selected={!value}>{placeholder}</option>
      {/if}
      {#each options as opt}
        <option value={opt.value} disabled={opt.disabled}>{opt.label}</option>
      {/each}
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-neutral-400">
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
    </div>
  </div>
</div>
