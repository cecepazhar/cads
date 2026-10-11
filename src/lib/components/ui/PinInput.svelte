<script lang="ts">
  import type { ComponentVariant, ComponentSize } from './types';

  type PinVariant = Extract<ComponentVariant, 'primary' | 'outline' | 'ghost'>;
  type PinSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    length?: number;
    value?: string;
    disabled?: boolean;
    invalid?: boolean;
    variant?: PinVariant;
    size?: PinSize;
    class?: string;
    oncomplete?: (val: string) => void;
  }

  let {
    length = 6,
    value = $bindable(''),
    disabled = false,
    invalid = false,
    variant = 'primary',
    size = 'md',
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

  function handlePaste(e: ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData?.getData('text') ?? '';
    const chars = pasted.replace(/\D/g, '').slice(0, length).split('');
    for (let i = 0; i < chars.length; i++) {
      digits[i] = chars[i];
    }
    value = digits.join('');
    const focusIndex = Math.min(chars.length, length - 1);
    inputs[focusIndex]?.focus();
    if (value.length === length && !digits.includes('')) {
      oncomplete?.(value);
    }
  }

  const sizeClasses: Record<PinSize, string> = {
    sm: 'w-8 h-10 text-sm',
    md: 'w-10 h-12 text-lg',
    lg: 'w-12 h-14 text-xl',
  };

  const variantClasses: Record<PinVariant, string> = {
    primary: 'border-[var(--ca-border)] bg-[var(--ca-surface-subtle)]',
    outline: 'border-[var(--ca-border)] bg-transparent',
    ghost: 'border-transparent bg-transparent',
  };
</script>

<div class="flex items-center gap-2 {customClass}" onpaste={handlePaste}>
  {#each Array(length) as _, i (i)}
    <input
      type="text"
      inputmode="numeric"
      maxlength="1"
      disabled={disabled}
      aria-label="Digit {i + 1} of {length}"
      aria-invalid={invalid || undefined}
      autocomplete={i === 0 ? 'one-time-code' : undefined}
      bind:this={inputs[i]}
      value={digits[i]}
      oninput={(e) => handleInput(i, e)}
      onkeydown={(e) => handleKeyDown(i, e)}
      class="text-center font-mono font-bold rounded-lg border transition-all disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {sizeClasses[size]} {variantClasses[variant]} {invalid ? 'border-[var(--ca-danger)]' : ''}"
    />
  {/each}
</div>