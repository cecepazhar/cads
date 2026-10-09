<script lang="ts">
  interface Props {
    checked?: boolean;
    disabled?: boolean;
    label?: string;
    description?: string;
    size?: 'sm' | 'md' | 'lg';
    class?: string;
    onchange?: (checked: boolean) => void;
  }

  let {
    checked = $bindable(false),
    disabled = false,
    label = '',
    description = '',
    size = 'md',
    class: customClass = '',
    onchange,
  }: Props = $props();

  const trackSizes = {
    sm: 'w-7 h-4',
    md: 'w-9 h-5',
    lg: 'w-11 h-6',
  };

  const thumbSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const translateSizes = {
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
    {disabled}
    onclick={toggle}
    class="relative inline-flex shrink-0 items-center rounded-full p-0.5 transition-colors focus:outline-none {trackSizes[size]} {checked ? 'bg-[var(--ca-brand,#3B82F6)]' : 'bg-neutral-800 border border-neutral-700'}"
  >
    <span
      class="pointer-events-none inline-block rounded-full bg-white shadow transform transition-transform {thumbSizes[size]} {checked ? translateSizes[size] : 'translate-x-0'}"
    ></span>
  </button>

  {#if label || description}
    <div class="flex flex-col text-left">
      {#if label}
        <span class="text-xs font-medium text-neutral-200">{label}</span>
      {/if}
      {#if description}
        <span class="text-[11px] text-neutral-500 mt-0.5">{description}</span>
      {/if}
    </div>
  {/if}
</label>
