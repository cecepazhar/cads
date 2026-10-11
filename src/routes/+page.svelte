<script lang="ts">
  import { onMount } from 'svelte';
  import Logo from '$lib/components/Logo.svelte';
  import {
    Button,
    Badge,
    Switch,
    PinInput,
    Slider,
    Avatar,
    AvatarGroup,
    SegmentedControl,
    ThemeSwitcher,
    LanguageSwitcher,
  } from '$lib/components/ui';

  // Interactive Live Playground State
  let brandColor = $state('#06b6d4');
  let switchState = $state(true);
  let sliderVal = $state(68);
  let pinVal = $state('202610');
  let copied = $state(false);

  const brandPresets = [
    { name: 'Monochrome (Zinc)', hex: '#71717a' },
    { name: 'CATerm Cyan', hex: '#06b6d4' },
    { name: 'CAStudio Violet', hex: '#8b5cf6' },
    { name: 'CACash Emerald', hex: '#10b981' },
    { name: 'CABench Crimson', hex: '#ef4444' },
    { name: 'CAEntech Amber', hex: '#eab308' },
  ];

  const apps = [
    { name: 'CATerm', desc: 'Zero-Knowledge SSH/SFTP Terminal & Cluster Fleet Manager', tag: 'Cyan #06B6D4' },
    { name: 'CAMark', desc: 'Zen Distraction-Free Offline Encrypted Markdown IDE', tag: 'Cyan #06B6D4' },
    { name: 'CAStudio', desc: 'Multi-Channel AI Repurposing & Automation Suite', tag: 'Violet #8B5CF6' },
    { name: 'CACash', desc: 'Sovereign Offline Multi-Tenant Islamic Financial Ledger', tag: 'Emerald #10B981' },
    { name: 'CABench', desc: 'Real-time Autonomous Multi-Agent AI Benchmark Arena', tag: 'Crimson #EF4444' },
    { name: 'CATama', desc: 'Zero-Bloat Cybernetic Habit & Virtual Companion Engine', tag: 'Amber #EAB308' },
  ];

  function copyInstall() {
    navigator.clipboard.writeText('pnpm add @cecepazhar/caui');
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }

  function setBrand(hex: string) {
    brandColor = hex;
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--ca-brand', hex);
    }
  }

  onMount(() => {
    setBrand(brandColor);
  });
</script>

<div class="min-h-screen flex flex-col bg-white dark:bg-[#0A0A0C] text-neutral-900 dark:text-[#EDEDED] font-sans antialiased selection:bg-[var(--ca-brand)] selection:text-white transition-colors duration-200">
  <!-- Topbar -->
  <header class="sticky top-0 z-40 border-b border-neutral-200 dark:border-[#272732] bg-white/90 dark:bg-[#0A0A0C]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between max-w-7xl w-full mx-auto">
    <div class="flex items-center gap-6">
      <a href="/" class="flex items-center gap-3 group">
        <Logo size={32} mode="brand" />
        <div class="flex flex-col text-left">
          <span class="font-bold text-sm tracking-tight text-neutral-900 dark:text-white group-hover:text-[var(--ca-brand)] dark:group-hover:text-[var(--ca-brand)] transition">CAUI</span>
          <span class="text-[10px] font-mono text-neutral-500">The UI Foundation of the CA Ecosystem</span>
        </div>
      </a>
      <nav class="hidden md:flex items-center gap-6 text-xs font-medium text-neutral-500 dark:text-neutral-400">
        <a href="/docs" class="hover:text-neutral-900 dark:hover:text-white transition">Documentation</a>
        <a href="/docs/components" class="hover:text-neutral-900 dark:hover:text-white transition">Components</a>
        <a href="/docs/tokens" class="hover:text-neutral-900 dark:hover:text-white transition">Tokens</a>
        <a href="/docs/installation" class="hover:text-neutral-900 dark:hover:text-white transition">Installation</a>
      </nav>
    </div>
    <div class="flex items-center gap-3">
      <LanguageSwitcher />
      <ThemeSwitcher />
    </div>
  </header>

  <!-- Hero Section -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-6 py-16 md:py-24 space-y-20">
    <div class="text-center max-w-3xl mx-auto space-y-6">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-[#121217] text-xs font-mono text-neutral-300">
        <span class="w-2 h-2 rounded-full bg-[var(--ca-brand)] animate-pulse"></span>
        <span>CAUI v1.0 — Powered by Svelte 5 Runes</span>
      </div>

      <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
        Unstyled & Cyberpunk Wireframe UI Components for
        <span class="bg-gradient-to-r from-neutral-200 via-white to-neutral-400 bg-clip-text text-transparent"> Sovereign Apps.</span>
      </h1>

      <p class="text-sm md:text-base text-neutral-400 leading-relaxed max-w-2xl mx-auto">
        Koleksi komponen UI modern berkecepatan tinggi, tanpa Virtual DOM, ramah Tauri desktop dan web sovereign.
        Arsitektur berbasis monoline wireframe monokrom dengan aksen dinamis <code class="text-white font-mono">--ca-brand</code>.
      </p>

      <!-- Install Command & CTAs -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <div class="flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 font-mono text-xs text-neutral-300 shadow-2xl">
          <span class="text-neutral-500">$</span>
          <span>pnpm add @cecepazhar/caui</span>
          <button
            type="button"
            onclick={copyInstall}
            class="ml-2 px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-[10px] text-white font-sans transition cursor-pointer"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <a
          href="/docs/components"
          class="px-5 py-2.5 rounded-xl bg-white text-neutral-950 font-semibold text-xs hover:bg-neutral-200 transition shadow-lg"
        >
          Explore Catalog &rarr;
        </a>
      </div>

      <!-- Repository & Package Links -->
      <div class="flex items-center justify-center gap-3 pt-1">
        <a
          href="https://github.com/cecepazhar/caui"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-2 text-xs px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.26.82-.57 0-.28-.01-1.02-.02-2-3.34.72-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.22 1.84 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 013.01-.4c1.02.01 2.05.14 3.01.4 2.29-1.53 3.3-1.21 3.3-1.21.66 1.64.24 2.86.12 3.16.77.83 1.24 1.88 1.24 3.17 0 4.53-2.81 5.53-5.49 5.82.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.3 0 .31.21.69.83.57A12.02 12.02 0 0024 12.29C24 5.78 18.63.5 12 .5z"/></svg>
          GitHub
        </a>
        <a
          href="https://www.npmjs.com/package/@cecepazhar/caui"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-2 text-xs px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C23.214.786 22.428 0 21.451 0H1.763zM5.13 5.323l13.837.019v13.818h-6.907v-6.92H8.95v6.92H5.13V5.323z"/></svg>
          npm
        </a>
      </div>

      <!-- Author Attribution -->
      <div class="text-[11px] text-neutral-500 pt-2">
        Architected & Engineered by <a href="https://cecepazhar.com" target="_blank" class="text-neutral-300 underline underline-offset-4 hover:text-white">Cecep Saeful Azhar Hidayat, ST</a> · Fathforce Ecosystem
      </div>
    </div>

    <!-- Live Interactive Sandbox -->
    <div class="rounded-2xl border border-[#272732] bg-[#121217] p-6 md:p-8 shadow-2xl space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <h3 class="text-base font-bold text-white flex items-center gap-2">
            Interactive Component Sandbox
            <Badge variant="brand" size="xs">Live Runes</Badge>
          </h3>
          <p class="text-xs text-neutral-400 mt-1">Uji reaktivitas Svelte 5 tanpa page reload. Ubah tema dan coba komponen di bawah.</p>
        </div>

        <!-- Brand Accent Picker -->
        <div class="flex items-center gap-2">
          <span class="text-xs text-neutral-400 font-mono">Theme:</span>
          {#each brandPresets as b (b.hex)}
            <button
              type="button"
              onclick={() => setBrand(b.hex)}
              class="w-5 h-5 rounded-full border border-white/20 transition-transform hover:scale-110 cursor-pointer {brandColor === b.hex ? 'ring-2 ring-white ring-offset-2 ring-offset-neutral-900' : ''}"
              style="background-color: {b.hex};"
              title={b.name}
            ></button>
          {/each}
        </div>
      </div>

      <!-- Component Sandbox Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Interactive Buttons & Avatars -->
        <div class="rounded-xl border border-neutral-800 bg-neutral-950 p-5 space-y-4">
          <h4 class="text-xs font-semibold text-neutral-300">Buttons & Avatars</h4>
          <div class="flex flex-wrap gap-2">
            <Button variant="primary" size="sm">Solid White</Button>
            <Button variant="brand" size="sm">Brand Action</Button>
            <Button variant="outline" size="sm">Outline</Button>
          </div>
          <div class="flex items-center gap-3 pt-2">
            <Avatar fallback="CA" halo="pro" size="md" />
            <Avatar fallback="FH" halo="brand" size="md" />
            <AvatarGroup>
              <Avatar fallback="01" size="sm" />
              <Avatar fallback="02" size="sm" />
              <Avatar fallback="03" size="sm" />
            </AvatarGroup>
          </div>
        </div>

        <!-- Interactive Controls -->
        <div class="rounded-xl border border-neutral-800 bg-neutral-950 p-5 space-y-4">
          <h4 class="text-xs font-semibold text-neutral-300">Switches & Sliders</h4>
          <Switch bind:checked={switchState} label="Zero-Knowledge Shield" description="Argon2id + XChaCha20" />
          <div class="space-y-1 pt-2">
            <div class="flex justify-between text-[11px] font-mono text-neutral-400">
              <span>Slider Power</span>
              <span>{sliderVal}%</span>
            </div>
            <Slider min={0} max={100} bind:value={sliderVal} />
          </div>
        </div>

        <!-- Interactive PinInput -->
        <div class="rounded-xl border border-neutral-800 bg-neutral-950 p-5 space-y-4">
          <h4 class="text-xs font-semibold text-neutral-300">2FA PinInput & Navigation</h4>
          <PinInput bind:value={pinVal} length={6} />
          <div class="pt-2">
            <SegmentedControl
              options={[
                { value: 'tab1', label: 'Terminal' },
                { value: 'tab2', label: 'Cluster' },
                { value: 'tab3', label: 'Vault' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 17 Sovereign Applications Grid -->
    <div class="space-y-8">
      <div class="text-center max-w-xl mx-auto space-y-2">
        <h2 class="text-2xl font-bold text-white tracking-tight">Ecosystem Applications</h2>
        <p class="text-xs text-neutral-400">CAUI menjadi pondasi desain tunggal yang menyatukan 17 aplikasi produk Fathforce.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each apps as app (app.name)}
          <div class="rounded-xl border border-neutral-800 bg-[#121217] p-5 space-y-2 hover:border-neutral-700 transition">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-white">{app.name}</h3>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded border border-neutral-700 text-neutral-300">{app.tag}</span>
            </div>
            <p class="text-xs text-neutral-400 leading-relaxed">{app.desc}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Bottom CTA -->
    <div class="rounded-2xl border border-neutral-800 bg-gradient-to-b from-[#14141A] to-[#0A0A0C] p-8 md:p-12 text-center space-y-4">
      <h2 class="text-2xl sm:text-3xl font-extrabold text-white">Mulai Bangun dengan CAUI Hari Ini</h2>
      <p class="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
        Koleksi lengkap 36+ komponen, token Tailwind v4, dan panduan integrasi siap pakai.
      </p>
      <div class="pt-2">
        <a
          href="/docs"
          class="inline-flex px-6 py-3 rounded-xl bg-[var(--ca-brand)] text-neutral-950 font-bold text-xs hover:opacity-90 transition shadow-xl"
        >
          Lihat Dokumentasi Lengkap &rarr;
        </a>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="border-t border-[#272732] py-8 px-6 text-center text-xs text-neutral-500 font-sans">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>&copy; 2026 CA Design System (CAUI). All rights reserved.</div>
      <div class="flex items-center gap-4 text-neutral-400">
        <a href="https://cecepazhar.com" target="_blank" class="hover:text-white transition">cecepazhar.com</a>
        <a href="https://fathforce.com" target="_blank" class="hover:text-white transition">Fathforce</a>
        <a href="https://github.com/cecepazhar/caui" target="_blank" class="hover:text-white transition">GitHub</a>
        <a href="https://www.npmjs.com/package/@cecepazhar/caui" target="_blank" class="hover:text-white transition">npm</a>
      </div>
    </div>
  </footer>
</div>
