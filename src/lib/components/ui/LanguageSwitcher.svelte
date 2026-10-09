<script lang="ts">
  import { getLocale, setLocale } from '$lib/i18n.svelte';

  let current = $derived(getLocale());

  function toggle() {
    setLocale(current === 'en' ? 'id' : 'en');
  }
</script>

<button
  onclick={toggle}
  class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-[#272732] bg-neutral-100 dark:bg-[#141419] hover:bg-neutral-200 dark:hover:bg-[#1C1C24] text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all cursor-pointer"
  title="Switch Language (English / Bahasa Indonesia)"
>
  <span class="text-neutral-500 text-[10px]">LANG:</span>
  <span class="text-neutral-900 dark:text-white font-bold">{current.toUpperCase()}</span>
</button>
