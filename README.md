# CADS (Cecep Azhar Design System)

<div align="center">

```text
       ___                                       ___
     /   /\                                     /\  \
    /   /:/                                     \:\  \
   /   /:/          ___     ___   ___            \:\  \
  /   /:/  ___     /__/\   /  /\ /__/\            \:\  \
 /___/:/  /\__\    \  \:\ /  /:/ \  \:\     ___    \:\__\
 \   \:\ /:/  /     \  \:\  /:/   \__\:\   /\__\   /:/__/
  \   \:\/:/  /      \  \:\/:/    /  /:/  /:/__/  /::\  \
   \   \::/  /        \  \::/    /__/:/  /::\  \  \/\:\  \
    \___\/  /          \__\/     \__\/   \/\:\  \   \:\__\
                                          \:\__\   \/__/
```

**Sovereign Developer Design System & Micro-Token Contract**  
*Anti-bloat, dark-mode first, zero-knowledge HUD aesthetics for sovereign applications.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Author](https://img.shields.io/badge/Author-Cecep%20Saeful%20Azhar%20Hidayat%2C%20ST-06b6d4.svg)](https://www.cecepazhar.com)
[![Ecosystem](https://img.shields.io/badge/Ecosystem-Fathforce-6366f1.svg)](https://fathforce.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-0852--2069--6117-25D366.svg?logo=whatsapp&logoColor=white)](https://wa.me/6285220696117)
[![Svelte 5](https://img.shields.io/badge/Svelte-5.x%20Runes-ff3e00.svg)](https://svelte.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4.x-38bdf8.svg)](https://tailwindcss.com)
[![GitHub Repository](https://img.shields.io/badge/GitHub-cecep--azhar%2Fcads-white.svg)](https://github.com/cecep-azhar/cads)

</div>

---

## ⚡ Ethos & Architecture

CADS is an opinionated, high-performance UI library and design token contract engineered for **CATerm**, **CAMark**, **CACash**, and applications within the **Fathforce Ecosystem**.

- **Obsidian Dark-Mode Aesthetic**: Pitch-black surface `#0A0A0C`, elevated container `#121217`, crisp HUD borders `#272732`.
- **Svelte 5 Runes Native**: Built from scratch using `$state`, `$props`, `$derived`, and snippets. Zero legacy Svelte stores or reactivity overhead.
- **Dynamic Reactive Theming**: Built-in dynamic `--ca-brand` CSS variable integration for instant live Pro color accents.
- **Zero Heavy Dependencies**: Lightweight, tree-shakeable primitives engineered without bloat. Exported directly via `@sveltejs/package`.

---

## 🧩 Components & Primitives

| Component | Description | Export |
| :--- | :--- | :--- |
| **`Logo`** | Official Cecep Azhar Dual-Wing vector emblem with customizable size and color modes (`brand`, `white`, `light`). | `@cecep-azhar/cads` |
| **`Button`** | Standardized HUD actions with `sm`, `md`, `lg`, `icon` scales, spinner states, and wireframe outlines. | `@cecep-azhar/cads` |
| **`Badge`** | Micro telemetry status indicators, audit tags, and protocol flags (`xs`, `sm`). | `@cecep-azhar/cads` |
| **`Input`** | Precision form input controls with trailing/leading icon snippets. | `@cecep-azhar/cads` |
| **`Card`** | Surface-elevated HUD cards with structured header action slots. | `@cecep-azhar/cads` |
| **`PageHeader`** | Unified header bar with color-coded accent badge and actions snippet. | `@cecep-azhar/cads` |
| **`tokens`** | Design token contract JSON & CSS properties. | `@cecep-azhar/cads` |

---

## 📦 Installation & Usage

### 1. Install via Package Manager

```bash
pnpm add @cecep-azhar/cads
# or
npm install @cecep-azhar/cads
```

### 2. Import CSS Tokens (Optional / Tailwind v4)

In your global CSS file (e.g. `app.css`):

```css
@import "@cecep-azhar/cads/tokens.css";
```

### 3. Use Components in Svelte 5

```svelte
<script lang="ts">
  import { Button, Badge, Card, Logo } from '@cecep-azhar/cads';
</script>

<Card title="DevOps Control Node" description="Zero-knowledge node telemetry">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <Logo size={24} mode="brand" />
      <Badge variant="success">ONLINE</Badge>
    </div>
    <Button variant="brand" size="sm">Deploy</Button>
  </div>
</Card>
```

---

## 🛠️ Development & Building

```bash
# Install dependencies
pnpm install

# Start local interactive preview showcase
pnpm run dev

# Run SvelteKit type checks
pnpm run check

# Build preview application & package library
pnpm run build
pnpm run package
```

---

## 🏛️ Ecosystem & Attribution

Architected & engineered by **[Cecep Saeful Azhar Hidayat, ST](https://www.cecepazhar.com)** for the **[Fathforce Ecosystem](https://fathforce.com)** and sovereign developer tools.

- **Author**: Cecep Saeful Azhar Hidayat, ST
- **Website**: [www.cecepazhar.com](https://www.cecepazhar.com)
- **Email**: [hi@cecepazhar.com](mailto:hi@cecepazhar.com)
- **WhatsApp**: [+62 852-2069-6117](https://wa.me/6285220696117) (`0852-2069-6117`)
- **GitHub**: [@cecep-azhar](https://github.com/cecep-azhar)
- **Organization**: [Fathforce](https://fathforce.com)
- **Repository**: [github.com/cecep-azhar/cads](https://github.com/cecep-azhar/cads)
- **License**: [MIT License](LICENSE)
