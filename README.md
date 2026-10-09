# CADS (CATerm Design System)

Standalone Svelte 5 component library and design token contract for CATerm and CA Group applications.

## Ethos & Architecture
- **Sovereign Developer Design System**: Anti-bloat, dark-mode first, zero-knowledge HUD aesthetics.
- **Svelte 5 Runes**: Built natively with `$state`, `$props`, `$derived`, and snippets.
- **Tailwind CSS v4**: Monoline wireframe styling with dynamic `--ca-brand` CSS variable integration.
- **Modular Packaging**: Exported with `@sveltejs/package` for seamless consumption across SvelteKit apps.

## Primitives
- `Button`: Standardized actions with sm/md/lg/icon sizes and outline/monochrome variants.
- `Badge`: Micro indicators and telemetry status tags.
- `Input`: Precision form input controls with icon and action slot snippets.
- `Card`: Surface elevated container with structured title and header action slots.
- `PageHeader`: Standardized workspace header with color-coded accent icon badge.

## Design Tokens
- Tokens contract provided in JSON (`tokens.json`) and CSS Custom Properties (`tokens.css`).

## Getting Started

```bash
# Install dependencies
pnpm install

# Start local showcase preview
pnpm run dev

# Typecheck & Lint
pnpm run check

# Build preview & package library
pnpm run build
pnpm run package
```
