<script lang="ts">
  import { onMount } from 'svelte';
  import { Button, Badge, Input, Card, Logo } from '$lib';
  import PageHeader from '$lib/components/PageHeader.svelte';

  // Live Brand Accent Switcher for Pro Theme Testing
  const brandAccents = [
    { name: 'Monochrome (Zinc)', hex: '#71717a' },
    { name: 'Cyan (CATerm / CAMark)', hex: '#06b6d4' },
    { name: 'Emerald (CACash)', hex: '#10b981' },
    { name: 'Violet (CAStudio)', hex: '#8b5cf6' },
    { name: 'Rose (Alert)', hex: '#f43f5e' },
    { name: 'Blue (Core)', hex: '#3b82f6' },
  ];

  let selectedAccent = $state(brandAccents[1].hex);
  let buttonLoading = $state(false);
  let testInputValue = $state('');

  function setBrandAccent(hex: string) {
    selectedAccent = hex;
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--ca-brand', hex);
    }
  }

  onMount(() => {
    setBrandAccent(selectedAccent);
  });
</script>

<div class="flex-1 w-full p-4 sm:p-6 md:p-8 space-y-8 font-sans select-none">
  <!-- Top Hero / Banner Header -->
  <div class="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#18181F] to-[#121217] border border-[#272732] shadow-xl relative overflow-hidden">
    <div class="absolute -top-12 -right-12 opacity-5 pointer-events-none">
      <Logo size={280} mode="white" />
    </div>
    <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="space-y-2 max-w-2xl">
        <div class="flex items-center gap-2">
          <Badge variant="brand" size="xs">OFFICIAL DESIGN SYSTEM</Badge>
          <Badge variant="neutral" size="xs">SVELTE 5 RUNES</Badge>
          <Badge variant="neutral" size="xs">TAILWIND v4</Badge>
        </div>
        <h1 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <Logo size={32} mode="brand" />
          <span>CADS — Cecep Azhar Design System</span>
        </h1>
        <p class="text-sm text-neutral-400 leading-relaxed">
          The sovereign developer design system and token contract powering <strong>CATerm</strong>, <strong>CAMark</strong>, <strong>CACash</strong>, and the <strong>Fathforce Ecosystem</strong>. Engineered by <strong>Cecep Saeful Azhar Hidayat, ST</strong> with zero-knowledge aesthetics, anti-bloat HUD components, and full dark-mode optimization.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <a href="https://www.cecepazhar.com" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm">
            <svg class="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Author Website
          </Button>
        </a>
        <a href="https://github.com/cecep-azhar/cads" target="_blank" rel="noopener noreferrer">
          <Button variant="brand" size="sm">
            <svg class="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub Star
          </Button>
        </a>
      </div>
    </div>
  </div>

  <!-- Pro Brand Accent Live Switcher -->
  <Card
    title="Reactive Brand Color Engine (--ca-brand)"
    description="Test how the monochrome obsidian HUD palette adapts across different ecosystem brand accents."
  >
    <div class="flex flex-wrap items-center gap-2 pt-1">
      {#each brandAccents as b}
        <button
          onclick={() => setBrandAccent(b.hex)}
          class="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer {selectedAccent === b.hex ? 'border-white bg-white/10 text-white shadow-xs' : 'border-[#272732] bg-[#18181F]/40 text-neutral-400 hover:text-white'}"
        >
          <span class="w-3 h-3 rounded-full border border-black/30" style="background-color: {b.hex};"></span>
          <span>{b.name}</span>
          {#if selectedAccent === b.hex}
            <span class="text-[10px] text-white font-bold">✓</span>
          {/if}
        </button>
      {/each}
    </div>
  </Card>

  <!-- 0. Brand & Official Logo Element -->
  <Card
    title="Official Cecep Azhar Dual-Wing Vector Component"
    description="Dedicated SVG component with reactive sizing, color modes, and vector precision."
  >
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
      <div class="p-4 rounded-xl bg-[#0E0E12] border border-[#272732] flex flex-col items-center justify-center gap-3 text-center">
        <Logo size={44} mode="brand" />
        <div>
          <span class="text-xs font-bold text-white block">Brand Mode</span>
          <span class="text-[10px] text-neutral-400 font-mono">mode="brand"</span>
        </div>
      </div>

      <div class="p-4 rounded-xl bg-[#0E0E12] border border-[#272732] flex flex-col items-center justify-center gap-3 text-center">
        <Logo size={44} mode="white" />
        <div>
          <span class="text-xs font-bold text-white block">White Monoline</span>
          <span class="text-[10px] text-neutral-400 font-mono">mode="white"</span>
        </div>
      </div>

      <div class="p-4 rounded-xl bg-neutral-100 border border-neutral-300 flex flex-col items-center justify-center gap-3 text-center text-neutral-900">
        <Logo size={44} mode="light" />
        <div>
          <span class="text-xs font-bold text-neutral-900 block">Light Contrast</span>
          <span class="text-[10px] text-neutral-600 font-mono">mode="light"</span>
        </div>
      </div>

      <div class="p-4 rounded-xl bg-[#0E0E12] border border-[#272732] flex flex-col items-center justify-center gap-3 text-center">
        <div class="flex items-center gap-2">
          <Logo size={20} mode="brand" />
          <Logo size={28} mode="brand" />
          <Logo size={36} mode="brand" />
        </div>
        <div>
          <span class="text-xs font-bold text-white block">Scalable Sizes</span>
          <span class="text-[10px] text-neutral-400 font-mono">size=20, 28, 36</span>
        </div>
      </div>
    </div>
  </Card>

  <!-- 1. Buttons Laboratory -->
  <Card
    title="1. Button Primitives (Full Outline & Monochrome Scale)"
    description="Standardized interactive buttons. Strict height and padding scale (sm: 28px, md: 36px, lg: 42px). Solid white is reserved for primary confirm, all other actions use monoline outline."
  >
    <div class="space-y-6">
      <!-- Variants Row -->
      <div>
        <span class="text-[10px] font-mono uppercase text-neutral-500 block mb-2 font-bold tracking-wider">
          Style Variants (size="md"):
        </span>
        <div class="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary (Solid White)</Button>
          <Button variant="secondary">Secondary (Subtle)</Button>
          <Button variant="outline">Outline (Wireframe)</Button>
          <Button variant="ghost">Ghost (Flat)</Button>
          <Button variant="danger">Danger (Rose)</Button>
          <Button variant="brand">Brand (--ca-brand)</Button>
        </div>
      </div>

      <!-- Size Scale Row -->
      <div>
        <span class="text-[10px] font-mono uppercase text-neutral-500 block mb-2 font-bold tracking-wider">
          Size Scale (variant="outline" & "brand"):
        </span>
        <div class="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm">Small (sm · 28px)</Button>
          <Button variant="outline" size="md">Medium (md · 36px)</Button>
          <Button variant="outline" size="lg">Large (lg · 42px)</Button>
          <Button variant="brand" size="icon" title="Terminal Icon">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3" />
            </svg>
          </Button>
        </div>
      </div>

      <!-- State Tester Row -->
      <div>
        <span class="text-[10px] font-mono uppercase text-neutral-500 block mb-2 font-bold tracking-wider">
          Interactive States (Disabled & Loading):
        </span>
        <div class="flex flex-wrap items-center gap-3">
          <Button variant="primary" disabled>Disabled Primary</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
          <Button
            variant="brand"
            loading={buttonLoading}
            onclick={() => {
              buttonLoading = true;
              setTimeout(() => (buttonLoading = false), 2000);
            }}
          >
            {buttonLoading ? 'Processing...' : 'Click to Test Loading Spinner'}
          </Button>
        </div>
      </div>
    </div>
  </Card>

  <!-- 2. Badges & Tags Laboratory -->
  <Card
    title="2. Badge & Status Primitives"
    description="Micro badges for host states, connection metrics, protocol tags, and audit flags."
  >
    <div class="space-y-4">
      <div>
        <span class="text-[10px] font-mono uppercase text-neutral-500 block mb-2 font-bold tracking-wider">
          Variants & Colors:
        </span>
        <div class="flex flex-wrap items-center gap-2">
          <Badge variant="neutral">NEUTRAL 200</Badge>
          <Badge variant="success">● ONLINE / CONNECTED</Badge>
          <Badge variant="warning">▲ HIGH LOAD 88%</Badge>
          <Badge variant="danger">✕ CRITICAL DISCONNECT</Badge>
          <Badge variant="brand">★ PRO ACTIVE</Badge>
        </div>
      </div>

      <div>
        <span class="text-[10px] font-mono uppercase text-neutral-500 block mb-2 font-bold tracking-wider">
          Sizes (xs vs sm):
        </span>
        <div class="flex items-center gap-2">
          <Badge variant="neutral" size="xs">SIZE XS (10px)</Badge>
          <Badge variant="neutral" size="sm">SIZE SM (12px)</Badge>
          <Badge variant="brand" size="xs">ED25519-ZK</Badge>
          <Badge variant="brand" size="sm">HOST-PRO-TIER</Badge>
        </div>
      </div>
    </div>
  </Card>

  <!-- 3. Form Input Controls -->
  <Card
    title="3. Input & Text Controls"
    description="Monochrome text input with subtle border transition, icon slots, and trailing action buttons."
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="demo-input-1" class="block text-xs font-semibold text-neutral-300 mb-1.5">Standard Input:</label>
        <Input id="demo-input-1" bind:value={testInputValue} placeholder="e.g. 192.168.1.100 or server.domain.com" />
      </div>

      <div>
        <label for="demo-input-2" class="block text-xs font-semibold text-neutral-300 mb-1.5">Input with Search Icon:</label>
        <Input id="demo-input-2" placeholder="Search hosts, snippets, logs...">
          {#snippet leadingIcon()}
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          {/snippet}
        </Input>
      </div>
    </div>
  </Card>

  <!-- 4. Design Token Specifications & Contracts -->
  <Card
    title="4. CADS v1.0 Architectural Design Contract"
    description="Core tokens adhering to Sovereign Developer ethos: Zero-knowledge, Anti-bloat, Local-first."
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
      <div class="p-3 rounded-lg bg-[#0E0E12] border border-[#272732] space-y-1">
        <span class="text-neutral-500 block text-[10px]">SURFACE_BASE</span>
        <span class="font-bold text-white block">#0A0A0C</span>
        <span class="text-[10px] text-neutral-400">Deep obsidian background</span>
      </div>
      <div class="p-3 rounded-lg bg-[#0E0E12] border border-[#272732] space-y-1">
        <span class="text-neutral-500 block text-[10px]">SURFACE_ELEVATED</span>
        <span class="font-bold text-white block">#121217 / #161616</span>
        <span class="text-[10px] text-neutral-400">Raised content cards</span>
      </div>
      <div class="p-3 rounded-lg bg-[#0E0E12] border border-[#272732] space-y-1">
        <span class="text-neutral-500 block text-[10px]">BORDER_SUBTLE</span>
        <span class="font-bold text-white block">#272732 / #27272A</span>
        <span class="text-[10px] text-neutral-400">Crisp HUD wireframe lines</span>
      </div>
      <div class="p-3 rounded-lg bg-[#0E0E12] border border-[#272732] space-y-1">
        <span class="text-neutral-500 block text-[10px]">BRAND_ACCENT</span>
        <span class="font-bold block" style="color: {selectedAccent};">{selectedAccent.toUpperCase()}</span>
        <span class="text-[10px] text-neutral-400">Reactive CSS variable</span>
      </div>
    </div>
  </Card>
</div>
