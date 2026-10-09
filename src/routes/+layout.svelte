<script lang="ts">
  import '../app.css';
  import Logo from '$lib/components/Logo.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';

  let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-[#0A0A0C] text-[#EDEDED] antialiased selection:bg-[var(--ca-brand,#06B6D4)] selection:text-black">
  <!-- Global Top Header -->
  <header class="sticky top-0 z-40 w-full border-b border-[#272732] bg-[#0A0A0C]/85 backdrop-blur-md px-4 sm:px-8 py-3 transition-colors">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
      <a href="/" class="flex items-center gap-3 group focus:outline-hidden">
        <div class="p-1.5 rounded-lg bg-[#121217] border border-[#272732] group-hover:border-[var(--ca-brand,#06B6D4)] transition-all">
          <Logo size={24} mode="brand" />
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-2">
            <span class="font-bold text-sm tracking-tight text-white group-hover:text-[var(--ca-brand,#06B6D4)] transition-colors">CADS</span>
            <span class="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-sm bg-white/5 border border-white/10 text-neutral-400">v1.0.0</span>
          </div>
          <span class="text-[11px] text-neutral-400 font-medium">Cecep Azhar Design System</span>
        </div>
      </a>

      <nav class="flex items-center gap-2 sm:gap-3">
        <a
          href="https://www.cecepazhar.com"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 hover:text-white hover:bg-[#121217] border border-transparent hover:border-[#272732] transition-all"
        >
          <span>cecepazhar.com</span>
          <svg class="w-3 h-3 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>

        <a
          href="https://fathforce.com"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 hover:text-white hover:bg-[#121217] border border-transparent hover:border-[#272732] transition-all"
        >
          <span>Fathforce</span>
          <svg class="w-3 h-3 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>

        <a
          href="https://wa.me/6285220696117"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-400 hover:text-emerald-300 hover:bg-[#121217] border border-transparent hover:border-[#272732] transition-all"
        >
          <span>WhatsApp</span>
        </a>

        <a
          href="https://github.com/cecep-azhar/cads"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#121217] border border-[#272732] text-white hover:border-neutral-500 hover:bg-[#18181F] transition-all"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>GitHub</span>
        </a>
      </nav>
    </div>
  </header>

  <!-- Main Content Body -->
  <main class="flex-1 w-full max-w-7xl mx-auto flex flex-col">
    {@render children?.()}
  </main>

  <!-- Global Footer -->
  <footer class="border-t border-[#272732] bg-[#0E0E12] py-8 px-4 sm:px-8 mt-12">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
      <div class="flex items-center gap-2.5">
        <Logo size={18} mode="brand" />
        <span>Architected & Engineered by <a href="https://www.cecepazhar.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-[var(--ca-brand,#06B6D4)] font-medium underline-offset-2 hover:underline">Cecep Saeful Azhar Hidayat, ST</a> · <a href="https://fathforce.com" target="_blank" rel="noopener noreferrer" class="text-neutral-300 hover:text-white font-medium">Fathforce Ecosystem</a></span>
      </div>
      <div class="flex flex-wrap items-center gap-6">
        <a href="https://www.cecepazhar.com" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Website</a>
        <a href="mailto:hi@cecepazhar.com" class="hover:text-white transition-colors">hi@cecepazhar.com</a>
        <a href="https://wa.me/6285220696117" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-400 transition-colors">0852-2069-6117</a>
        <a href="https://github.com/cecep-azhar" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">GitHub</a>
        <a href="https://fathforce.com" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Fathforce</a>
        <span class="font-mono text-[11px] text-neutral-500">MIT License</span>
      </div>
    </div>
  </footer>
</div>
