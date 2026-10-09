<script lang="ts">
  interface Props {
    length?: number;
    value?: string;
    disabled?: boolean;
    class?: string;
    oncomplete?: (val: string) => void;
  }

  let {
    length = 6,
    value = $bindable(''),
    disabled = false,
    class: customClass = '',
    oncomplete,
  }: Props = $props();

  let inputs: HTMLInputElement[] = [];
  let digits = $state<string[]>(Array(length).fill(''));

  function handleInput(index: number, e: Event) {
    const target = e.target as HTMLInputElement;
    const char = target.value.slice(-1);
    digits[index] = char;
    value = digits.join('');

    if (char && index < length - 1) {
      inputs[index + 1]?.focus();
    }

    if (value.length === length && !digits.includes('')) {
      oncomplete?.(value);
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputs[index - 1]?.focus();
    }
  }
</script>

<div class="flex items-center gap-2 {customClass}">
  {#each Array(length) as _, i}
    <input
      type="text"
      inputmode="numeric"
      maxlength="1"
      disabled={disabled}
      bind:this={inputs[i]}
      value={digits[i]}
      oninput={(e) => handleInput(i, e)}
      onkeydown={(e) => handleKeyDown(i, e)}
      class="w-10 h-12 text-center font-mono text-lg font-bold rounded-lg border border-neutral-700 bg-neutral-900 text-white focus:border-[var(--ca-brand)] focus:ring-1 focus:ring-[var(--ca-brand)] focus:outline-none transition-all disabled:opacity-40"
    />
  {/each}
</div>
