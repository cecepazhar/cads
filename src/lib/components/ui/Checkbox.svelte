<script lang="ts">
  interface Props {
    checked?: boolean;
    disabled?: boolean;
    label?: string;
    description?: string;
    class?: string;
    onchange?: (c: boolean) => void;
  }

  let {
    checked = $bindable(false),
    disabled = false,
    label = '',
    description = '',
    class: customClass = '',
    onchange,
  }: Props = $props();

  function toggle() {
    if (disabled) return;
    checked = !checked;
    onchange?.(checked);
  }
</script>

<label class="inline-flex items-start gap-2.5 cursor-pointer select-none {disabled ? 'opacity-40 cursor-not-allowed' : ''} {customClass}">
  <button
    type="button"
    role="checkbox"
    aria-checked={checked}
    {disabled}
    onclick={toggle}
    class="mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer {checked ? 'bg-[var(--ca-brand)] border-[var(--ca-brand)] text-neutral-950' : 'bg-neutral-900 border-neutral-700 hover:border-neutral-500'}"
  >
    {#if checked}
      <svg class="w-3 h-3 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
    {/if}
  </button>
  <div class="flex flex-col">
    {#if label}
      <span class="text-xs font-medium text-neutral-200">{label}</span>
    {/if}
    {#if description}
      <span class="text-[11px] text-neutral-400 mt-0.5">{description}</span>
    {/if}
  </div>
</label>
