<script lang="ts">
  interface Props {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    class?: string;
    onchange?: (val: number) => void;
  }

  let {
    value = $bindable(0),
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    class: customClass = '',
    onchange,
  }: Props = $props();

  function handleInput(e: Event) {
    const val = Number((e.target as HTMLInputElement).value);
    value = val;
    onchange?.(val);
  }
</script>

<div class="relative w-full flex items-center {customClass}">
  <input
    type="range"
    {min}
    {max}
    {step}
    {disabled}
    value={value}
    oninput={handleInput}
    class="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[var(--ca-brand)] disabled:opacity-40 disabled:cursor-not-allowed"
  />
</div>
