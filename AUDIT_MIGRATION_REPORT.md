# CAUI Audit & Migration Report — v1.1
**Author:** Cecep Saeful Azhar Hidayat, ST
**Date:** 2026-10-10
**Status:** PENDING APPROVAL

---

## Executive Summary

CAUI v1.1.0 sudah memiliki 56 komponen UI lengkap (termasuk 10 komponen baru). Namun ekosistem 6 aplikasi CA Family masih memiliki masalah integrasi serius:

1. **Hanya CATerm** yang mendeklarasikan dependency `@cecepazhar/caui` di package.json (tapi tetap pakai duplikat lokal)
2. **5 aplikasi lain** (caframework, castudio, cacash, cacalm, camark) sama sekali tidak terhubung ke CAUI
3. **CATerm punya 12 komponen UI duplikat** lokal dengan 163 referensi
4. **17 keyframes animasi** shared (ambient, halo, pulse, spin) ada di semua app TAPI tidak ada di CAUI
5. **CADS terminology** masih merajalela di 21 file source code across 6 apps
6. **cads/ repo** sudah divergen dari caui/ (bukan mirror identik lagi)

---

## Application Dependency Map

| App | Package Name | CAUI Dep | Local UI/ | CAUI Import | Svelte Count | CADS in Source |
|-----|-------------|----------|-----------|-------------|--------------|---------------|
| caframework | caf-frontend | ❌ NONE | 1 (Button) | ❌ NO | 45 | 1 hit |
| castudio | castudio-frontend | ❌ NONE | 0 | ❌ NO | 20 | 5 hits |
| cacash | cacash-frontend | ❌ NONE | 0 | ❌ NO | 29 | 8 hits |
| caterm | caterm-frontend | ✅ file:../../caui | 12 (duplikat) | ❌ NO* | 87 | 4 hits |
| cacalm | cacalm-frontend | ❌ NONE | 0 | ❌ NO | 3 | 3 hits |
| camark | caf-frontend | ❌ NONE | 0 | ❌ NO | 40 | 0 hits |

*CATerm declare dependency tapi tetap import dari `$lib/components/ui` lokal.

---

## CATerm Local UI Duplication (12 Components)

| Component | Refs in CATerm | CAUI Status | Action |
|-----------|---------------|-------------|--------|
| Button | 56 | ✅ Ada, lengkap | Migra ke CAUI |
| Badge | 40 | ✅ Ada, perlu variant | Migra + update variants |
| Card | 39 | ✅ Ada | Migra |
| Icon | 37 | ✅ Ada | Migra |
| Modal | 30 | ✅ Ada | Migra |
| Input | 18 | ✅ Ada, perlu a11y | Migra + fix a11y |
| Alert | 17 | ✅ Ada | Migra |
| Table | 15 | ✅ Ada | Migra |
| LanguageSwitcher | 10 | ✅ Ada | Migra |
| Sidebar | 3 | ✅ Ada | Migra |
| ThemeSwitcher | 2 | ✅ Ada | Migra |
| SidebarItem | 1 | ✅ Ada | Migra |

**Total duplikasi:** 163 refs di CATerm yang bisa dialihkan ke CAUI.

---

## Animation Keyframes Inventory (17 Shared)

**Found in:** caterm, caframework, camark (identical sets)
**Missing from:** CAUI, castudio, cacash, cacalm

| Keyframe | Purpose |
|----------|---------|
| ambient-aurora-wave | Background ambient glow |
| ambient-breathe | Slow breathing animation |
| ambient-pulse-slow | Slow pulse effect |
| ambient-rgb-cycle | RGB color cycling |
| card-glow-spin | Card border glow rotation |
| halo-pulse | Halo/ping pulse |
| halo-spin | Halo rotation |
| ping | Notification ping |
| pulse | Standard pulse |
| spin | Loading spinner |

**Recommendation:** Pindahkan ke `CAUI/src/lib/tokens/animations.css` atau buat komponen `Motion.svelte` untuk export semua keyframes.

---

## CADS → CAUI Migration (Source Code)

| File | Hit | Action |
|------|-----|--------|
| caframework/frontend/src/lib/stores/ambient.svelte.ts | 1 | Replace comment "CADS Standard" → "CAUI Standard" |
| caterm/frontend/src/lib/components/CommandPalette.svelte | 1 | Replace label "CADS v1.0" → "CAUI v1.1" |
| caterm/frontend/src/routes/design-system/+page.svelte | 2 | Update title/imports |
| caterm/frontend/src/lib/stores/ambient.svelte.ts | 1 | Replace comment |
| castudio/frontend/src/routes/+layout.svelte | 3 | Replace comments/badges |
| castudio/frontend/src/routes/+page.svelte | 1 | Replace text |
| castudio/frontend/src/lib/components/FloatingAiCard.svelte | 1 | Replace badge |
| cacash/frontend/src/routes/+layout.svelte | 5 | Replace comments |
| cacash/frontend/src/lib/components/FloatingAiCoach.svelte | 1 | Replace badge |
| cacash/frontend/src/lib/components/TitleBar.svelte | 1 | Replace badge |
| cacalm/frontend/tailwind.config.ts | 3 | Replace section header |

**Total:** 21 source code hits across 6 apps.

---

## CADS Templates in CATerm (Not in CAUI)

```
caterm/frontend/src/lib/components/cads/templates/
├── AiChatPanel.svelte (7.8KB)
├── DashboardView.svelte (8.2KB)
├── LoginScreen.svelte (5.8KB)
├── SplashScreen.svelte (5.2KB)
└── index.ts (258B)
```

**Action:** Copy these to `caui/src/lib/components/templates/` then update imports in CATerm.

---

## CAUI vs CADS Divergence

**caui/** version: **v1.1.0** (15 commits, active development)
**cads/** version: **v1.0.0** (13 commits, stale)

They are NO LONGER identical. CAUI has advanced beyond CADS.

---

## Migration Priority Matrix

### Phase 1 — Foundation (Week 1)
1. **CAUI Animation Module** — Export 17 keyframes to `src/lib/tokens/animations.css`
2. **CAUI A11y Fix** — Add aria-* to ~30 components without a11y
3. **CAUI Variant Standardization** — Add variant/size props to all 56 components
4. **CAUI Test Suite** — Target 80%+ coverage

### Phase 2 — CATerm Migration (Week 2)
1. Copy CADS templates from CATerm to CAUI
2. Delete `caterm/frontend/src/lib/components/ui/` (12 files)
3. Update all imports: `$lib/components/ui` → `@cecepazhar/caui`
4. Run smoke test

### Phase 3 — Ecosystem Migration (Week 3-4)
1. Add `@cecepazhar/caui` dep to: caframework, castudio, cacash, cacalm, camark
2. Replace local UI components → CAUI imports
3. Remove local UI directories

### Phase 4 — CADS Cleanup (Week 5)
1. Replace all CADS references → CAUI in source code (21 hits)
2. Archive `cads/` repo (deprecate)
3. Update all architecture docs

---

## Open Questions

1. Apakah `cads/` repo akan di-archive atau dihapus total?
2. Apakah animasi keyframes akan jadi bagian dari CAUI tokens atau komponen terpisah?
3. Prioritas migrasi: CATerm dulu atau semua app sekaligus?
4. Apakah ada komponen CAUI yang TIDAK ingin dipakai di app tertentu (kustomisasi)?

---

*Report generated by Hermes Agent — 2026-10-10*
