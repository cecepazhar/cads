<script lang="ts">
  import type { Snippet } from 'svelte';
  import Logo from '$lib/components/Logo.svelte';
  import { Button, Badge, ThemeSwitcher, LanguageSwitcher } from '$lib/components/ui';

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();

  const navCategories = [
    {
      title: 'Getting Started',
      items: [
        { label: 'Overview', href: '/docs' },
        { label: 'Installation', href: '/docs/installation' },
        { label: 'Design Tokens', href: '/docs/tokens' },
      ],
    },
    {
      title: 'Component Catalog',
      items: [
        { label: 'All Components (Interactive)', href: '/docs/components' },
      ],
    },
    {
      title: 'Core Primitives',
      items: [
        { label: 'Button & Badge', href: '/docs/components#button' },
        { label: 'Input & Textarea', href: '/docs/components#input' },
        { label: 'Card & Table', href: '/docs/components#card' },
        { label: 'Avatar & Tooltip', href: '/docs/components#avatar' },
      ],
    },
    {
      title: 'Forms & Controls',
      items: [
        { label: 'Switch & Checkbox', href: '/docs/components#switch' },
        { label: 'RadioGroup & Select', href: '/docs/components#forms' },
        { label: 'Slider & RangeSlider', href: '/docs/components#slider' },
        { label: 'PinInput (TOTP)', href: '/docs/components#pininput' },
        { label: 'ColorPicker', href: '/docs/components#colorpicker' },
      ],
    },
    {
      title: 'Navigation & Overlays',
      items: [
        { label: 'Tabs & SegmentedControl', href: '/docs/components#tabs' },
        { label: 'Breadcrumb & Separator', href: '/docs/components#nav' },
        { label: 'Modal & Drawer', href: '/docs/components#overlays' },
        { label: 'Dropdown & ContextMenu', href: '/docs/components#menus' },
        { label: 'Popover & HoverCard', href: '/docs/components#popover' },
      ],
    },
    {
      title: 'Feedback & Utilities',
      items: [
        { label: 'Toast Notifications', href: '/docs/components#toast' },
        { label: 'Progress & Skeleton', href: '/docs/components#feedback' },
        { label: 'Accordion & Collapsible', href: '/docs/components#accordion' },
        { label: 'TreeView (Explorer)', href: '/docs/components#treeview' },
        { label: 'Kbd & Telemetry', href: '/docs/components#utils' },
      ],
    },
  ];
</script>

<div class="min-h-screen flex flex-col bg-[#0A0A0C] text-[#EDEDED] font-sans antialiased selection:bg-[var(--ca-brand)] selection:text-white">
  <!-- Topbar -->
  <header class="sticky top-0 z-40 border-b border-[#272732] bg-[#0A0A0C]/90 backdrop-blur-md px-6 py-3.5 flex items-center justify-between">
    <div class="flex items-center gap-6">
      <a href="/" class="flex items-center gap-3 group">
        <Logo size={28} mode="brand" />
        <span class="font-bold text-sm tracking-tight text-white group-hover:text-[var(--ca-brand)] transition">CADS</span>
        <span class="text-[10px] font-mono px-2 py-0.5 rounded-full border border-neutral-700 bg-neutral-900 text-neutral-400">v1.0.0</span>
      </a>
      <nav class="hidden md:flex items-center gap-5 text-xs text-neutral-400 font-medium">
        <a href="/" class="hover:text-white transition">Home</a>
        <a href="/docs" class="text-white font-semibold">Docs</a>
        <a href="/docs/components" class="hover:text-white transition">Components</a>
        <a href="/docs/tokens" class="hover:text-white transition">Tokens</a>
      </nav>
    </div>
    <div class="flex items-center gap-3">
      <LanguageSwitcher />
      <ThemeSwitcher />
      <a
        href="https://github.com/cecepazhar/cads"
        target="_blank"
        rel="noreferrer"
        class="text-xs px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono transition"
      >
        GitHub
      </a>
    </div>
  </header>

  <!-- Docs Shell -->
  <div class="flex-1 flex max-w-7xl w-full mx-auto">
    <!-- Sidebar -->
    <aside class="w-64 shrink-0 border-r border-[#272732] p-6 hidden lg:block overflow-y-auto max-h-[calc(100vh-57px)] sticky top-[57px]">
      <div class="space-y-6">
        {#each navCategories as cat}
          <div>
            <h4 class="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold mb-2">{cat.title}</h4>
            <ul class="space-y-1">
              {#each cat.items as item}
                <li>
                  <a
                    href={item.href}
                    class="block px-2.5 py-1.5 text-xs rounded-md text-neutral-400 hover:text-white hover:bg-neutral-900 transition font-medium"
                  >
                    {item.label}
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 md:p-10 max-w-4xl min-w-0">
      {@render children?.()}
    </main>
  </div>
</div>
