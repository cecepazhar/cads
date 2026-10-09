<script lang="ts">
  interface SegmentOption {
    value: string;
    label: string;
    icon?: string;
    disabled?: boolean;
  }

  interface Props {
    options: SegmentOption[];
    value?: string;
    size?: 'sm' | 'md';
    class?: string;
  }

  let {
    options = [],
    value = $bindable(options[0]?.value || ''),
    size = 'md',
    class: customClass = '',
  }: Props = $props();

  const sizeClasses = {
    sm: 'p-0.5 text-xs',
    md: 'p-1 text-xs',
  };
</script>

<div class="inline-flex items-center rounded-lg bg-neutral-900 border border-neutral-800 {sizeClasses[size]} {customClass}">
  {#each options as opt}
    <button
      type="button"
      disabled={opt.disabled}
      onclick={() => (value = opt.value)}
      class="px-3 py-1 rounded-md font-medium transition-all select-none cursor-pointer disabled:opacity-40 {value === opt.value ? 'bg-neutral-800 text-white shadow-sm font-semibold' : 'text-neutral-400 hover:text-neutral-200'}"
    >
      {opt.label}
    </button>
  {/each}
</div>
