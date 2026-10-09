<script lang="ts">
  import { Card, Badge } from '$lib/components/ui';

  const colorTokens = [
    { name: 'Dark Background', var: '--ca-bg', val: '#0A0A0C' },
    { name: 'Elevated Surface', var: '--ca-card', val: '#121217' },
    { name: 'Border Subtle', var: '--ca-border', val: '#272732' },
    { name: 'Text Primary', var: '--ca-text', val: '#EDEDED' },
    { name: 'CATerm Cyan', var: '--ca-cyan', val: '#06B6D4' },
    { name: 'CAStudio Violet', var: '--ca-violet', val: '#8B5CF6' },
    { name: 'CACash Emerald', var: '--ca-emerald', val: '#10B981' },
    { name: 'CABench Crimson', var: '--ca-crimson', val: '#EF4444' },
  ];
</script>

<div class="space-y-8">
  <div>
    <Badge variant="brand" size="xs">SPECIFICATION</Badge>
    <h1 class="text-3xl font-extrabold text-white mt-2 tracking-tight">Design Tokens Explorer</h1>
    <p class="text-sm text-neutral-400 mt-2 leading-relaxed">
      Sistem token terpadu CAUI v1.0 yang menjamin konsistensi visual di seluruh produk ekosistem CA.
    </p>
  </div>

  <Card title="Color Palette Tokens" description="Matrix warna dark mode dan token brand aplikasi.">
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
      {#each colorTokens as col}
        <div class="rounded-lg border border-neutral-800 bg-neutral-900/60 p-3 flex flex-col gap-2">
          <div class="h-10 w-full rounded border border-white/10" style="background-color: {col.val};"></div>
          <div>
            <div class="text-xs font-semibold text-white">{col.name}</div>
            <div class="text-[10px] font-mono text-neutral-400 mt-0.5">{col.val}</div>
          </div>
        </div>
      {/each}
    </div>
  </Card>

  <Card title="Typography & Radius Tokens" description="Hierarki skala dan kelengkungan border.">
    <div class="space-y-3 text-xs text-neutral-300">
      <div class="flex justify-between border-b border-neutral-800 pb-2">
        <span class="font-mono text-neutral-400">--ca-font-sans</span>
        <span>Geist, Inter, system-ui</span>
      </div>
      <div class="flex justify-between border-b border-neutral-800 pb-2">
        <span class="font-mono text-neutral-400">--ca-font-mono</span>
        <span>JetBrains Mono, Fira Code, monospace</span>
      </div>
      <div class="flex justify-between border-b border-neutral-800 pb-2">
        <span class="font-mono text-neutral-400">--ca-radius-sm</span>
        <span>6px (Buttons, Inputs, Badges)</span>
      </div>
      <div class="flex justify-between">
        <span class="font-mono text-neutral-400">--ca-radius-lg</span>
        <span>12px / 16px (Cards, Modals, Drawers)</span>
      </div>
    </div>
  </Card>
</div>
