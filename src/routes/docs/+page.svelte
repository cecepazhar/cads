<script lang="ts">
  import { Button, Badge, Card, Kbd } from '$lib/components/ui';

  let copied = $state(false);

  function copyInstall() {
    navigator.clipboard.writeText('pnpm add @cecepazhar/caui');
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }
</script>

<div class="space-y-8">
  <div>
    <Badge variant="brand" size="xs">CAUI ARCHITECTURE v1.0</Badge>
    <h1 class="text-3xl font-extrabold text-white mt-2 tracking-tight">Overview & Quickstart</h1>
    <p class="text-sm text-neutral-400 mt-2 leading-relaxed">
      CAUI (CA Design System) adalah pustaka komponen UI monoline wireframe & tech-brutalist, dibangun secara native di atas <strong>Svelte 5 Runes</strong> untuk 17 aplikasi ekosistem CA.
    </p>
  </div>

  <!-- Install Card -->
  <Card title="Quick Installation" description="Install paket via pnpm, npm, atau yarn ke dalam proyek SvelteKit Anda.">
    <div class="flex items-center justify-between rounded-lg bg-neutral-950 border border-neutral-800 p-3 font-mono text-xs text-neutral-300 mt-2">
      <span>pnpm add @cecepazhar/caui</span>
      <button
        type="button"
        onclick={copyInstall}
        class="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-[11px] text-white font-sans transition cursor-pointer"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  </Card>

  <!-- Key Pillars Grid -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="rounded-xl border border-neutral-800 bg-[#121217] p-4 space-y-2">
      <div class="text-lg">⚡</div>
      <h3 class="text-sm font-semibold text-white">Svelte 5 Runes Native</h3>
      <p class="text-xs text-neutral-400 leading-relaxed">Dibuat menggunakan <code class="text-neutral-300">$state</code>, <code class="text-neutral-300">$props</code>, dan <code class="text-neutral-300">@render</code> snippets tanpa Virtual DOM overhead.</p>
    </div>

    <div class="rounded-xl border border-neutral-800 bg-[#121217] p-4 space-y-2">
      <div class="text-lg">🎨</div>
      <h3 class="text-sm font-semibold text-white">Monochrome + Pro Token</h3>
      <p class="text-xs text-neutral-400 leading-relaxed">Basis Zinc monokrom dengan dynamic runtime theme override melalui satu CSS variable <code class="text-neutral-300">--ca-brand</code>.</p>
    </div>

    <div class="rounded-xl border border-neutral-800 bg-[#121217] p-4 space-y-2">
      <div class="text-lg">🔒</div>
      <h3 class="text-sm font-semibold text-white">Zero Extra Bloat</h3>
      <p class="text-xs text-neutral-400 leading-relaxed">Mandiri dan ringan. Ideal untuk desktop Tauri (CATerm, CAMark, CAStudio) dan web app modern.</p>
    </div>
  </div>

  <div class="pt-4 flex items-center gap-3">
    <a href="/docs/components" class="px-4 py-2 rounded-lg bg-[var(--ca-brand)] text-neutral-950 font-semibold text-xs hover:opacity-90 transition">
      Explore All 36+ Components &rarr;
    </a>
    <a href="/docs/installation" class="px-4 py-2 rounded-lg border border-neutral-700 bg-neutral-900 text-white font-medium text-xs hover:bg-neutral-800 transition">
      Installation Guide
    </a>
  </div>
</div>
