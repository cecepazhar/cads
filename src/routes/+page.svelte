<script lang="ts">
  import { onMount } from 'svelte';
  import { 
    Button, 
    Badge, 
    Input, 
    Card, 
    Table, 
    Modal, 
    Alert, 
    Sidebar, 
    SidebarItem, 
    Icon, 
    LanguageSwitcher, 
    ThemeSwitcher,
    FramelessHeader,
    SplitPane,
    CommandPalette,
    TelemetryCard
  } from '$lib/components/ui';
  import { 
    SplashScreen, 
    LoginScreen, 
    DashboardView, 
    AiChatPanel 
  } from '$lib/components/templates';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Logo from '$lib/components/Logo.svelte';

  // Brand Accents
  const brandAccents = [
    { name: 'Monochrome (Zinc)', hex: '#71717a' },
    { name: 'Rose / Crimson (CATerm)', hex: '#ef4444' },
    { name: 'Cyan (CAMark)', hex: '#06b6d4' },
    { name: 'Emerald (CACash)', hex: '#10b981' },
    { name: 'Violet (CAStudio)', hex: '#8b5cf6' },
    { name: 'Amber (CAEntech)', hex: '#eab308' },
    { name: 'Blue (Core)', hex: '#3b82f6' },
  ];

  let selectedAccent = $state(brandAccents[1].hex);
  let buttonLoading = $state(false);
  let testInputValue = $state('');
  let modalOpen = $state(false);

  // Sample Data for Table
  const tableColumns = [
    { key: 'host', label: 'Host & Address', sortable: true },
    { key: 'status', label: 'Status' },
    { key: 'cpu', label: 'CPU Load', sortable: true },
    { key: 'memory', label: 'RAM Usage', sortable: true },
    { key: 'uptime', label: 'Uptime' },
  ];

  const tableData = [
    { host: 'Hostinger VPS (100.76.150.46)', status: 'online', cpu: '12%', memory: '3.4 / 8.0 GB', uptime: '42d 18h' },
    { host: 'X1 ThinkPad (100.78.73.124)', status: 'online', cpu: '24%', memory: '7.8 / 16.0 GB', uptime: '6d 04h' },
    { host: 'pc-gerlink (100.64.12.89)', status: 'idle', cpu: '4%', memory: '2.1 / 16.0 GB', uptime: '18d 22h' },
    { host: 'AWS Backup Node (ap-southeast-1)', status: 'offline', cpu: '0%', memory: '0.0 / 4.0 GB', uptime: 'Offline' },
  ];

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

<div class="flex-1 flex flex-col h-full bg-[#0A0A0C] text-[#EDEDED] overflow-y-auto p-6 space-y-8 font-sans select-none max-w-7xl mx-auto">
  
  <!-- 1. Header & Personal Branding -->
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#272732] pb-6">
    <div class="flex items-center gap-4">
      <Logo size={48} mode="brand" />
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          CADS v1.0 — CAFramework Design System
          <span class="text-xs px-2 py-0.5 rounded-full border border-white/20 bg-white/5 text-neutral-300 font-mono font-normal">Svelte 5 Runes</span>
        </h1>
        <p class="text-xs text-neutral-400 mt-1">
          Architected & Engineered by <span class="text-white font-medium">Cecep Saeful Azhar Hidayat, ST</span> · Fathforce Ecosystem
        </p>
      </div>
    </div>
    
    <div class="flex items-center gap-3">
      <LanguageSwitcher />
      <ThemeSwitcher />
    </div>
  </div>

  <!-- 2. Brand Accent Matrix -->
  <Card title="Brand Accent Theming (CSS Variable --ca-brand)" description="Live override palette for Pro custom branding across 17 applications.">
    <div class="flex flex-wrap items-center gap-2 pt-1">
      {#each brandAccents as b}
        <button
          onclick={() => setBrandAccent(b.hex)}
          class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer {selectedAccent === b.hex ? 'border-white bg-white/10 text-white' : 'border-[#272732] bg-[#18181F]/40 text-neutral-400 hover:text-white'}"
        >
          <span class="w-3 h-3 rounded-full border border-black/30" style="background-color: {b.hex};"></span>
          <span>{b.name}</span>
          {#if selectedAccent === b.hex}<span class="text-[10px] text-white">✓</span>{/if}
        </button>
      {/each}
    </div>
  </Card>

  <!-- 3. Telemetry & Metrik Cards -->
  <div>
    <h2 class="text-sm font-mono uppercase text-neutral-400 font-bold tracking-wider mb-3">Live Telemetry & Metrics Primitives</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <TelemetryCard title="CPU Load" value="18.4%" change="+2.1%" changeType="increase" icon="cpu" />
      <TelemetryCard title="Memory Usage" value="6.2 / 16 GB" change="38.7%" changeType="neutral" icon="hard-drive" />
      <TelemetryCard title="Relay Latency" value="8.4 ms" change="-1.2 ms" changeType="decrease" icon="activity" />
      <TelemetryCard title="Active SSH Sessions" value="12 Nodes" change="Stable" changeType="neutral" icon="terminal" />
    </div>
  </div>

  <!-- 4. Atomic Buttons & Size Scales -->
  <Card title="Button Scale & Variants" description="Monochrome solid base with outline secondary, ghost, danger, and dynamic brand variant.">
    <div class="space-y-6">
      <div>
        <span class="text-[10px] font-mono uppercase text-neutral-500 block mb-2 font-bold tracking-wider">Style Variants:</span>
        <div class="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary (Solid White)</Button>
          <Button variant="secondary">Secondary (Dark)</Button>
          <Button variant="outline">Outline (Wireframe)</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="brand">Brand Accent</Button>
        </div>
      </div>

      <div>
        <span class="text-[10px] font-mono uppercase text-neutral-500 block mb-2 font-bold tracking-wider">Size Scale (Strict Heights: 28px, 36px, 42px):</span>
        <div class="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm">Small (28px)</Button>
          <Button variant="outline" size="md">Medium (36px)</Button>
          <Button variant="outline" size="lg">Large (42px)</Button>
          <Button
            variant="brand"
            loading={buttonLoading}
            onclick={() => {
              buttonLoading = true;
              setTimeout(() => (buttonLoading = false), 2000);
            }}
          >
            {buttonLoading ? 'Executing...' : 'Click for Loading State'}
          </Button>
        </div>
      </div>
    </div>
  </Card>

  <!-- 5. Badges, Chips & Form Inputs -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Card title="Badges & Status Indicators" description="HUD status tags for hosts and telemetry.">
      <div class="space-y-3">
        <div class="flex flex-wrap items-center gap-2">
          <Badge variant="neutral">NEUTRAL 200</Badge>
          <Badge variant="success">● ONLINE</Badge>
          <Badge variant="warning">▲ HIGH LOAD</Badge>
          <Badge variant="danger">✕ CRITICAL</Badge>
          <Badge variant="brand">★ PRO ACTIVE</Badge>
        </div>
        <div class="flex items-center gap-2 pt-2">
          <Badge variant="brand" size="xs">ED25519-ZK</Badge>
          <Badge variant="neutral" size="sm">ARM64 ARCH</Badge>
          <Badge variant="success" size="sm">TAILSCALE MESH</Badge>
        </div>
      </div>
    </Card>

    <Card title="Form Inputs & Search Controls" description="Monochrome input controls with focus ring & icon slots.">
      <div class="space-y-3">
        <Input bind:value={testInputValue} placeholder="e.g. 100.76.150.46 or user@host" />
        <Input placeholder="Search logs, sessions, commands...">
          {#snippet leadingIcon()}
            <Icon name="search" size={14} class="text-neutral-400" />
          {/snippet}
        </Input>
      </div>
    </Card>
  </div>

  <!-- 6. Notifications & Alerts -->
  <Card title="Alerts & Notification Banners" description="Inline notifications for system events and warnings.">
    <div class="space-y-3">
      <Alert variant="info" title="Zero-Knowledge Enclave Active">
        All session keys and SQLite telemetry are encrypted locally via Argon2id + AES-256-GCM.
      </Alert>
      <Alert variant="warning" title="SSH Host Connection High Latency">
        Remote host response time exceeded 280ms over current relay route.
      </Alert>
      <Alert variant="danger" title="Unauthorized Sudo Attempt Detected">
        Audit rule violation triggered in container <code>docker-prod-db</code>.
      </Alert>
    </div>
  </Card>

  <!-- 7. Data Grid & Telemetry Table -->
  <Card title="Data Grid & Telemetry Table" description="Sortable table with row hover, badges, and tabular numerics.">
    <Table columns={tableColumns} data={tableData}>
      {#snippet row(item: any)}
        <tr class="border-b border-[#272732] hover:bg-white/[0.02] transition-colors text-xs font-mono">
          <td class="px-4 py-3 text-white font-medium">{item.host}</td>
          <td class="px-4 py-3">
            {#if item.status === 'online'}
              <Badge variant="success">ONLINE</Badge>
            {:else if item.status === 'idle'}
              <Badge variant="neutral">IDLE</Badge>
            {:else}
              <Badge variant="danger">OFFLINE</Badge>
            {/if}
          </td>
          <td class="px-4 py-3 text-neutral-300 tabular-nums">{item.cpu}</td>
          <td class="px-4 py-3 text-neutral-300 tabular-nums">{item.memory}</td>
          <td class="px-4 py-3 text-neutral-400 tabular-nums">{item.uptime}</td>
        </tr>
      {/snippet}
    </Table>
  </Card>

  <!-- 8. Interactive Modal Trigger -->
  <Card title="Dialog / Modal / Overlays" description="Backdrop blur modal with frameless header.">
    <div class="flex items-center justify-between">
      <span class="text-xs text-neutral-400">Click to preview interactive dialog overlay:</span>
      <Button variant="secondary" onclick={() => (modalOpen = true)}>
        Open Modal Preview
      </Button>
    </div>
  </Card>

  <!-- 9. Full Screen Templates Showcase -->
  <div>
    <h2 class="text-sm font-mono uppercase text-neutral-400 font-bold tracking-wider mb-3">Full App Templates & AI Panels</h2>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="AI Copilot & Chat Panel" description="Floating AI assistant panel with model switcher.">
        <div class="h-96 rounded-xl border border-[#272732] overflow-hidden bg-[#0A0A0C]">
          <AiChatPanel />
        </div>
      </Card>
      
      <Card title="Zero-Knowledge Login / Lock Screen" description="Vault master password screen.">
        <div class="h-96 rounded-xl border border-[#272732] overflow-hidden bg-[#0A0A0C] flex items-center justify-center p-4">
          <LoginScreen />
        </div>
      </Card>
    </div>
  </div>

  <!-- Modal Preview -->
  <Modal bind:open={modalOpen} title="Node Diagnostics — Hostinger VPS">
    <div class="space-y-4 text-xs font-sans">
      <p class="text-neutral-300">Detailed system diagnostics for remote server running on Tailscale node.</p>
      <div class="bg-[#0A0A0C] p-3 rounded-lg border border-[#272732] font-mono text-[11px] space-y-1 text-neutral-400">
        <div>OS: Linux 6.19.10-300.fc44.x86_64</div>
        <div>Uptime: 42 days, 18 hours, 32 mins</div>
        <div>Active Containers: 14 Running (Podman Rootless)</div>
        <div>Memory Free: 4,612 MB / 8,192 MB</div>
      </div>
    </div>
    {#snippet footer()}
      <div class="flex justify-end gap-2">
        <Button variant="outline" size="sm" onclick={() => (modalOpen = false)}>Close</Button>
        <Button variant="brand" size="sm" onclick={() => (modalOpen = false)}>Export Report</Button>
      </div>
    {/snippet}
  </Modal>

</div>
