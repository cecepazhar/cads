<script lang="ts">
  import { getLocale, setLocale, type Locale } from '$lib/i18n';

  let current = $derived(getLocale());

  function toggle() {
    setLocale(current === 'en' ? 'id' : 'en');
  }
</script>

<button
  onclick={toggle}
  class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#272732] bg-[#141419] hover:bg-[#1C1C24] text-xs font-mono font-semibold text-neutral-300 hover:text-white transition-all cursor-pointer"
  title="Switch Language (English / Bahasa Indonesia)"
>
  <span class="text-neutral-500 text-[10px]">LANG:</span>
  <span class="text-white font-bold">{current.toUpperCase()}</span>
</button>
