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
    TelemetryCard,
    CommandPalette
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
  let cmdOpen = $state(false);
  let segmentVal = $state('sftp');
  let selectVal = $state('claude-3-7');
  let comboVal = $state('');
  
  let ctxOpen = $state(false);
  let ctxX = $state(0);
  let ctxY = $state(0);

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
  
  const tableCols = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'host', label: 'Host', sortable: true },
    { key: 'status', label: 'Status' }
  ];
  const tableData = [
    { id: 'N-01', host: '192.168.1.10', status: 'Online' },
    { id: 'N-02', host: '192.168.1.15', status: 'Offline' }
  ];
</script>

<Toast />

<div class="space-y-12">
  <div>
    <Badge variant="brand" size="xs">LIVING COMPONENT SHOWCASE</Badge>
    <h1 class="text-3xl font-extrabold text-white mt-2 tracking-tight">Interactive Component Catalog</h1>
    <p class="text-sm text-neutral-400 mt-2 leading-relaxed">
      Katalog lengkap 36+ komponen CAUI v1.0. Setiap komponen dapat diuji interaksi langsung, state hover, active, bindable runes, dan responsivitasnya.
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
    <h2 class="text-lg font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2">6. TreeView, Progress, & Loaders</h2>
    <div class="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#121217] p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 class="text-xs font-semibold text-neutral-500 dark:text-neutral-300 mb-2">Remote SFTP TreeView</h4>
        <div class="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-3">
          <TreeView nodes={fileTree} />
        </div>
      </div>
      <div class="space-y-6">
        <div>
          <h4 class="text-xs font-semibold text-neutral-500 dark:text-neutral-300 mb-2">Linear Progress (ProgressBar)</h4>
          <ProgressBar value={72} showLabel={true} />
        </div>
        <div>
          <h4 class="text-xs font-semibold text-neutral-500 dark:text-neutral-300 mb-2">Circular Progress & Skeleton</h4>
          <div class="mt-3 flex items-center gap-4">
            <CircularProgress value={84} />
            <div class="space-y-2 flex-1">
              <Skeleton class="h-4 w-3/4 rounded" />
              <Skeleton class="h-3 w-1/2 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 6.5. Avatars -->
  <section id="avatar" class="space-y-4">
    <h2 class="text-lg font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2">6.5. Avatars & AvatarGroup</h2>
    <div class="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#121217] p-6 space-y-6">
      <div>
        <h4 class="text-xs font-semibold text-neutral-500 dark:text-neutral-300 mb-4">Avatar Sizes</h4>
        <div class="flex items-end gap-6">
          <Avatar fallback="XS" size="xs" />
          <Avatar fallback="SM" size="sm" />
          <Avatar fallback="MD" size="md" />
          <Avatar fallback="LG" size="lg" />
          <Avatar fallback="XL" size="xl" />
        </div>
      </div>
      <div>
        <h4 class="text-xs font-semibold text-neutral-500 dark:text-neutral-300 mb-4">Halo Effects (Pro / Brand) & Groups</h4>
        <div class="flex items-center gap-8">
          <Avatar fallback="CA" halo="pro" size="lg" />
          <Avatar fallback="FH" halo="brand" size="md" />
          <AvatarGroup>
            <Avatar fallback="X1" size="sm" />
            <Avatar fallback="X2" size="sm" />
            <Avatar fallback="Y1" size="sm" />
            <Avatar fallback="Z9" size="sm" />
          </AvatarGroup>
        </div>
      </div>
    </div>
  </section>

  <!-- 7. Advanced Forms & Selection -->
  <section id="advanced-forms" class="space-y-4">
    <h2 class="text-lg font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2">7. Pickers, Combobox, & Advanced Input</h2>
    <div class="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#121217] p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-4" id="combobox">
        <h4 class="text-xs font-semibold text-neutral-500 dark:text-neutral-300">Combobox (Autocomplete)</h4>
        <Combobox 
          bind:value={comboVal} 
          options={[
            { value: 'us-east-1', label: 'US East (N. Virginia)' },
            { value: 'ap-southeast-1', label: 'AP Southeast (Singapore)' },
            { value: 'eu-central-1', label: 'EU Central (Frankfurt)' },
          ]} 
          placeholder="Select AWS Region..." 
        />
        <div class="pt-4">
          <h4 class="text-xs font-semibold text-neutral-500 dark:text-neutral-300 mb-2" id="colorpicker">Color Picker</h4>
          <ColorPicker bind:value={brandColor} label="Theme Accent" />
        </div>
      </div>
      <div class="space-y-4" id="rangeslider">
        <h4 class="text-xs font-semibold text-neutral-500 dark:text-neutral-300">Range Slider (CPU Allocation)</h4>
        <div class="flex justify-between text-[11px] font-mono text-neutral-500">
          <span>Min: {rangeMin} cores</span>
          <span>Max: {rangeMax} cores</span>
        </div>
        <RangeSlider bind:minVal={rangeMin} bind:maxVal={rangeMax} min={0} max={128} />
        
        <div class="pt-4" id="kbd">
          <h4 class="text-xs font-semibold text-neutral-500 dark:text-neutral-300 mb-2">Keyboard Shortcuts (Kbd)</h4>
          <div class="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            Press <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd> to open command palette.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 8. Interactive Modifiers -->
  <section id="interactive-modifiers" class="space-y-4">
    <h2 class="text-lg font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2">8. Accordion, Collapsible, & Tabs</h2>
    <div class="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#121217] p-6 space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div id="accordion">
          <h4 class="text-xs font-semibold text-neutral-500 dark:text-neutral-300 mb-2">Accordion (FAQ / Settings)</h4>
          <Accordion items={[
            { id: '1', title: 'Network Security', content: 'Configure UFW and iptables routing rules.' },
            { id: '2', title: 'Data Retention', content: 'Set cron jobs for automated postgres pg_dump archiving.' }
          ]} />
        </div>
        <div id="collapsible">
          <h4 class="text-xs font-semibold text-neutral-500 dark:text-neutral-300 mb-2">Collapsible (Log View)</h4>
          <Collapsible title="View Build Trace (stderr)">
            <pre class="text-[10px] p-2 bg-neutral-200 dark:bg-black rounded font-mono text-red-600 dark:text-red-400">Error: TS2304: Cannot find name 'React'.</pre>
          </Collapsible>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h4 class="text-xs font-semibold text-neutral-500 dark:text-neutral-300 mb-2">Data Tabs</h4>
        <Tabs items={[
          { id: 'tab1', label: 'Raw JSON' },
          { id: 'tab2', label: 'Headers' },
        ]} variant="pills">
          <div class="p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono">
            &#123; "status": 200, "latency": 45 &#125;
          </div>
        </Tabs>
      </div>
    </div>
  </section>

  <!-- 9. Advanced Popups & Menus -->
  <section id="menus" class="space-y-4">
    <h2 class="text-lg font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2">9. Context Menus, Dropdowns & Popovers</h2>
    <div class="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#121217] p-6">
      <!-- We need a context menu wrapper area -->
      <!-- Since ContextMenu is absolute to mouse coords, we trigger it via right click -->
      <!-- We also add HoverCard and Popover -->
      <div 
        class="w-full h-32 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg flex items-center justify-center text-xs text-neutral-500 select-none"
        oncontextmenu={(e) => { e.preventDefault(); ctxX = e.clientX; ctxY = e.clientY; ctxOpen = true; }}
      >
        Right-click here to test ContextMenu
      </div>
      
      <ContextMenu 
        bind:open={ctxOpen} 
        bind:x={ctxX} 
        bind:y={ctxY} 
        items={[
          { label: 'Copy Host IP', action: () => {} },
          { label: 'Restart Daemon', action: () => {} },
          { label: 'Delete Instance', danger: true, action: () => {} }
        ]} 
      />

      <div class="flex items-center gap-4 mt-6">
        <DropdownMenu items={[
          { label: 'Profile Settings', action: () => {} },
          { label: 'Billing', action: () => {} },
          { label: 'Log Out', danger: true, action: () => {} }
        ]}>
          {#snippet trigger()}
            <Button variant="outline">User Menu (Dropdown)</Button>
          {/snippet}
        </DropdownMenu>

        <Popover>
          {#snippet trigger()}
            <Button variant="secondary">Open Popover</Button>
          {/snippet}
          <div class="p-3 text-xs w-48">
            <h4 class="font-bold mb-1">Quick Config</h4>
            <p class="text-neutral-400 mb-2">Adjust memory limits</p>
            <Slider min={256} max={4096} value={1024} />
          </div>
        </Popover>
        
        <HoverCard>
          {#snippet trigger()}
            <span class="text-sm font-medium text-[var(--ca-brand)] underline cursor-help">@cecepazhar</span>
          {/snippet}
          <div class="flex gap-3 items-center">
            <Avatar fallback="CA" size="md" />
            <div>
              <div class="font-bold text-xs">Cecep Saeful Azhar</div>
              <div class="text-[10px] text-neutral-400">Architect & Engineer</div>
            </div>
          </div>
        </HoverCard>
      </div>
    </div>
  </section>

  <!-- 10. Data Display & Dashboards -->
  <section id="card" class="space-y-4">
    <h2 class="text-lg font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2">10. Data Display (Tables, Cards, Alerts)</h2>
    <div class="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#121217] p-6 space-y-6">
      
      <Alert variant="warning" title="Memory usage high" dismissible>
        Node N-01 is exceeding 90% memory capacity. Please provision more RAM or kill idle processes.
      </Alert>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TelemetryCard title="Active Requests" value="1,204" trend="+14.2%" status="normal" percentage={65} />
        <TelemetryCard title="Error Rate" value="4.2%" trend="+1.1%" status="warning" percentage={20} />
      </div>

      <Card title="Node Fleet Overview" description="Live status of all connected cluster nodes.">
        {#snippet headerAction()}
          <Button size="sm" variant="outline">Refresh</Button>
        {/snippet}
        
        <Table columns={tableCols} data={tableData} striped compact class="mt-2">
          {#snippet cell({ column, value })}
            {#if column.key === 'status'}
              <Badge variant={value === 'Online' ? 'success' : 'danger'} size="xs">{value}</Badge>
            {:else}
              {value}
            {/if}
          {/snippet}
        </Table>
      </Card>
      
      <div class="flex items-center gap-4">
        <Button variant="brand" onclick={() => (cmdOpen = true)}>Open Command Palette (Ctrl+K)</Button>
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
  
  <CommandPalette bind:open={cmdOpen} items={[
    { id: 'new-session', title: 'New SSH Session', category: 'Session', shortcut: 'Ctrl+N', action: () => toast.success('New session created') },
    { id: 'toggle-theme', title: 'Toggle Dark/Light Theme', category: 'Theme', shortcut: 'Ctrl+T', action: () => {} },
    { id: 'open-sftp', title: 'Open SFTP Explorer', category: 'Tools', shortcut: 'Ctrl+E', action: () => {} },
  ]} />
</div>
