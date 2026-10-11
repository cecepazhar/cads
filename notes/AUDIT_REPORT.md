# AUDIT_REPORT.md — CAUI (@cecepazhar/caui) v1.0 → v1.1.0

Tanggal audit: 2026-10-10 · Metode: 4-agent parallel scan (read-only) terhadap
46 komponen `src/lib/components/ui/*.svelte` + cross-reference CATerm (87 file).

> **Koreksi data awal**: jumlah komponen = **46** (bukan 49). `Notification` tidak
> ada — Toast menutupi fungsi itu. Total setelah Phase 5 = **56** komponen.
> `Table` memiliki **13** hex literal (bukan ~16); `ThemeSwitcher` **10** (bukan ~11);
> `ColorPicker` **8**. Semua komponen sudah Svelte 5 runes — tanpa `export let`.

## 1. Metrics

| Metric | Value |
|--------|-------|
| Total komponen UI (`ui/*.svelte`) | 46 |
| Dengan prop `variant` | 2 (Button, Tabs) — 0 sebelumnya selain itu |
| Dengan prop `size` | 4 (Avatar, Badge, Button, Modal, Switch, Tabs via style) |
| Tanpa ARIA/role yang memadai | 30 |
| Pelanggaran fokus (focus ring hilang / `focus:outline-none` tanpa pengganti) | 42 dari 46 |
| File dengan hex literal | 24 |
| Test files | 1 (`Button.test.ts`) |
| Coverage threshold | tidak ada |
| CATerm local UI duplikat | 12 komponen, 0 import `@cecepazhar/caui` |

Legend status: **P0** = pelanggaran a11y kritis (Phase 2) · **P1** = variant/token (Phase 3–4) · **OK** = hanya polish.

## 2. Per-Component Audit

| Component | A11y | Variants | Tokens (hex) | Tests | Status |
|---|---|---|---|---|---|
| Accordion | ⚠️ tanpa `aria-expanded`/`aria-controls`, tanpa arrow-nav | — | 1 (`#121217`) | – | P0 |
| Alert | ✅ `role="alert"`; dismiss tanpa focus ring | v✓ s✗ (`error`≡`danger` duplikat) | 0 | – | P1 |
| Avatar | ⚠️ fallback tanpa accessible name | s✓ (`xs–xl`) v✗ | 0 (1 rgba halo) | – | P1 |
| AvatarGroup | ❌ tanpa `role="group"`; prop `max` tidak dipakai | — | 0 | – | P0 |
| Badge | ⚠️ tanpa semantic role | v✓ s✓ (`xs`,`sm`) | 0 | – | P1 |
| Breadcrumb | ⚠️ tanpa `aria-current="page"`, bukan `<ol>/<li>`, separator tanpa `aria-hidden` | — | 0 | – | P0 |
| Button | ⚠️ tanpa focus-visible ring, tanpa `aria-busy` saat loading | v✓ s✓ | 0 | ✅ | P0 |
| Card | ⚠️ heading level hardcoded `h3` | — | 2 (`#121217`, `#272732`) | – | P1 |
| Checkbox | ✅ `role="checkbox"`; tanpa focus ring, tanpa `aria-describedby` | — | 0 | – | P0 |
| CircularProgress | ⚠️ tanpa `role="progressbar"` / value attrs | — | 1 (`#3B82F6` fallback salah) | – | P0 |
| Collapsible | ❌ tanpa `aria-expanded`/`aria-controls` | — | 1 (`#121217`) | – | P0 |
| ColorPicker | ⚠️ preset tanpa focus ring; preset = data literal | — | 8 (palettes) | – | P1 |
| Combobox | ❌ nol ARIA (tanpa combobox/listbox/option), tanpa keyboard nav | — | 1 (`#121217`) | – | P0 |
| CommandPalette | ⚠️ tanpa focus trap, tanpa `aria-activedescendant`, `selectedIndex` mati | — | 3 (`#111116`,`#272732`,`#1A1A22`) | – | P0 |
| ContextMenu | ⚠️ tanpa `role="menuitem"`, tanpa arrow-nav, click-outside via selector rapuh | — | 0 | – | P0 |
| Drawer | ⚠️ tanpa focus trap / `aria-labelledby`; `role="document"` deprecated | — | 1 (`#121217`) | – | P0 |
| DropdownMenu | ⚠️ tanpa `aria-expanded`/`aria-haspopup`, tanpa Escape/arrow-nav | — | 0 | – | P0 |
| FramelessHeader | ⚠️ `title` tanpa `aria-label`, tanpa `role="banner"` | — | 2 (`#0A0A0C`, `#1E1E24`) | – | P0 |
| HoverCard | ❌ mouse-only (keyboard-inaccessible) | — | 3 (`#272732`,`#121217`,`#EDEDED`) | – | P0 |
| Icon | ✅ `aria-hidden` benar | exempt | 0 | – | OK |
| Input | ⚠️ tanpa `aria-invalid`/label association | — | 0 | – | P0 |
| Kbd | ✅ semantik `<kbd>` | exempt | 0 | – | OK |
| LanguageSwitcher | ⚠️ tanpa `aria-label`; state toggle tidak diumumkan | — (perlu `compact`) | 3 (`#272732`,`#141419`,`#1C1C24`) | – | P0 |
| Modal | ⚠️ **tanpa focus trap / focus return** | s✓ (`sm–full`) | 4 (`#121217`,`#272732`,`#EDEDED`,`#18181F`) | – | P0 |
| PinInput | ⚠️ tanpa `aria-label` per digit, tanpa `one-time-code`, tanpa paste handler | — | 0 | – | P0 |
| Popover | ❌ nol ARIA, tanpa Escape/click-outside | — | 3 (`#272732`,`#121217`,`#EDEDED`) | – | P0 |
| ProgressBar | ⚠️ tanpa `role="progressbar"`; label hardcoded Inggris | — | 0 (fallback `#3B82F6`) | – | P0 |
| RadioGroup | ⚠️ `focus:outline-none` tanpa pengganti (focus tak terlihat) | — | 0 | – | P0 |
| RangeSlider | ❌ dual-thumb tanpa accessible name / constraint logic | — | 0 | – | P0 |
| SegmentedControl | ⚠️ tanpa `role="tablist"`/`aria-selected`; prop `icon` mati | s✓ (`sm`,`md`) | 0 | – | P0 |
| Select | ⚠️ `<label>` tanpa `for` association | — | 1 (`#121217`) | – | P0 |
| Separator | ⚠️ tanpa `aria-orientation` | exempt | 0 | – | P1 |
| Sidebar | ⚠️ collapse toggle tidak punya `aria-expanded` | — | 4 (`#0E0E12`,`#272732`) | – | P1 |
| SidebarItem | ⚠️ tanpa `aria-current="page"`; badge/status visual-only | — (`badgeVariant` ada) | 2 (`#14141A`,`#181822`) | – | P0 |
| Skeleton | ❌ tanpa `role="status"`/`aria-busy` | — | 0 | – | P0 |
| Slider | ⚠️ tanpa accessible name / `aria-valuetext` | — | 0 | – | P0 |
| SplitPane | ❌ divider focusable tapi **tanpa `onkeydown`** (WCAG 2.1.1) | exempt | 4 (`#1E1E24`, fallback `#ef4444` ×3) | – | P0 |
| Switch | ⚠️ tanpa accessible name; `focus:outline-none` tanpa pengganti | s✓ (`sm–lg`) | 1 (fallback `#3B82F6`) | – | P0 |
| Table | ❌ sorting/row-click keyboard-inaccessible; tanpa `aria-sort`/caption | — | 13 (`#272732`×6, `#121217`×2, `#18181F`×2, `#0A0A0C`, `#14141A`, `#181822`) | – | P0 |
| Tabs | ❌ seluruh pola WAI-ARIA tabs hilang (role, aria-selected, roving tabindex) | v✓ (`underline/pills/segmented`) | 0 | – | P0 |
| TelemetryCard | ❌ nol ARIA; prop `trend` mati; progress bar tak terexpose | — | 5 (`#111116`,`#22222B`,`#1F1F28`,`#ef4444`×2) | – | P0 |
| Textarea | ⚠️ satu-satunya dengan focus ring; label/error tak terasosiasi | — | 1 (`#121217`) | – | P0 |
| ThemeSwitcher | ⚠️ toggle tanpa `aria-pressed`; swatch tanpa radiogroup semantics | — | 10 (palettes + surface) | – | P0 |
| Toast | ❌ **tanpa live region** (`role="status"`/`aria-live`); close button tanpa nama | via store `type` | 1 (`#121217`) | – | P0 |
| Tooltip | ⚠️ `role="tooltip"` di wrapper, trigger tak terasosiasi; prop `delay` mati | — | 0 | – | P0 |
| TreeView | ❌ nol tree ARIA; emoji sebagai ikon; leaf button no-op | — | 0 (inline `style` indent) | – | P0 |

**Distribusi status**: P0 = 33 · P1 = 11 · OK = 2 (Icon, Kbd).

### Cross-cutting findings

1. **Focus-visible ring hilang di hampir semua komponen** — 2 komponen justru mematikan
   outline native tanpa pengganti (`Switch`, `RadioGroup`) → pelanggaran WCAG 2.4.7.
2. **Overlay tidak punya focus trap** (Modal, Drawer, CommandPalette, DropdownMenu,
   ContextMenu, Popover) → WCAG 2.4.3 / 2.1.2.
3. **24 file hex literal**; 3 fallback brand salah (`#3B82F6` di Switch/ProgressBar,
   `#ef4444` di SplitPane/TelemetryCard) — konsolidasi ke token (lihat VARIANT_SPEC §5.1).
4. **`lucide-svelte` terpasang tapi tidak dipakai** — ikon memakai SVG inline buatan
   tangan di `Icon.svelte` + emoji di TreeView.
5. Props mati: `AvatarGroup.max`, `SegmentedControl icon`, `TelemetryCard.trend`, `Tooltip.delay`.
6. Inkonsistensi token pre-existing (TIDAK diubah): `tokens.json` `brand: #06B6D4`
   vs `tokens.css` `:root --ca-brand: #ef4444`. DESIGN.md tidak disentuh; nilai token
   runtime tidak diubah. Perlu keputusan owner soal default brand.

## 3. Phase 7 — CATerm Cross-Reference

87 file `.svelte` di `caterm/frontend/src` (62 `lib/components`, 25 `routes`).
CATerm tidak memakai `lucide-svelte`; ikon = `Icon.svelte` lokal yang **byte-identik**
dengan CAUI (27 nama).

### Table A — 12 komponen lokal CATerm vs CAUI (drop-in compatibility)

| Component | CATerm usage (file) | API compatible? | Catatan |
|---|---|---|---|
| Alert | 2 (5 occ) | ✅ | CAUI superset (punya `danger`) |
| Badge | 3 (13 occ) | ✅ | identik |
| Button | 4 (16 occ) | ✅ | identik |
| Card | 2 (8 occ) | ✅ | identik |
| Icon | 5 (16 occ) | ✅ | identik (27 nama) |
| Input | 2 (2 occ) | ✅ | identik |
| LanguageSwitcher | 3 (3 occ) | ❌ **blocking** | CATerm punya `compact` + dual-button EN/ID; CAUI single toggle. Fix: tambah `compact` (VARIANT_SPEC §8) |
| Modal | 1 | ✅ | identik |
| Sidebar | 0* | ✅ | di-import, tidak dirender |
| SidebarItem | 0* | ✅ | di-import, tidak dirender |
| Table | 1 | ✅ | identik |
| ThemeSwitcher | 1 | ✅ | identik |

\* di-import di `routes/design-system/+page.svelte`, tidak dipakai di template manapun.

### Table B — 34 komponen CAUI belum dipakai CATerm

Accordion, Avatar, AvatarGroup, Breadcrumb, Checkbox, CircularProgress, Collapsible,
ColorPicker, Combobox, CommandPalette, ContextMenu, Drawer, DropdownMenu,
FramelessHeader, HoverCard, Kbd, PinInput, Popover, ProgressBar, RadioGroup,
RangeSlider, SegmentedControl, Select, Separator, Skeleton, Slider, SplitPane,
Switch, Tabs, TelemetryCard, Textarea, Toast, Tooltip, TreeView.

### Section C — Ikon & Theming CATerm

- Ikon: `Icon.svelte` kustom, 27 SVG inline; **10 terpakai** (terminal, sparkles,
  search, refresh, sun, moon, lock, globe, copy, code) — 17 tidak terpakai.
- Theming: CATerm `app.css` sudah mendefinisikan `--ca-*` (`--ca-brand`, `--ca-surface`,
  `--ca-border`, `--ca-text-*`, `--ca-danger`, `--ca-success`, `--ca-warning`,
  `--ca-radius-*`) — **hanya `--ca-brand` yang dipakai** (38 occ / 11 file); token
  lain terdefinisi tapi komponen memakai hex literal.
- 15 hex unik hardcoded di 12 komponen CATerm.

### Rekomendasi migrasi (eksekusi menyusul di repo caterm — di luar scope v1.1)

1. Ganti `src/lib/components/ui/` lokal CATerm dengan import `@cecepazhar/caui`
   (API sudah drop-in setelah LanguageSwitcher fix).
2. Konversi 15 hex → `var(--ca-*)` (token sudah ada di `app.css`).
3. Peta ikon: `Icon.svelte` CAUI tetap menerima 27 nama → nol perubahan call site.
4. Komponen CAUI yang langsung bernilai untuk CATerm: Toast (live-region), Tooltip,
   Kbd, Skeleton, ProgressBar, Tabs, DropdownMenu.

## 4. Quality Gates (baseline sebelum fix)

| Gate | Status awal |
|---|---|
| `pnpm run check` | perlu dicek ulang pasca-fix |
| `pnpm run lint` | perlu dicek ulang pasca-fix |
| `pnpm test -- --run` | 1 file test, tanpa coverage threshold |
| `pnpm run package` | perlu dicek ulang pasca-fix |
| `publint` | perlu dicek ulang pasca-fix |
| grep hex di `ui/*.svelte` | ❌ 24 file |
| semua komponen punya `aria-` | ❌ ~30 tanpa |
