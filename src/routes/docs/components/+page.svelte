<script lang="ts">
  import {
    Button, Badge, Alert, Card, Input, Textarea, Select, Combobox,
    PinInput, Checkbox, RadioGroup, Switch, Slider, RangeSlider,
    ProgressBar, CircularProgress, Avatar, AvatarGroup, Skeleton,
    Toast, toast, Table, Kbd, SegmentedControl, Tabs, Accordion,
    Collapsible, Popover, HoverCard, DropdownMenu, ContextMenu,
    CommandPalette, Breadcrumb, TreeView, ColorPicker, FramelessHeader,
    Sidebar, SidebarItem, TelemetryCard, LanguageSwitcher, ThemeSwitcher,
    Modal, Drawer, Icon, Separator, SplitPane, Tooltip,
    Calendar, Carousel, DatePicker, DateRangePicker, DateTimePicker,
    FileUpload, MentionInput, NumberInput, Resizable, Stepper
  } from '$lib';

  /* ── Sandbox state ───────────────────────────────────────── */
  let sandboxVariant = $state<'primary' | 'secondary' | 'outline' | 'ghost' | 'brand' | 'neutral' | 'info' | 'success' | 'warning' | 'danger'>('primary');
  let sandboxSize = $state<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon'>('md');
  let sandboxDisabled = $state(false);
  let sandboxLoading = $state(false);

  const allVariants = ['primary', 'secondary', 'outline', 'ghost', 'brand', 'neutral', 'info', 'success', 'warning', 'danger'] as const;
  const allSizes = ['xs', 'sm', 'md', 'lg', 'xl', 'icon'] as const;
  // AllVariant/AllSize defined in types.ts

  const buttonVariants = ['primary', 'secondary', 'outline', 'ghost', 'brand', 'info', 'success', 'warning', 'danger'] as const;
  const badgeVariants = ['neutral', 'primary', 'secondary', 'outline', 'ghost', 'brand', 'info', 'success', 'warning', 'danger'] as const;
  const alertVariants = ['info', 'success', 'warning', 'danger'] as const;

  /* ── Component-specific state ────────────────────────────── */
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
  let numberVal = $state(5);
  let dateVal = $state('');
  let dateTimeVal = $state('');
  let rangeStart = $state('');
  let rangeEnd = $state('');
  let stepperCurrent = $state('step-1');
  let stepperSteps = [
    { id: 'step-1', label: 'Configure', description: 'Set parameters' },
    { id: 'step-2', label: 'Review', description: 'Verify settings' },
    { id: 'step-3', label: 'Deploy', description: 'Launch instance' }
  ];
  let mentionVal = $state('');



  const fileTree = [
    {
      id: '1', name: 'src', isFolder: true,
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

  const comboOptions = [
    { value: 'gpt-4o', label: 'GPT-4o' },
    { value: 'claude-3-7', label: 'Claude 3.7 Sonnet' },
    { value: 'gemini-2', label: 'Gemini 2.0 Flash' }
  ];

  const mentionItems = [
    { id: 'u1', label: 'Alice' },
    { id: 'u2', label: 'Bob' },
    { id: 'u3', label: 'Charlie' }
  ];

  const carouselItems = ['Slide 1 — Dashboard Overview', 'Slide 2 — Cluster Metrics', 'Slide 3 — Node Diagnostics'];

  const iconNames = ['terminal', 'server', 'cpu', 'shield', 'sparkles', 'settings', 'code', 'folder', 'file', 'search', 'check', 'x', 'refresh', 'user', 'globe', 'moon', 'sun', 'palette', 'zap', 'database', 'info', 'alert', 'lock', 'copy', 'logout', 'calendar', 'upload', 'download', 'plus', 'minus', 'trash', 'edit', 'filter', 'loader'] as const;

  const sectionCard = 'rounded-xl border border-[var(--ca-border)] bg-[var(--ca-surface-elevated)] p-6 space-y-4';
  const sectionTitle = 'text-lg font-bold text-[var(--ca-text-primary)] border-b border-[var(--ca-border)] pb-2';
  const subsectionTitle = 'text-xs font-semibold text-[var(--ca-text-secondary)] mb-2';
</script>

<Toast />

<div class="space-y-16 pb-24">

  <!-- ═══════════════════ HEADER ═══════════════════ -->
  <header class="space-y-3">
    <div class="flex items-center gap-3">
      <Badge variant="brand" size="xs">CAUI v1.1.0</Badge>
      <Badge variant="success" size="xs">WCAG 2.2 AA</Badge>
      <Badge variant="info" size="xs">WAI-ARIA 1.2</Badge>
    </div>
    <h1 class="text-3xl font-extrabold text-[var(--ca-text-primary)] tracking-tight">Component Catalog</h1>
    <p class="text-sm text-[var(--ca-text-muted)] leading-relaxed max-w-2xl">
      56 components — WCAG 2.2 AA / WAI-ARIA 1.2 compliant. Every component uses
      <code class="text-[var(--ca-brand)]">var(--ca-*)</code> tokens with zero hex literals.
    </p>
  </header>

  <!-- ═══════════════════ ACCESSIBILITY SCORE ═══════════════════ -->
  <section class="space-y-4">
    <h2 class={sectionTitle}>Accessibility Score</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      {#each [
        { label: 'Components', value: '56', color: '--ca-brand' },
        { label: 'With ARIA', value: '56', color: '--ca-success' },
        { label: 'Hex Literals', value: '0', color: '--ca-warning' },
        { label: 'Test Files', value: '20', color: '--ca-info' }
      ] as stat (stat.label)}
        <div class="rounded-xl border border-[var(--ca-border)] bg-[var(--ca-surface-elevated)] p-5 text-center space-y-1">
          <div class="text-3xl font-extrabold" style="color: var({stat.color})">{stat.value}</div>
          <div class="text-xs text-[var(--ca-text-muted)]">{stat.label}</div>
        </div>
      {/each}
    </div>
  </section>

  <!-- ═══════════════════ INTERACTIVE SANDBOX ═══════════════════ -->
  <section class="space-y-4">
    <h2 class={sectionTitle}>Interactive Sandbox</h2>
    <div class={sectionCard}>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label for="sandbox-variant" class={subsectionTitle}>Variant</label>
          <Select
            bind:value={sandboxVariant}
            options={allVariants.map(v => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) }))}
            id="sandbox-variant"
          />
        </div>
        <div>
          <label for="sandbox-size" class={subsectionTitle}>Size</label>
          <Select
            bind:value={sandboxSize}
            options={allSizes.map(s => ({ value: s, label: s.toUpperCase() }))}
            id="sandbox-size"
          />
        </div>
        <div class="flex items-end gap-6">
          <Switch bind:checked={sandboxDisabled} label="Disabled" />
        </div>
        <div class="flex items-end gap-6">
          <Switch bind:checked={sandboxLoading} label="Loading" />
        </div>
      </div>

      <Separator />

      <div class="flex flex-wrap items-center gap-3">
        <Button variant={sandboxVariant as any} size={sandboxSize as any} disabled={sandboxDisabled} loading={sandboxLoading}>
          Sandbox Button
        </Button>
        <Badge variant={sandboxVariant as any} size={sandboxSize === 'icon' || sandboxSize === 'xl' || sandboxSize === 'lg' ? 'md' : sandboxSize as any}>
          Badge
        </Badge>
        <Input placeholder="Sandbox input..." />
        <Avatar fallback="SB" size={sandboxSize === 'icon' ? 'md' : sandboxSize as any} />
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 1. BUTTON ═══════════════════ -->
  <section class="space-y-4" id="button">
    <h2 class={sectionTitle}>Button</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (10 values), size (sm/md/lg/icon), loading, disabled</p>
    <div class={sectionCard}>
      <div class="flex flex-wrap items-center gap-3">
        {#each buttonVariants as v (v)}
          <Button variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Button>
        {/each}
      </div>
      <div class="flex flex-wrap items-center gap-2">
        {#each ['sm', 'md', 'lg'] as s (s)}
          <Button size={s as any}>{s.toUpperCase()}</Button>
        {/each}
        <Button size="icon" aria-label="Icon button"><Icon name="settings" /></Button>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
        <Button variant="brand" loading>Brand Loading</Button>
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 2. BADGE ═══════════════════ -->
  <section class="space-y-4" id="badge">
    <h2 class={sectionTitle}>Badge</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (10 + neutral), size (xs/sm/md)</p>
    <div class={sectionCard}>
      <div class="flex flex-wrap items-center gap-2">
        {#each badgeVariants as v (v)}
          <Badge variant={v}>{v}</Badge>
        {/each}
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <Badge variant="brand" size="xs">XS</Badge>
        <Badge variant="brand" size="sm">SM</Badge>
        <Badge variant="brand" size="md">MD</Badge>
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 3. ALERT ═══════════════════ -->
  <section class="space-y-4" id="alert">
    <h2 class={sectionTitle}>Alert</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (neutral/info/success/warning/danger), title, dismissible</p>
    <div class={sectionCard}>
      {#each alertVariants as v (v)}
        <Alert variant={v} title="{v.charAt(0).toUpperCase() + v.slice(1)} alert message" dismissible>
          This is a {v} level alert with dismissible support.
        </Alert>
      {/each}
    </div>
  </section>

  <!-- ═══════════════════ 4. CARD ═══════════════════ -->
  <section class="space-y-4" id="card">
    <h2 class={sectionTitle}>Card</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/secondary/outline/ghost), size (sm/md/lg), title, description</p>
    <div class={sectionCard}>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Node Fleet Overview" description="Live status of all connected cluster nodes.">
          {#snippet headerAction()}
            <Button size="sm" variant="outline">Refresh</Button>
          {/snippet}
          <p class="text-xs text-[var(--ca-text-muted)]">Card body content goes here.</p>
        </Card>
        <Card title="Minimal Card" description="Simple card without header action.">
          <p class="text-xs text-[var(--ca-text-muted)]">Default variant card.</p>
        </Card>
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 5. INPUT ═══════════════════ -->
  <section class="space-y-4" id="input">
    <h2 class={sectionTitle}>Input</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline/ghost), size (sm/md/lg), placeholder, disabled</p>
    <div class={sectionCard}>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="text-xs font-medium text-[var(--ca-text-secondary)] block mb-1.5">Default</label>
          <Input placeholder="user@remote.host:22" />
        </div>
        <div>
          <label class="text-xs font-medium text-[var(--ca-text-secondary)] block mb-1.5">Disabled</label>
          <Input placeholder="Disabled input" disabled />
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 6. TEXTAREA ═══════════════════ -->
  <section class="space-y-4" id="textarea">
    <h2 class={sectionTitle}>Textarea</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline/ghost), size (sm/md/lg), label, placeholder</p>
    <div class={sectionCard}>
      <Textarea label="Bash Startup Script" placeholder="#!/usr/bin/env bash&#10;echo 'Hello, CAUI'" />
    </div>
  </section>

  <!-- ═══════════════════ 7. SELECT ═══════════════════ -->
  <section class="space-y-4" id="select">
    <h2 class={sectionTitle}>Select</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline/ghost), size (sm/md/lg), options</p>
    <div class={sectionCard}>
      <Select
        bind:value={selectVal}
        options={[
          { value: 'gpt-4o', label: 'GPT-4o' },
          { value: 'claude-3-7', label: 'Claude 3.7 Sonnet' },
          { value: 'gemini-2', label: 'Gemini 2.0 Flash' }
        ]}
      />
    </div>
  </section>

  <!-- ═══════════════════ 8. COMBOBOX ═══════════════════ -->
  <section class="space-y-4" id="combobox">
    <h2 class={sectionTitle}>Combobox</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline/ghost), size (sm/md/lg), options, placeholder</p>
    <div class={sectionCard}>
      <Combobox
        bind:value={comboVal}
        options={comboOptions}
        placeholder="Search models..."
      />
    </div>
  </section>

  <!-- ═══════════════════ 9. PIN INPUT ═══════════════════ -->
  <section class="space-y-4" id="pininput">
    <h2 class={sectionTitle}>PinInput</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline/ghost), size (sm/md/lg), value (bindable)</p>
    <div class={sectionCard}>
      <div class="space-y-2">
        <label class="text-xs font-medium text-[var(--ca-text-secondary)]">Enter PIN</label>
        <PinInput bind:value={pinVal} />
        <span class="text-[11px] font-mono text-[var(--ca-text-muted)]">Value: {pinVal}</span>
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 10. CHECKBOX ═══════════════════ -->
  <section class="space-y-4" id="checkbox">
    <h2 class={sectionTitle}>Checkbox</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/brand), size (sm/md/lg), label, description</p>
    <div class={sectionCard}>
      <Checkbox bind:checked={checkVal} label="Remember Session Credentials" description="Store securely in system keyring" />
    </div>
  </section>

  <!-- ═══════════════════ 11. RADIO GROUP ═══════════════════ -->
  <section class="space-y-4" id="radiogroup">
    <h2 class={sectionTitle}>RadioGroup</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/brand), size (sm/md/lg), options</p>
    <div class={sectionCard}>
      <RadioGroup
        bind:value={radioVal}
        options={[
          { value: 'prod', label: 'Production', description: 'Live environment' },
          { value: 'staging', label: 'Staging', description: 'Pre-production' }
        ]}
      />
    </div>
  </section>

  <!-- ═══════════════════ 12. SWITCH ═══════════════════ -->
  <section class="space-y-4" id="switch">
    <h2 class={sectionTitle}>Switch</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/brand), size (sm/md/lg), label, description</p>
    <div class={sectionCard}>
      <Switch bind:checked={switchVal} label="Enable Encryption" description="Zero-knowledge cipher payload transfer" />
    </div>
  </section>

  <!-- ═══════════════════ 13. SLIDER ═══════════════════ -->
  <section class="space-y-4" id="slider">
    <h2 class={sectionTitle}>Slider</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/brand), size (sm/md/lg), min, max, value</p>
    <div class={sectionCard}>
      <div class="space-y-2">
        <span class="text-xs font-medium text-[var(--ca-text-secondary)]">Value: {sliderVal}</span>
        <Slider min={10} max={32} bind:value={sliderVal} />
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 14. RANGE SLIDER ═══════════════════ -->
  <section class="space-y-4" id="rangeslider">
    <h2 class={sectionTitle}>RangeSlider</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/brand), size (sm/md/lg), min, max, minVal, maxVal</p>
    <div class={sectionCard}>
      <div class="flex justify-between text-[11px] font-mono text-[var(--ca-text-muted)]">
        <span>Min: {rangeMin}</span>
        <span>Max: {rangeMax}</span>
      </div>
      <RangeSlider bind:minVal={rangeMin} bind:maxVal={rangeMax} min={0} max={128} />
    </div>
  </section>

  <!-- ═══════════════════ 15. PROGRESS BAR ═══════════════════ -->
  <section class="space-y-4" id="progressbar">
    <h2 class={sectionTitle}>ProgressBar</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (full, default brand), size (sm/md/lg), value, showLabel</p>
    <div class={sectionCard}>
      <ProgressBar value={72} showLabel={true} />
      <ProgressBar value={45} variant="success" showLabel={true} />
    </div>
  </section>

  <!-- ═══════════════════ 16. CIRCULAR PROGRESS ═══════════════════ -->
  <section class="space-y-4" id="circularprogress">
    <h2 class={sectionTitle}>CircularProgress</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (full, default brand), size (number), value</p>
    <div class={sectionCard}>
      <div class="flex items-center gap-8">
        <CircularProgress value={84} />
        <CircularProgress value={42} size={64} />
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 17. AVATAR ═══════════════════ -->
  <section class="space-y-4" id="avatar">
    <h2 class={sectionTitle}>Avatar</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/brand), size (xs/sm/md/lg/xl), fallback, halo</p>
    <div class={sectionCard}>
      <div class="flex items-end gap-6">
        <Avatar fallback="XS" size="xs" />
        <Avatar fallback="SM" size="sm" />
        <Avatar fallback="MD" size="md" />
        <Avatar fallback="LG" size="lg" />
        <Avatar fallback="XL" size="xl" />
      </div>
      <div class="flex items-center gap-4">
        <Avatar fallback="CA" halo="pro" size="lg" />
        <Avatar fallback="BR" halo="brand" size="md" />
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 18. AVATAR GROUP ═══════════════════ -->
  <section class="space-y-4" id="avatargroup">
    <h2 class={sectionTitle}>AvatarGroup</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/brand), size (xs/sm/md/lg/xl)</p>
    <div class={sectionCard}>
      <AvatarGroup>
        <Avatar fallback="X1" size="sm" />
        <Avatar fallback="X2" size="sm" />
        <Avatar fallback="Y1" size="sm" />
        <Avatar fallback="Z9" size="sm" />
      </AvatarGroup>
    </div>
  </section>

  <!-- ═══════════════════ 19. SKELETON ═══════════════════ -->
  <section class="space-y-4" id="skeleton">
    <h2 class={sectionTitle}>Skeleton</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (text/circular/rectangular), size (sm/md/lg)</p>
    <div class={sectionCard}>
      <div class="space-y-3">
        <Skeleton class="h-4 w-3/4 rounded" />
        <Skeleton class="h-3 w-1/2 rounded" />
        <div class="flex items-center gap-3">
          <Skeleton class="h-10 w-10 rounded-full" />
          <Skeleton class="h-3 w-1/3 rounded" />
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 20. TOAST ═══════════════════ -->
  <section class="space-y-4" id="toast">
    <h2 class={sectionTitle}>Toast</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (neutral/info/success/warning/danger), size (sm/md)</p>
    <div class={sectionCard}>
      <div class="flex flex-wrap items-center gap-3">
        <Button variant="outline" onclick={() => toast.info('Session Active', 'SSH tunnel established on port 22')}>Info Toast</Button>
        <Button variant="outline" onclick={() => toast.success('Deployed', 'v2.4.1 rolled out to all nodes')}>Success Toast</Button>
        <Button variant="outline" onclick={() => toast.warning('Memory High', 'Node N-03 at 92% capacity')}>Warning Toast</Button>
        <Button variant="outline" onclick={() => toast.error('Connection Lost', 'Timeout on 100.76.150.46')}>Error Toast</Button>
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 21. TABLE ═══════════════════ -->
  <section class="space-y-4" id="table">
    <h2 class={sectionTitle}>Table</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline), size (sm/md/lg), columns, data, striped, compact</p>
    <div class={sectionCard}>
      <Table columns={tableCols} data={tableData} striped compact>
        {#snippet cell({ column, value })}
          {#if column.key === 'status'}
            <Badge variant={value === 'Online' ? 'success' : 'danger'} size="xs">{value}</Badge>
          {:else}
            {value}
          {/if}
        {/snippet}
      </Table>
    </div>
  </section>

  <!-- ═══════════════════ 22. KBD ═══════════════════ -->
  <section class="space-y-4" id="kbd">
    <h2 class={sectionTitle}>Kbd</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: size (sm/md/lg)</p>
    <div class={sectionCard}>
      <div class="flex items-center gap-2 text-xs text-[var(--ca-text-muted)]">
        <Kbd size="sm">Ctrl</Kbd>
        <Kbd size="sm">Shift</Kbd>
        <Kbd size="sm">P</Kbd>
        <span class="ml-2">— Command Palette</span>
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 23. SEGMENTED CONTROL ═══════════════════ -->
  <section class="space-y-4" id="segmentedcontrol">
    <h2 class={sectionTitle}>SegmentedControl</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline/ghost), size (sm/md/lg)</p>
    <div class={sectionCard}>
      <SegmentedControl
        bind:value={segmentVal}
        options={[
          { value: 'ssh', label: 'SSH' },
          { value: 'sftp', label: 'SFTP' },
          { value: 'rdp', label: 'RDP' },
          { value: 'vnc', label: 'VNC' }
        ]}
      />
    </div>
  </section>

  <!-- ═══════════════════ 24. TABS ═══════════════════ -->
  <section class="space-y-4" id="tabs">
    <h2 class={sectionTitle}>Tabs</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (underline/pills/segmented), size (sm/md/lg), items</p>
    <div class={sectionCard}>
      <Tabs items={[
        { id: 'general', label: 'General' },
        { id: 'security', label: 'Security' },
        { id: 'network', label: 'Network' }
      ]}>
        <div class="p-3 bg-[var(--ca-surface)] border border-[var(--ca-border)] rounded-lg text-xs font-mono text-[var(--ca-text-secondary)]">
          Tab panel content — select a tab above to view different settings.
        </div>
      </Tabs>
    </div>
  </section>

  <!-- ═══════════════════ 25. ACCORDION ═══════════════════ -->
  <section class="space-y-4" id="accordion">
    <h2 class={sectionTitle}>Accordion</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline/ghost), size (sm/md/lg), items</p>
    <div class={sectionCard}>
      <Accordion items={[
        { id: 'acc-1', title: 'What is CAUI?', content: 'CAUI is the official design system powering all CA ecosystem applications with WCAG 2.2 AA compliance.' },
        { id: 'acc-2', title: 'Which frameworks are supported?', content: 'CAUI targets Svelte 5 with runes. React and Vue adapters are planned for v2.' }
      ]} />
    </div>
  </section>

  <!-- ═══════════════════ 26. COLLAPSIBLE ═══════════════════ -->
  <section class="space-y-4" id="collapsible">
    <h2 class={sectionTitle}>Collapsible</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline/ghost), size (sm/md/lg), title</p>
    <div class={sectionCard}>
      <Collapsible title="View Build Trace (stderr)">
        <pre class="text-[10px] p-2 bg-[var(--ca-surface)] rounded font-mono text-[var(--ca-danger)]">error[E0308]: mismatched types
  --> src/main.rs:42:5
   |
42 |     return "hello";
   |     ^^^^^^^^^^^^^^ expected `i32`, found `&str`</pre>
      </Collapsible>
    </div>
  </section>

  <!-- ═══════════════════ 27. POPOVER ═══════════════════ -->
  <section class="space-y-4" id="popover">
    <h2 class={sectionTitle}>Popover</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline), size (sm/md/lg)</p>
    <div class={sectionCard}>
      <Popover>
        {#snippet trigger()}
          <Button variant="secondary">Open Popover</Button>
        {/snippet}
        <div class="p-3 text-xs w-48">
          <h4 class="font-bold text-[var(--ca-text-primary)] mb-1">Popover Content</h4>
          <p class="text-[var(--ca-text-muted)] mb-2">Non-modal dialog with click-outside dismiss.</p>
          <Slider min={256} max={4096} value={1024} />
        </div>
      </Popover>
    </div>
  </section>

  <!-- ═══════════════════ 28. HOVER CARD ═══════════════════ -->
  <section class="space-y-4" id="hovercard">
    <h2 class={sectionTitle}>HoverCard</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline), size (sm/md/lg)</p>
    <div class={sectionCard}>
      <HoverCard>
        {#snippet trigger()}
          <span class="text-sm font-medium text-[var(--ca-brand)] underline cursor-help">Hover for user card</span>
        {/snippet}
        <div class="flex gap-3 items-center">
          <Avatar fallback="CA" size="md" />
          <div>
            <div class="font-bold text-xs text-[var(--ca-text-primary)]">CA Admin</div>
            <div class="text-[10px] text-[var(--ca-text-muted)]">admin@ca-system.io</div>
          </div>
        </div>
      </HoverCard>
    </div>
  </section>

  <!-- ═══════════════════ 29. DROPDOWN MENU ═══════════════════ -->
  <section class="space-y-4" id="dropdownmenu">
    <h2 class={sectionTitle}>DropdownMenu</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline), size (sm/md/lg), items, trigger</p>
    <div class={sectionCard}>
      <DropdownMenu items={[
        { label: 'Refresh', action: () => {} },
        { label: 'Copy SSH Key', action: () => {} },
        { label: 'Reboot Node', danger: true, action: () => {} }
      ]}>
        {#snippet trigger()}
          <Button variant="outline">Actions <Icon name="chevron-down" /></Button>
        {/snippet}
      </DropdownMenu>
    </div>
  </section>

  <!-- ═══════════════════ 30. CONTEXT MENU ═══════════════════ -->
  <section class="space-y-4" id="contextmenu">
    <h2 class={sectionTitle}>ContextMenu</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline), size (sm/md/lg), items</p>
    <div class={sectionCard}>
      <div
        class="h-24 rounded-lg border border-dashed border-[var(--ca-border)] flex items-center justify-center text-xs text-[var(--ca-text-muted)]"
        oncontextmenu={(e) => { e.preventDefault(); }}
      >
        <ContextMenu items={[
          { label: 'Inspect Element', action: () => {} },
          { label: 'View Source', action: () => {} },
          { label: 'Delete', danger: true, action: () => {} }
        ]} />
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 31. COMMAND PALETTE ═══════════════════ -->
  <section class="space-y-4" id="commandpalette">
    <h2 class={sectionTitle}>CommandPalette</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline), size (sm/md/lg), items, open (bindable)</p>
    <div class={sectionCard}>
      <Button variant="brand" onclick={() => (cmdOpen = true)}>Open Command Palette <Kbd size="sm">Ctrl+Shift+P</Kbd></Button>
    </div>
  </section>

  <!-- ═══════════════════ 32. BREADCRUMB ═══════════════════ -->
  <section class="space-y-4" id="breadcrumb">
    <h2 class={sectionTitle}>Breadcrumb</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/ghost), size (sm/md), items</p>
    <div class={sectionCard}>
      <Breadcrumb items={[
        { label: 'Clusters', href: '#' },
        { label: 'Asia-Pacific', href: '#' },
        { label: 'Hostinger VPS' }
      ]} />
    </div>
  </section>

  <!-- ═══════════════════ 33. TREE VIEW ═══════════════════ -->
  <section class="space-y-4" id="treeview">
    <h2 class={sectionTitle}>TreeView</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/ghost), size (sm/md), nodes</p>
    <div class={sectionCard}>
      <TreeView nodes={fileTree} />
    </div>
  </section>

  <!-- ═══════════════════ 34. COLOR PICKER ═══════════════════ -->
  <section class="space-y-4" id="colorpicker">
    <h2 class={sectionTitle}>ColorPicker</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline), size (sm/md/lg), value (bindable), label</p>
    <div class={sectionCard}>
      <ColorPicker bind:value={brandColor} label="Theme Accent" />
    </div>
  </section>

  <!-- ═══════════════════ 35. FRAMELESS HEADER ═══════════════════ -->
  <section class="space-y-4" id="framelessheader">
    <h2 class={sectionTitle}>FramelessHeader</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/ghost), size (sm/md)</p>
    <div class="overflow-hidden rounded-xl border border-[var(--ca-border)]">
      <FramelessHeader />
      <div class="p-6 bg-[var(--ca-surface-elevated)] text-xs text-[var(--ca-text-muted)]">
        Application content area below the frameless header.
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 36. SIDEBAR ═══════════════════ -->
  <section class="space-y-4" id="sidebar">
    <h2 class={sectionTitle}>Sidebar</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/ghost), size (sm/md)</p>
    <div class="overflow-hidden rounded-xl border border-[var(--ca-border)] h-64">
      <Sidebar>
        <SidebarItem label="Dashboard" active />
        <SidebarItem label="Nodes" />
        <SidebarItem label="Telemetry" />
        <SidebarItem label="Settings" />
      </Sidebar>
    </div>
  </section>

  <!-- ═══════════════════ 37. SIDEBAR ITEM ═══════════════════ -->
  <section class="space-y-4" id="sidebaritem">
    <h2 class={sectionTitle}>SidebarItem</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/ghost/outline), size (sm/md), label, active, badgeVariant</p>
    <div class={sectionCard}>
      <div class="flex flex-col gap-1 max-w-xs">
        <SidebarItem label="Dashboard" active />
        <SidebarItem label="Nodes" />
        <SidebarItem label="Alerts" badgeVariant="danger" />
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 38. TELEMETRY CARD ═══════════════════ -->
  <section class="space-y-4" id="telemetrycard">
    <h2 class={sectionTitle}>TelemetryCard</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/brand/info/success/warning/danger), size (sm/md/lg), title, value, trend, status, percentage</p>
    <div class={sectionCard}>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TelemetryCard title="Active Requests" value="1,204" unit="req/s" status="normal" percentage={65} />
        <TelemetryCard title="Error Rate" value="4.2" unit="%" status="warning" percentage={20} />
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 39. LANGUAGE SWITCHER ═══════════════════ -->
  <section class="space-y-4" id="languageswitcher">
    <h2 class={sectionTitle}>LanguageSwitcher</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/ghost/outline), size (sm/md), compact, locales</p>
    <div class={sectionCard}>
      <div class="flex items-center gap-4">
        <LanguageSwitcher />
        <LanguageSwitcher compact />
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 40. THEME SWITCHER ═══════════════════ -->
  <section class="space-y-4" id="themeswitcher">
    <h2 class={sectionTitle}>ThemeSwitcher</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/ghost/outline), size (sm/md), showAccentPicker</p>
    <div class={sectionCard}>
      <ThemeSwitcher />
    </div>
  </section>

  <!-- ═══════════════════ 41. MODAL ═══════════════════ -->
  <section class="space-y-4" id="modal">
    <h2 class={sectionTitle}>Modal</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline), size (sm/md/lg/xl/full), title, open (bindable), footer snippet</p>
    <div class={sectionCard}>
      <Button variant="outline" onclick={() => (modalOpen = true)}>Open Modal</Button>
    </div>
  </section>

  <!-- ═══════════════════ 42. DRAWER ═══════════════════ -->
  <section class="space-y-4" id="drawer">
    <h2 class={sectionTitle}>Drawer</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline), size (sm/md/lg/xl/full), title, position, open (bindable)</p>
    <div class={sectionCard}>
      <Button variant="outline" onclick={() => (drawerOpen = true)}>Open Drawer</Button>
    </div>
  </section>

  <!-- ═══════════════════ 43. ICON ═══════════════════ -->
  <section class="space-y-4" id="icon">
    <h2 class={sectionTitle}>Icon</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: name (38 icons), size (number/string)</p>
    <div class={sectionCard}>
      <div class="flex flex-wrap items-center gap-4">
        {#each iconNames as iconName (iconName)}
          <div class="flex flex-col items-center gap-1 w-14">
            <Icon name={iconName} size={18} />
            <span class="text-[9px] text-[var(--ca-text-muted)] text-center leading-tight">{iconName}</span>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 44. SEPARATOR ═══════════════════ -->
  <section class="space-y-4" id="separator">
    <h2 class={sectionTitle}>Separator</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">No variant/size — pure layout separator</p>
    <div class={sectionCard}>
      <p class="text-xs text-[var(--ca-text-secondary)]">Content above</p>
      <Separator />
      <p class="text-xs text-[var(--ca-text-secondary)]">Content below</p>
    </div>
  </section>

  <!-- ═══════════════════ 45. SPLIT PANE ═══════════════════ -->
  <section class="space-y-4" id="splitpane">
    <h2 class={sectionTitle}>SplitPane</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">No variant — keyboard-resizable separator</p>
    <div class="h-48 rounded-xl border border-[var(--ca-border)] overflow-hidden">
      <SplitPane>
        {#snippet firstSlot()}
          <div class="h-full flex items-center justify-center text-xs text-[var(--ca-text-muted)] bg-[var(--ca-surface)]">Left pane</div>
        {/snippet}
        {#snippet secondSlot()}
          <div class="h-full flex items-center justify-center text-xs text-[var(--ca-text-muted)] bg-[var(--ca-surface-elevated)]">Right pane</div>
        {/snippet}
      </SplitPane>
    </div>
  </section>

  <!-- ═══════════════════ 46. TOOLTIP ═══════════════════ -->
  <section class="space-y-4" id="tooltip">
    <h2 class={sectionTitle}>Tooltip</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: content, children (trigger)</p>
    <div class={sectionCard}>
      <div class="flex items-center gap-4">
        <Tooltip content="Wireframe HUD Mode">
          <Button variant="secondary">Hover me</Button>
        </Tooltip>
        <Tooltip content="Node diagnostics tooltip">
          <span class="text-sm text-[var(--ca-brand)] underline cursor-help">Hover text</span>
        </Tooltip>
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 47. CALENDAR ═══════════════════ -->
  <section class="space-y-4" id="calendar">
    <h2 class={sectionTitle}>Calendar</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline), size (sm/md/lg), value (bindable), month (bindable), min, max</p>
    <div class={sectionCard}>
      <Calendar value={dateVal} onselect={(d) => (dateVal = d)} />
    </div>
  </section>

  <!-- ═══════════════════ 48. DATE PICKER ═══════════════════ -->
  <section class="space-y-4" id="datepicker">
    <h2 class={sectionTitle}>DatePicker</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline), size (sm/md/lg), value (bindable), min, max, disabled, label</p>
    <div class={sectionCard}>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePicker bind:value={dateVal} label="Select Date" />
        <DatePicker label="Disabled" disabled />
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 49. DATE TIME PICKER ═══════════════════ -->
  <section class="space-y-4" id="datetimepicker">
    <h2 class={sectionTitle}>DateTimePicker</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline), size (sm/md/lg), value (bindable), min, max, disabled, label, timeLabel</p>
    <div class={sectionCard}>
      <DateTimePicker bind:value={dateTimeVal} label="Schedule" />
    </div>
  </section>

  <!-- ═══════════════════ 50. DATE RANGE PICKER ═══════════════════ -->
  <section class="space-y-4" id="daterangepicker">
    <h2 class={sectionTitle}>DateRangePicker</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline), size (sm/md/lg), start/end (bindable), min, max, disabled, label</p>
    <div class={sectionCard}>
      <DateRangePicker bind:start={rangeStart} bind:end={rangeEnd} label="Monitoring Period" />
    </div>
  </section>

  <!-- ═══════════════════ 51. FILE UPLOAD ═══════════════════ -->
  <section class="space-y-4" id="fileupload">
    <h2 class={sectionTitle}>FileUpload</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline/ghost), size (sm/md/lg), multiple, accept, files (bindable), label</p>
    <div class={sectionCard}>
      <FileUpload label="Upload deployment artifacts" multiple accept=".tar.gz,.zip,.json" />
    </div>
  </section>

  <!-- ═══════════════════ 52. STEPPER ═══════════════════ -->
  <section class="space-y-4" id="stepper">
    <h2 class={sectionTitle}>Stepper</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/ghost), size (sm/md/lg), steps, current (bindable), orientation</p>
    <div class={sectionCard}>
      <Stepper steps={stepperSteps} bind:current={stepperCurrent} />
      <div class="flex gap-2 pt-2">
        <Button size="sm" variant="outline" onclick={() => (stepperCurrent = 'step-1')}>Step 1</Button>
        <Button size="sm" variant="outline" onclick={() => (stepperCurrent = 'step-2')}>Step 2</Button>
        <Button size="sm" variant="outline" onclick={() => (stepperCurrent = 'step-3')}>Step 3</Button>
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 53. NUMBER INPUT ═══════════════════ -->
  <section class="space-y-4" id="numberinput">
    <h2 class={sectionTitle}>NumberInput</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline/ghost), size (sm/md/lg), value (bindable), min, max, step, label</p>
    <div class={sectionCard}>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NumberInput bind:value={numberVal} min={0} max={100} step={1} label="Replicas" />
        <NumberInput value={50} min={0} max={100} label="Percentage" disabled />
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 54. CAROUSEL ═══════════════════ -->
  <section class="space-y-4" id="carousel">
    <h2 class={sectionTitle}>Carousel</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline), size (sm/md/lg), items, showDots, showArrows, loop, autoplay</p>
    <div class={sectionCard}>
      <Carousel items={3} showDots showArrows />
      <div class="grid grid-cols-3 gap-2 mt-2">
        {#each carouselItems as slide (slide)}
          <div class="h-20 flex items-center justify-center bg-[var(--ca-surface)] border border-[var(--ca-border)] rounded-lg text-xs text-[var(--ca-text-secondary)]">
            {slide}
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ═══════════════════ 55. RESIZABLE ═══════════════════ -->
  <section class="space-y-4" id="resizable">
    <h2 class={sectionTitle}>Resizable</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: direction, initialSplit, minSize, maxSize, size (sm/md)</p>
    <div class="h-48 rounded-xl border border-[var(--ca-border)] overflow-hidden">
      <Resizable>
        {#snippet firstSlot()}
          <div class="h-full flex items-center justify-center text-xs text-[var(--ca-text-muted)] bg-[var(--ca-surface)]">Panel A</div>
        {/snippet}
        {#snippet secondSlot()}
          <div class="h-full flex items-center justify-center text-xs text-[var(--ca-text-muted)] bg-[var(--ca-surface-elevated)]">Panel B</div>
        {/snippet}
      </Resizable>
    </div>
  </section>

  <!-- ═══════════════════ 56. MENTION INPUT ═══════════════════ -->
  <section class="space-y-4" id="mentioninput">
    <h2 class={sectionTitle}>MentionInput</h2>
    <p class="text-xs text-[var(--ca-text-muted)]">Props: variant (primary/outline/ghost), size (sm/md/lg), items, trigger, value (bindable), label, onmention</p>
    <div class={sectionCard}>
      <MentionInput
        bind:value={mentionVal}
        items={mentionItems}
        trigger="@"
        label="Mention a team member"
        placeholder="Type @ to mention..."
      />
    </div>
  </section>

</div>

<!-- ═══════════════════ OVERLAY INSTANCES ═══════════════════ -->
<Drawer bind:open={drawerOpen} title="Node Diagnostics Sheet" position="right">
  <div class="space-y-4 text-xs text-[var(--ca-text-secondary)]">
    <p>Real-time telemetry stream for the selected node.</p>
    <p>CPU: 34% — RAM: 8.2 / 16 GB — Uptime: 47d 12h</p>
    <p>Network: 245 Mbps ↑ / 1.2 Gbps ↓</p>
    <Button variant="danger" onclick={() => (drawerOpen = false)} class="w-full mt-4">Close Panel</Button>
  </div>
</Drawer>

<Modal bind:open={modalOpen} title="Reboot Cluster Confirmation" size="sm">
  <p class="text-xs text-[var(--ca-text-muted)]">Are you sure you want to reboot all nodes in this cluster? This will cause a brief downtime of ~30 seconds.</p>
  {#snippet footer()}
    <Button variant="secondary" onclick={() => (modalOpen = false)}>Cancel</Button>
    <Button variant="danger" onclick={() => (modalOpen = false)}>Reboot</Button>
  {/snippet}
</Modal>

<CommandPalette bind:open={cmdOpen} items={[
  { id: '1', title: 'Open Terminal', category: 'Tools', shortcut: 'Ctrl+T', action: () => {} },
  { id: '2', title: 'Switch Theme', category: 'Settings', shortcut: 'Ctrl+Shift+T', action: () => {} },
  { id: '3', title: 'Deploy to Production', category: 'Actions', shortcut: 'Ctrl+D', action: () => {} }
]} />