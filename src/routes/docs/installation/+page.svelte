<script lang="ts">
  import { Badge } from '$lib/components/ui';
</script>

<div class="space-y-8">
  <div>
    <Badge variant="brand" size="xs">GUIDE</Badge>
    <h1 class="text-3xl font-extrabold text-white mt-2 tracking-tight">Installation & Setup</h1>
    <p class="text-sm text-neutral-400 mt-2 leading-relaxed">
      Langkah mudah integrasi CAUI ke proyek SvelteKit Anda dengan Tailwind CSS v4.
    </p>
  </div>

  <div class="space-y-6">
    <div class="space-y-3">
      <h3 class="text-base font-semibold text-white">1. Install Package</h3>
      <div class="rounded-lg bg-neutral-950 border border-neutral-800 p-4 font-mono text-xs text-neutral-300">
        pnpm add @cecepazhar/caui
      </div>
    </div>

    <div class="space-y-3">
      <h3 class="text-base font-semibold text-white">2. Import Global Tokens & CSS</h3>
      <p class="text-xs text-neutral-400">Tambahkan stylesheet tokens ke root layout (<code class="text-neutral-300">src/routes/+layout.svelte</code>):</p>
      <div class="rounded-lg bg-neutral-950 border border-neutral-800 p-4 font-mono text-xs text-neutral-300">
        <span class="text-neutral-500">// src/routes/+layout.svelte</span><br/>
        import '@cecepazhar/caui/tokens.css';
      </div>
    </div>

    <div class="space-y-3">
      <h3 class="text-base font-semibold text-white">3. Setup CSS Variable Brand Accent</h3>
      <p class="text-xs text-neutral-400">Secara default CAUI menggunakan Monochrome Zinc. Anda dapat mengatur aksen Pro di root CSS:</p>
      <div class="rounded-lg bg-neutral-950 border border-neutral-800 p-4 font-mono text-xs text-neutral-300">
        :root &#123;<br/>
        &nbsp;&nbsp;--ca-brand: #06b6d4; <span class="text-neutral-500">/* Cyan CATerm / CAMark */</span><br/>
        &#125;
      </div>
    </div>

    <div class="space-y-3">
      <h3 class="text-base font-semibold text-white">4. Import & Gunakan Komponen</h3>
      <div class="rounded-lg bg-neutral-950 border border-neutral-800 p-4 font-mono text-xs text-neutral-300">
        &lt;script lang="ts"&gt;<br/>
        &nbsp;&nbsp;import &#123; Button, Badge, Switch, PinInput &#125; from '@cecepazhar/caui';<br/>
        &lt;/script&gt;<br/><br/>
        &lt;Button variant="primary"&gt;Connect SSH&lt;/Button&gt;<br/>
        &lt;Badge variant="brand"&gt;Pro Active&lt;/Badge&gt;
      </div>
    </div>
  </div>
</div>
