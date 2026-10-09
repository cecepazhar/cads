<script lang="ts">
  import {
    Button,
    Badge,
    Input,
    Textarea,
    Card,
    Table,
    Modal,
    Alert,
    Avatar,
    AvatarGroup,
    Tooltip,
    DropdownMenu,
    ContextMenu,
    Tabs,
    SegmentedControl,
    Switch,
    Checkbox,
    RadioGroup,
    Slider,
    RangeSlider,
    Drawer,
    Accordion,
    Collapsible,
    Popover,
    HoverCard,
    Kbd,
    Breadcrumb,
    ProgressBar,
    CircularProgress,
    Skeleton,
    Toast,
    toast,
    PinInput,
    Select,
    Combobox,
    TreeView,
    Separator,
    ColorPicker,
  } from '$lib/components/ui';

  // State playground
  let switchVal = $state(true);
  let checkVal = $state(true);
  let radioVal = $state('prod');
  let sliderVal = $state(45);
  let rangeMin = $state(15);
  let rangeMax = $state(85);
  let pinVal = $state('133742');
  let brandColor = $state('#06b6d4');
  let drawerOpen = $state(false);
  let modalOpen = $state(false);
  let segmentVal = $state('sftp');
  let selectVal = $state('claude-3-7');

  const fileTree = [
    {
      id: '1',
      name: 'src',
      isFolder: true,
      children: [
        { id: '2', name: 'lib', isFolder: true, children: [{ id: '3', name: 'index.ts' }] },
        { id: '4', name: 'routes', isFolder: true, children: [{ id: '5', name: '+page.svelte' }] },
      ],
    },
    { id: '6', name: 'package.json' },
    { id: '7', name: 'README.md' },
  ];
</script>

<Toast />

<div class="space-y-12">
  <div>
    <Badge variant="brand" size="xs">LIVING COMPONENT SHOWCASE</Badge>
    <h1 class="text-3xl font-extrabold text-white mt-2 tracking-tight">Interactive Component Catalog</h1>
    <p class="text-sm text-neutral-400 mt-2 leading-relaxed">
      Katalog lengkap 36+ komponen CADS v1.0. Setiap komponen dapat diuji interaksi langsung, state hover, active, bindable runes, dan responsivitasnya.
    </p>
  </div>

  <!-- 1. Buttons & Badges -->
  <section id="button" class="space-y-4">
    <h2 class="text-lg font-bold text-white border-b border-neutral-800 pb-2">1. Buttons & Badges</h2>
    <div class="rounded-xl border border-neutral-800 bg-[#121217] p-6 space-y-4">
      <div class="flex flex-wrap items-center gap-3">
        <Button variant="primary">Solid White Confirm</Button>
        <Button variant="brand">Brand Accent</Button>
        <Button variant="secondary">Secondary Zinc</Button>
        <Button variant="outline">Monoline Wireframe</Button>
        <Button variant="ghost">Ghost Button</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div class="flex flex-wrap items-center gap-2 pt-2">
        <Badge variant="neutral">Offline</Badge>
        <Badge variant="success">Connected</Badge>
        <Badge variant="warning">Syncing</Badge>
        <Badge variant="danger">Failed</Badge>
        <Badge variant="brand">Pro Edition</Badge>
      </div>
    </div>
  </section>

  <!-- 2. Inputs & Forms -->
  <section id="input" class="space-y-4">
    <h2 class="text-lg font-bold text-white border-b border-neutral-800 pb-2">2. Forms & Inputs</h2>
    <div class="rounded-xl border border-neutral-800 bg-[#121217] p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div><label class="text-xs font-medium text-neutral-300 block mb-1.5">SSH Host URL</label><Input placeholder="user@remote.host:22" /></div>
      <Select
        label="AI Dispatch Engine"
        bind:value={selectVal}
        options={[
          { value: 'claude-3-7', label: 'Claude 3.7 Sonnet (Reasoning)' },
          { value: 'gpt-4o', label: 'GPT-4o Omnichannel' },
          { value: 'deepseek-r1', label: 'DeepSeek R1 Local' },
        ]}
      />
      <Textarea label="Bash Startup Script" placeholder="#!/usr/bin/env bash
echo 'Server Initialized'" rows={3} />
      <div class="space-y-3" id="pininput">
        <label class="text-xs font-medium text-neutral-300">2FA / TOTP PinInput</label>
        <PinInput bind:value={pinVal} />
        <span class="text-[11px] font-mono text-neutral-500">Current Value: {pinVal}</span>
      </div>
    </div>
  </section>

  <!-- 3. Sliders & Controls -->
  <section id="slider" class="space-y-4">
    <h2 class="text-lg font-bold text-white border-b border-neutral-800 pb-2">3. Controls & Toggles</h2>
    <div class="rounded-xl border border-neutral-800 bg-[#121217] p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-4" id="switch">
        <Switch bind:checked={switchVal} label="Enable ZK-SNARK Terminal Encryption" description="Zero-knowledge cipher payload transfer" />
        <Checkbox bind:checked={checkVal} label="Remember Session Credentials" description="Store securely in system keyring" />
      </div>
      <div class="space-y-4">
        <RadioGroup
          bind:value={radioVal}
          options={[
            { value: 'prod', label: 'Production VPS Cluster', description: 'Port 22 SSH' },
            { value: 'stage', label: 'Staging Environment', description: 'Port 2222' },
          ]}
        />
        <div class="space-y-2">
          <span class="text-xs font-medium text-neutral-300">Terminal Font Size Slider ({sliderVal}px)</span>
          <Slider min={10} max={32} bind:value={sliderVal} />
        </div>
      </div>
    </div>
  </section>

  <!-- 4. Navigation & Tabs -->
  <section id="tabs" class="space-y-4">
    <h2 class="text-lg font-bold text-white border-b border-neutral-800 pb-2">4. Navigation & Tabs</h2>
    <div class="rounded-xl border border-neutral-800 bg-[#121217] p-6 space-y-6">
      <SegmentedControl
        bind:value={segmentVal}
        options={[
          { value: 'terminal', label: 'Terminal SSH' },
          { value: 'sftp', label: 'SFTP Explorer' },
          { value: 'monitoring', label: 'Node Health' },
          { value: 'audit', label: 'Audit Trail' },
        ]}
      />
      <Breadcrumb items={[{ label: 'Clusters', href: '#' }, { label: 'Asia-Pacific', href: '#' }, { label: 'Hostinger VPS' }]} />
    </div>
  </section>

  <!-- 5. Overlays, Modals, & Drawers -->
  <section id="overlays" class="space-y-4">
    <h2 class="text-lg font-bold text-white border-b border-neutral-800 pb-2">5. Overlays, Modals, & Drawers</h2>
    <div class="rounded-xl border border-neutral-800 bg-[#121217] p-6 flex flex-wrap items-center gap-4">
      <Button variant="outline" onclick={() => (drawerOpen = true)}>Open Slideout Drawer</Button>
      <Button variant="outline" onclick={() => (modalOpen = true)}>Open Dialog Modal</Button>
      <Button variant="brand" onclick={() => toast.success('SSH Session Established', 'Hostinger node online at 100.76.150.46')}>
        Trigger Toast Notification
      </Button>

      <Tooltip content="Wireframe HUD Mode">
        <Button variant="secondary">Hover for Tooltip</Button>
      </Tooltip>
    </div>
  </section>

  <!-- 6. Data Display & Trees -->
  <section id="treeview" class="space-y-4">
    <h2 class="text-lg font-bold text-white border-b border-neutral-800 pb-2">6. TreeView, Progress, & Avatars</h2>
    <div class="rounded-xl border border-neutral-800 bg-[#121217] p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 class="text-xs font-semibold text-neutral-300 mb-2">Remote SFTP TreeView</h4>
        <div class="rounded-lg border border-neutral-800 bg-neutral-950 p-3">
          <TreeView nodes={fileTree} />
        </div>
      </div>
      <div class="space-y-4">
        <div>
          <h4 class="text-xs font-semibold text-neutral-300 mb-2">Avatars with Pro Halo</h4>
          <div class="flex items-center gap-4">
            <Avatar fallback="CA" halo="pro" size="lg" />
            <Avatar fallback="FH" halo="brand" size="md" />
            <AvatarGroup>
              <Avatar fallback="X1" size="sm" />
              <Avatar fallback="X2" size="sm" />
              <Avatar fallback="Y1" size="sm" />
            </AvatarGroup>
          </div>
        </div>
        <div>
          <h4 class="text-xs font-semibold text-neutral-300 mb-2">Progress & Circular Indicators</h4>
          <ProgressBar value={72} showLabel={true} />
          <div class="mt-3 flex items-center gap-4">
            <CircularProgress value={84} />
            <div class="space-y-1 flex-1">
              <Skeleton class="h-4 w-3/4" />
              <Skeleton class="h-3 w-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Drawer & Modal Mounts -->
  <Drawer bind:open={drawerOpen} title="Node Diagnostics Sheet" position="right">
    <div class="space-y-4 text-xs text-neutral-300">
      <p>Host: Hostinger VPS (100.76.150.46)</p>
      <p>Kernel: Linux 6.19.10-300.fc44.x86_64</p>
      <p>Uptime: 42 days 18 hours</p>
      <Button variant="danger" onclick={() => (drawerOpen = false)} class="w-full mt-4">Close Drawer</Button>
    </div>
  </Drawer>

  <Modal bind:open={modalOpen} title="Reboot Cluster Confirmation" size="sm">
    <p class="text-xs text-neutral-400">Tindakan ini akan me-restart remote daemon pada 3 host aktif secara bergantian.</p>
    {#snippet footer()}
      <Button variant="secondary" onclick={() => (modalOpen = false)}>Cancel</Button>
      <Button variant="danger" onclick={() => (modalOpen = false)}>Reboot Cluster</Button>
    {/snippet}
  </Modal>
</div>
