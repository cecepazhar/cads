<script lang="ts">
  interface Props {
    value?: string;
    placeholder?: string;
    rows?: number;
    disabled?: boolean;
    label?: string;
    error?: string;
    class?: string;
  }

  let {
    value = $bindable(''),
    placeholder = '',
    rows = 4,
    disabled = false,
    label = '',
    error = '',
    class: customClass = '',
  }: Props = $props();
</script>

<div class="flex flex-col gap-1.5 w-full text-left">
  {#if label}
    <label class="text-xs font-medium text-neutral-300">{label}</label>
  {/if}
  <textarea
    bind:value
    {placeholder}
    {rows}
    {disabled}
    class="w-full rounded-lg border border-neutral-700 bg-[#121217] px-3 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:border-[var(--ca-brand)] focus:ring-1 focus:ring-[var(--ca-brand)] focus:outline-none transition-all disabled:opacity-40 disabled:cursor-not-allowed {error ? 'border-rose-500' : ''} {customClass}"
  ></textarea>
  {#if error}
    <span class="text-[11px] text-rose-400">{error}</span>
  {/if}
</div>
