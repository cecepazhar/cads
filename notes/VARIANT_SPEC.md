# VARIANT_SPEC.md — CAUI v1.1.0

Spesifikasi resmi prop `variant` / `size` / state matrix, standar a11y, dan aturan
token untuk semua komponen CAUI. Dokumen ini **mengikat** untuk semua fase fix.

Sumber API bersama: `src/lib/components/ui/types.ts`
(`ComponentVariant`, `ComponentSize`, `ComponentState`, `StatusVariant`).

---

## 1. Kosakata Bersama

```ts
// Warna/semantik — dipakai seragam di seluruh sistem (subset per komponen via Extract<>)
type ComponentVariant =
  | 'primary' | 'secondary' | 'outline' | 'ghost' | 'brand'
  | 'neutral' | 'info' | 'success' | 'warning' | 'danger';

// Skala ukuran global — subset per komponen
type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon';

// State matrix wajib untuk komponen interaktif
type ComponentState = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading' | 'error' | 'success';
```

Aturan:
- Setiap komponen **mendeklarasikan subset**-nya: `type ButtonVariant = Extract<ComponentVariant, ...>`.
- `variant` **selalu opsional** dengan default `'primary'` (atau `'neutral'` untuk Badge/Alert).
  Tidak boleh ada breaking change pada nilai yang sudah ada (kompatibilitas CATerm).
- Alias kompatibilitas diizinkan dan ditandai `@deprecated` (mis. Alert `'error'` → `'danger'`).
- **Exception layout-style** (bentuk tampilan, bukan warna): Tabs `'underline' | 'pills' | 'segmented'`,
  Skeleton `'text' | 'circular' | 'rectangular'`. Tetap konsisten antar versi.

## 2. Matriks Per Komponen

Kolom: `variant` (subset, default) | `size` (subset, default) | a11y category (lihat §3).
Komponen yang diecualikan dari variant/size (presentational/layout murni): Icon, Separator, SplitPane.

| Component | variant (default) | size (default) | A11y category |
|---|---|---|---|
| Button | full (primary) | sm/md/lg/icon (md) | button |
| Badge | full + neutral (neutral) | xs/sm/md (sm) | status |
| Alert | neutral/info/success/warning/danger + alias error (neutral) | sm/md/lg (md) | alert |
| Card | primary/secondary/outline/ghost (primary) | sm/md/lg (md) | region (heading-level prop) |
| Input | primary/outline/ghost (primary) | sm/md/lg (md) | input |
| Textarea | primary/outline/ghost (primary) | sm/md/lg (md) | input |
| Select | primary/outline/ghost (primary) | sm/md/lg (md) | input (native) |
| Combobox | primary/outline/ghost (primary) | sm/md/lg (md) | combobox |
| PinInput | primary/outline/ghost (primary) | sm/md/lg (md) | input-group |
| Checkbox | primary/brand (primary) | sm/md/lg (md) | checkbox |
| RadioGroup | primary/brand (primary) | sm/md/lg (md) | radiogroup |
| Switch | primary/brand (primary) | sm/md/lg (md) | switch |
| Slider | primary/brand (primary) | sm/md/lg (md) | slider (native input) |
| RangeSlider | primary/brand (primary) | sm/md/lg (md) | slider ×2 |
| ProgressBar | full (brand) | sm/md/lg (md) | progressbar |
| CircularProgress | full (brand) | `size: number` (legacy, dipertahankan) | progressbar |
| Avatar | primary/brand (primary) | xs/sm/md/lg/xl (md) | img (fallback label) |
| AvatarGroup | primary/brand (primary) | xs/sm/md/lg/xl (md) | group (overflow count) |
| Skeleton | text/circular/rectangular (text) | sm/md/lg (md) | status (aria-busy) |
| Toast | neutral/info/success/warning/danger (neutral) | sm/md (md) | live-region |
| Table | primary/outline (primary) | sm/md/lg (md) | grid (aria-sort) |
| Kbd | — (exempt) | sm/md/lg (sm) | text |
| SegmentedControl | primary/outline/ghost (primary) | sm/md/lg (md) | radiogroup / tablist |
| Tabs | underline/pills/segmented (underline) | sm/md/lg (md) | tabs |
| Accordion | primary/outline/ghost (primary) | sm/md/lg (md) | disclosure |
| Collapsible | primary/outline/ghost (primary) | sm/md/lg (md) | disclosure |
| Popover | primary/outline (primary) | sm/md/lg (md) | dialog (non-modal) |
| HoverCard | primary/outline (primary) | sm/md/lg (md) | hovercard |
| DropdownMenu | primary/outline (primary) | sm/md/lg (md) | menu |
| ContextMenu | primary/outline (primary) | sm/md/lg (md) | menu |
| CommandPalette | primary/outline (primary) | sm/md/lg (md) | combobox + dialog |
| Breadcrumb | primary/ghost (primary) | sm/md (sm) | navigation |
| TreeView | primary/ghost (primary) | sm/md (md) | tree |
| ColorPicker | primary/outline (primary) | sm/md/lg (md) | input-group |
| FramelessHeader | primary/ghost (primary) | sm/md (md) | banner |
| Sidebar | primary/ghost (primary) | sm/md (md) | navigation |
| SidebarItem | primary/ghost/outline (primary) | sm/md (md) | link/button + aria-current |
| TelemetryCard | primary/brand/info/success/warning/danger (primary) | sm/md/lg (md) | status + progressbar |
| LanguageSwitcher | primary/ghost/outline (primary) | sm/md (md) | radiogroup (compact) / button |
| ThemeSwitcher | primary/ghost/outline (primary) | sm/md (md) | radiogroup |
| Modal | primary/outline (primary) | sm/md/lg/xl/full (md) | dialog (modal) |
| Drawer | primary/outline (primary) | sm/md/lg/xl/full (md) | dialog (modal) |
| Icon | — (exempt) | `size: number\|string` (legacy) | img (aria-hidden default) |
| Separator | — (exempt) | — | separator |
| SplitPane | — (exempt) | — | separator (keyboard-resizable) |

**Komponen baru (Phase 5)** — pattern yang sama, spec detail di §7:

| Component | variant (default) | size (default) | A11y category |
|---|---|---|---|
| DatePicker | primary/outline (primary) | sm/md/lg (md) | combobox + dialog (grid) |
| DateTimePicker | primary/outline (primary) | sm/md/lg (md) | combobox + dialog |
| DateRangePicker | primary/outline (primary) | sm/md/lg (md) | combobox + dialog (grid) |
| Calendar | primary/outline (primary) | sm/md/lg (md) | grid (roving tabindex) |
| FileUpload | primary/outline/ghost (primary) | sm/md/lg (md) | button + live progress |
| Stepper | primary/ghost (primary) | sm/md/lg (md) | navigation (ordered steps) |
| NumberInput | primary/outline/ghost (primary) | sm/md/lg (md) | spinbutton |
| Carousel | primary/outline (primary) | sm/md/lg (md) | region (group + controls) |
| Resizable | — (exempt variant) | sm/md (md) | separator (keyboard-resizable) |
| MentionInput | primary/outline/ghost (primary) | sm/md/lg (md) | combobox |

## 3. Standar A11y (WCAG 2.2 AA / WAI-ARIA 1.2)

### 3.1 Focus-visible ring (WAJIB di semua elemen interaktif)

```class
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)]
```

Dilarang `focus:outline-none` tanpa pengganti (pelanggaran WCAG 2.4.7).

### 3.2 Pola per kategori

| Category | Requirement |
|---|---|
| button | `<button type="button">`, `aria-busy` saat loading, `aria-label` wajib untuk icon-only, `disabled` + `aria-disabled` konsisten |
| input | `<label for>` terasosiasi, `aria-invalid` + `aria-describedby` untuk error, `aria-required`, `aria-readonly` |
| disclosure | `aria-expanded`, `aria-controls` ↔ id panel, Enter/Space toggle, (opsional) ArrowUp/Down antar header |
| dialog (modal) | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (title) / `aria-label`, **focus trap** (`use:focusTrap` dari `src/lib/utils/a11y.ts`), focus return, Escape, backdrop close |
| dialog (non-modal) | `aria-expanded`/`aria-haspopup` pada trigger, Escape, click-outside (`use:clickOutside`), focus return |
| menu | trigger `aria-haspopup="menu"` + `aria-expanded`; container `role="menu"`; item `role="menuitem"` (+ `aria-disabled`); ArrowUp/Down + Home/End roving; Enter/Space activate; Escape close + return focus |
| combobox | input `role="combobox"` `aria-expanded` `aria-controls` `aria-activedescendant`; list `role="listbox"`; item `role="option"` `aria-selected`; ArrowUp/Down, Enter, Escape |
| tabs | `role="tablist"` / `role="tab"` / `role="tabpanel"`, `aria-selected`, `aria-controls`/`aria-labelledby`, roving tabindex, ArrowLeft/Right (Home/End) |
| tree | `role="tree"` / `treeitem` / `group`, `aria-expanded`, `aria-selected`, `aria-level`, ArrowUp/Down/Left/Right, Home/End, Enter |
| grid/table | `<caption>` atau `aria-label`, `aria-sort` pada sortable `th` (dengan `<button>` di dalam th — keyboard operable), `aria-busy` saat loading, row click harus keyboard-operable |
| progressbar | `role="progressbar"`, `aria-valuenow/min/max`, `aria-label`, mode indeterminate |
| switch/checkbox | `role="switch"`/`role="checkbox"`, `aria-checked`, label terasosiasi (`aria-labelledby`) |
| radiogroup | `role="radiogroup"` + `aria-labelledby`, native input dipertahankan |
| slider | native `<input type="range">`, `aria-label`/`<label>`, `aria-valuetext` opsional |
| live-region | Toast container `role="status"` (info/success) atau `alert` (error), `aria-live="polite"|"assertive"`, close button `aria-label`, pause on hover/focus |
| navigation | `<nav aria-label>`, breadcrumb pakai `<ol>/<li>`, `aria-current="page"` pada item aktif, separator `aria-hidden` |
| img | `alt` dari prop; fallback inisial punya `aria-label`; ikon dekoratif `aria-hidden="true"` |

## 4. State Matrix (wajib untuk komponen interaktif)

| State | Requirement |
|---|---|
| default | styling dasar via token |
| hover | `:hover` / `hover:` utility |
| active | `:active` / `active:` utility (atau `aria-pressed="true"` / `aria-selected="true"` untuk toggle) |
| focus | **focus-visible ring §3.1** |
| disabled | `disabled` attr + `disabled:` styling + `aria-disabled` bila non-native |
| loading | `aria-busy`, spinner (lucide `Loader2` / `LoaderCircle`), blok interaksi |
| error | `aria-invalid`, styling `var(--ca-danger)`, pesan via `aria-describedby` |
| success | styling `var(--ca-success)` (di mana bermakna) |

## 5. Token Compliance

### 5.1 Mapping hex → token (WAJIB, tanpa fallback hex literal)

| Hex ditemukan | Token pengganti |
|---|---|
| `#0A0A0C`, `#0E0E12` | `var(--ca-surface)` |
| `#121217`, `#111116`, `#141419`, `#14141A` | `var(--ca-surface-elevated)` |
| `#18181F`, `#181822`, `#1C1C24`, `#1F1F28`, `#22222B` | `var(--ca-surface-subtle)` |
| `#1E1E24`, `#1E1E26` (sebagai border) | `var(--ca-border)` |
| `#272732` | `var(--ca-border)` |
| `#EDEDED` | `var(--ca-text-primary)` |
| `#A1A1AA` | `var(--ca-text-secondary)` |
| `#71717A` | `var(--ca-text-muted)` |
| `var(--ca-brand, #3B82F6)` / `var(--ca-brand, #ef4444)` | `var(--ca-brand)` (hapus fallback literal) |
| `rgba(139,92,246,0.6)` (Avatar halo pro) | `var(--ca-brand-glow)` |
| Palettes (ColorPicker presets, ThemeSwitcher accents) | pindahkan data ke `src/lib/tokens/palettes.ts` (data, bukan styling) |

### 5.2 Aturan

1. **Tidak ada hex literal** di file `.svelte` (quality gate grep).
2. `var(--ca-*)` **tanpa fallback hex** — tokens selalu terdefinisi.
3. **Nilai dinamis diizinkan** via binding style untuk computed values saja:
   `style:--ca-progress="{pct}%"`, `style="width: {col.width}"`, `style="background-color: {swatch}"`.
   Dilarang warna literal di style.
4. Palettes/preset colors adalah **data** → `src/lib/tokens/palettes.ts`.
5. Jangan ubah nilai token yang sudah ada (kecuali menambah token baru yang perlu).
   `DESIGN.md` tidak boleh diubah.

## 6. Ikon (lucide-svelte)

- Semua ikon baru **wajib** dari `lucide-svelte` (sudah ada di package.json — akan
  dipindahkan ke `dependencies`, bukan dependency baru).
- `Icon.svelte` mempertahankan API `name` (27 nama lama + nama baru) dan delegasi ke
  lucide secara internal — kontrak CATerm tetap drop-in.
- Nama ikon konsisten: kebab-case dari nama lucide (`chevron-down` → `ChevronDown`).
- Sebelum pakai nama ikon, verifikasi ada di `lucide-svelte@^0.474`.
- Dilarang emoji sebagai ikon (TreeView `📁`/`📄` → lucide `Folder`/`File`).

## 7. Komponen Baru (Phase 5) — requirement umum

- Svelte 5 Runes (`$props`, `$state`, `$derived`, `$bindable`), TypeScript strict.
- Export tipe props dari komponen; export komponen + tipe di `src/lib/index.ts`
  (update index dilakukan terpusat — **jangan edit index.ts** dari task komponen).
- Label/teks default via props (komponen library tidak bergantung pada i18n app);
  app bisa meneruskan teks i18n melalui props.
- Semua requirement §3–§5 berlaku.
- Detail per komponen:
  - **DatePicker**: input + calendar popover (grid, roving tabindex, Arrow keys, PageUp/Down bulan, Home/End tahun), `value: string ($bindable, ISO)`, `min`/`max`, `disabled`, i18n bulan via props.
  - **DateTimePicker**: DatePicker + time input (HH:mm), `value: string ($bindable, ISO)`.
  - **DateRangePicker**: `start`/`end` ($bindable), hover-preview range, keyboard range selection.
  - **Calendar**: standalone grid kalender (role=grid), `value`, `month` ($bindable), event handlers.
  - **FileUpload**: drag-drop zone + `<input type="file">`, `multiple`, `accept`, progress bar per file, `files` ($bindable), aria-live errors.
  - **Stepper**: steps array, `current` ($bindable), orientasi horizontal/vertical, step status (complete/current/upcoming), `aria-current="step"`.
  - **NumberInput**: `value: number ($bindable)`, tombol ± (lucide Plus/Minus), `min`/`max`/`step`, `role="spinbutton"` (atau native input + aria), keyboard ArrowUp/Down.
  - **Carousel**: slides snippet, prev/next controls, dots indicator, `aria-roledescription="carousel"`, auto-scroll OFF by default, keyboard.
  - **Resizable**: drag handle `role="separator"` + `aria-valuenow`, Arrow keys resize, min/max size, pointer events (mouse+touch).
  - **MentionInput**: textarea + popup `role="listbox"` (mengikuti pola combobox §3.2), `items`, `trigger` (default `@`), `onmention`, keyboard lengkap.

## 8. Kompatibilitas CATerm (drop-in replacement)

Wajib: **tidak ada breaking change** pada 12 komponen yang dipakai CATerm
(Alert, Badge, Button, Card, Icon, Input, LanguageSwitcher, Modal, Sidebar,
SidebarItem, Table, ThemeSwitcher). Prop baru bersifat opsional (superset).

- **LanguageSwitcher**: tambah `compact?: boolean` (default `false`) — saat `true`
  render dual-button EN/ID segmented (perilaku CATerm); `locales?: {code,label}[]`
  (default en/id); `value?: string ($bindable)`; `onchange?`. Jika `value` tidak
  di-bind, gunakan store i18n internal (`src/lib/i18n`) sebagai fallback.
- **Badge**: `size` tetap terima `'xs' | 'sm'` (+ `'md'` baru).
- **Alert**: terima `'error'` (alias deprecated → `'danger'`).
- **Table**: `compact` tetap diterima (≡ `size="sm"`).
- **Avatar**: `halo: 'none'|'pro'|'brand'` tetap dipertahankan.
- **SidebarItem**: `badgeVariant` tetap dipertahankan.

## 9. Kualitas kode

- TypeScript strict: tanpa `any`, tanpa implicit any, semua event handler typed.
- Import **relatif** di dalam `src/lib` (jangan `$lib` — itu alias app).
- Tanpa inline style untuk warna statis (lihat §5.2).
- ESLint + svelte-check harus bersih. `pnpm run package` harus sukses.
