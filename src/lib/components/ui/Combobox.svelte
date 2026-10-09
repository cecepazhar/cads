<script lang="ts">
  export interface ComboboxOption {
    value: string;
    label: string;
  }

  interface Props {
    options: ComboboxOption[];
    value?: string;
    placeholder?: string;
    class?: string;
  }

  let {
    options = [],
    value = $bindable(''),
    placeholder = 'Search...',
    class: customClass = '',
  }: Props = $props();

  let query = $state('');
  let open = $state(false);

  const filtered = $derived(
    query ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())) : options
  );
</script>

<div class="relative w-full text-left {customClass}">
  <input
    type="text"
    bind:value={query}
    {placeholder}
    onfocus={() => (open = true)}
    class="w-full rounded-lg border border-neutral-700 bg-[#121217] px-3 py-2 text-xs text-neutral-200 focus:border-[var(--ca-brand)] focus:outline-none"
  />
  {#if open}
    <div class="absolute z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-neutral-800 bg-neutral-900 p-1 shadow-2xl">
      {#each filtered as opt}
        <button
          type="button"
          onclick={() => {
            value = opt.value;
            query = opt.label;
            open = false;
          }}
          class="w-full rounded px-2.5 py-1.5 text-left text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white cursor-pointer"
        >
          {opt.label}
        </button>
      {/each}
    </div>
  {/if}
</div>
