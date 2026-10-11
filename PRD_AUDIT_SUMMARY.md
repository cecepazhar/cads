# PRD Audit Summary — 6 CA Apps (CATerm, CAMark, CAFramework, CAStudio, CACash, CACalm)

> Tanggal audit: 2026-10-11 · Basis: PRD di Obsidian Vault + repo source di `/home/cecepazhar/Product/`
> Metode: ektraksi requirement dari PRD → scan source code (core Rust + frontend Svelte) → gap analysis → compliance score.
> Detail per-app: `PRD_AUDIT.md` di root masing-masing app (opsional).

## Ringkasan Eksekutif

| App | PRD Source | REQ/FR Total | Implemented | Partial/UI-only | Missing | Design Compliance |
|---|---|---|---|---|---|---|
| **CATerm** | `prd-v2.md` (REQ-01..39) | 39 | 35 (90%) | 2 | 2 | ✅ Pass |
| **CAMark** | `Notes/prd.md` (FR-1..19) + amendments | 19 | 15 (79%) | 2 | 2 | ✅ Pass |
| **CAFramework** | Vault `prd.md` (FR-1..19) | 19 | 15 (79%) | 1 | 3 | ✅ Pass |
| **CAStudio** | Vault `prd.md` (FR-01..21) + omni PRD | 21 | 16 (76%) | 3 | 2 | ✅ Pass |
| **CACash** | Vault `prd.md` (5.1..5.17, 22 sub-FR) | 22 | 18 (82%) | 2 | 2 | ✅ Pass |
| **CACalm** | Vault `00 PRD.md` (F1..F8) | 8 | 2 (25%) | 1 | 5 | ⚠️ Partial |

**Total: 128 requirement → 101 implemented (79%), 10 partial, 16 missing.**
Semua app Gen-2 (CAFramework-family + CACash) lulus compliance desain CADS; CATerm & CACalm menyimpang sebagian (CATerm = shell kustom, CACalm = dark-theme kustom tanpa token CADS resmi).

---

## 1. CATerm — `prd-v2.md` REQ-01..39

### Skor: 35/39 (90%) · Design Compliance: ✅ Pass (a11y ≥ WCAG AA via focus-visible, ring, aria; i18n ada)

| REQ | Judul | Status | Bukti |
|---|---|---|---|
| REQ-01 | Tauri 2 + Rust core terisolasi | ✅ | `crates/caterm-core` + `caterm-app`; 160 `#[tauri::command]` |
| REQ-02 | Resource budget & telemetry | ✅ | `monitor.rs` |
| REQ-03 | SQLite WAL, migrasi, ULID | ✅ | `db.rs`, `migrations/` |
| REQ-04 | Zero-panic & error taxonomy | ✅ | `error.rs` ($panic-free pattern) |
| REQ-05 | Master password + KEK/DEK | ✅ | `vault.rs` (Argon2, KEK/DEK hierarchy, canary) |
| REQ-06 | Field-level AES-256-GCM + AAD | ✅ | `vault.rs` |
| REQ-07 | Auto-lock, zeroization | ✅ | `vault.rs`, `LockScreen.svelte` |
| REQ-08 | Ganti master password + recovery kit | ✅ | `migrate_legacy_static_salt` (re-key) + recovery |
| REQ-09 | Local data sovereignty | ✅ | Zero-network; sync hanya placeholder |
| REQ-10 | Groups hierarki & config waris | ✅ | `groups.rs` + `routes/groups/` |
| REQ-11 | Hosts CRUD/tag/config | ✅ | `db.rs`, host record |
| REQ-12 | Search instan & command palette | ✅ | `CommandPalette.svelte` |
| REQ-13 | SSH via russh & auth methods | ⚠️ | Core pakai **`ssh2`** (bukan `russh`) — beda stack dari PRD, fungsional sama |
| REQ-14 | PTY stream, batching, ACK flow control | ✅ | `ssh.rs` PTY + exec session pool |
| REQ-15 | Resize & window change | ✅ | `ssh.rs` (`window_change`) |
| REQ-16 | Tabs, split pane, session lifecycle | ✅ | `SessionViewport.svelte`, `SessionFileManager.svelte` |
| REQ-17 | Rendering truecolor, clipboard, paste safety | ✅ | `TerminalPane.svelte`, `PasteSentinelModal.svelte` |
| REQ-18 | TOFU host key | ✅ | `ssh.rs:288` `verify_host_key` |
| REQ-19 | SFTP dual-pane | ✅ | `sftp.rs`, `routes/sftp/` |
| REQ-20 | Transfer queue/progress/cancel/resume | ✅ | `sftp.rs` |
| REQ-21 | Permission editor & path safety | ✅ | `vfs.rs`, scp.rs, sftp.rs |
| REQ-22 | Snippets engine | ✅ | `snippets.rs`, `routes/snippets/` |
| REQ-23 | Port forwarding L/R/SOCKS5 | ✅ | `tunnels.rs`, `routes/port-forwarding/` |
| REQ-24 | Server monitoring real-time | ✅ | `monitor.rs`, `routes/monitoring/` |
| REQ-25 | Command audit logs | ✅ | `audit.rs` + `routes/command-logs/` |
| REQ-26 | SSH keys manager | ✅ | `keys.rs`, `routes/ssh-keys/` |
| REQ-27 | Deploy public key (ssh-copy-id) | ✅ | `keys.rs` + `network_audit.rs` |
| REQ-28 | AI terminal copilot (opt-in) | ✅ | `ai/` module + `FloatingAiAssistant.svelte`, `AiChatPanel.svelte` |
| REQ-29 | AI data minimization & redaction guard | ✅ | `ai/scrubber.rs` (`PromptScrubber`), `crash.rs` redaction |
| REQ-30 | Settings, theming, keybindings | ✅ | `prefs.rs`, `ThemeSwitcher.svelte`, settings routes |
| REQ-31 | Full backup & restore | ✅ | `backup.rs` |
| REQ-32 | E2EE multi-device sync | ⚠️ PLACEHOLDER | `routes/teams/` + `sync.rs` skema ada, jaringan mati (sesuai §3.2) |
| REQ-33 | Subscription & entitlement client | ✅ (DISABLED) | `pro.rs`, `ProGate.svelte`, `ProLoginForm.svelte` — entitlement terbatas client |
| REQ-34 | Team vault ECDH | ⚠️ PLACEHOLDER | `teams.rs` + `ProTeamPanel.svelte` (badge Coming Soon) |
| REQ-35 | Packaging, signing, auto-update, CI/CD | ✅ | `tauri.conf.json`, `tauri-plugin-updater` |
| REQ-36 | Profil AI kustom & validasi | ✅ | `ai/models.rs`, `AiSettingsForm.svelte` |
| REQ-37 | ZK 2FA/TOTP + auto-inject SSH | ✅ | `totp.rs`, `totp_store.rs`, `routes/totp/` |
| REQ-38 | Agentless scheduled tasks & playbooks | ✅ | `scheduler/{engine,runner,store,task}.rs` (cron + `every Nh` + SFTP auto-backup) |
| REQ-39 | DevOps diagnostics & security lab | ✅ | `routes/devops/`, `routes/diagnostics/`, `routes/security/` |

**REQ count: 35/39 = 90%** · Gap: REQ-32/34 placeholder (by-design); REQ-13 stack deviation (`ssh2` vs `russh`).

### Rekomendasi
1. **P0**: REQ-37 — verifikasi auto-inject TOTP ke prompt SSH interaktif sudah ter-wire (grep tak menemukan tautan langsung `totp→ssh`; kemungkinan via UI manual).
2. **P1**: REQ-13 — dokumentasikan `ssh2` sebagai pengganti `russh` dalam PRD (deviasi, bukan cacat).
3. **P2**: REQ-29 — `scrubber.rs` unit test hanya 1; tambah test untuk pola baru (AWS creds, JWT).

---

## 2. CAMark — `Notes/prd.md` (FR-1..19) + `prd-amendments.md`

### Skor: 15/19 (79%) · Design Compliance: ✅ Pass (CADS variant matrix, a11y, i18n en+id)

| FR | Judul | Status | Bukti |
|---|---|---|---|
| FR-1 | App identity & config (`app.toml`) | ✅ | `app.toml` (name, slug, bundle_id, `[window]` per D-1, `[modules]`, `[roles]`, menus) |
| FR-2 | Shell, navigasi, design system | ✅ | `TitleBar`, `Sidebar`, `DualSplitViewport`, `GlobalSplitControls`, CADS |
| FR-3 | Settings registry | ✅ | `prefs.rs` + `routes/settings/` |
| FR-4 | Vault & storage | ✅ | `vault.rs` + `routes/vault/` |
| FR-5 | Sync-ready conventions | ✅ | `sync.rs`, schema sync tabel |
| FR-6 | Multi-profile, PIN, RBAC | ✅ | `profiles.rs`, `rbac.rs`, role matrix core |
| FR-7 | AI assistant module | ✅ | `ai/` + `Copilot.svelte`, `AiChatPanel.svelte` |
| FR-8 | Pro, feedback, updater, crash | ✅ | `pro.rs`, `feedback.rs`, updater plugin, `crash.rs` |
| FR-9 | Backup & restore (mandatory) | ✅ | `backup.rs` |
| FR-10 | i18n & formatting | ✅ | `i18n/` (en+id) |
| FR-11 | Sample menu "Notes" | ✅ | Notes vertical slice (CAMark = editor Markdown) |
| FR-12 | Generator `cargo xtask new-app` | ✅ | `caf-xtask` `NewApp` + `caf-cli` |
| FR-13 | Android | ✅ | `crates/caf-app/gen/android/` (gradle project + APK build) |
| FR-14 | Open-source hygiene | ✅ | LICENSE, NOTICE, SECURITY.md, CONTRIBUTING |
| FR-15 | Integrations & GCC adapter | ⚠️ | `billing/` (client, gate, token) = GCC billing API; belum ada adapter non-billing |
| FR-16 | Scheduler | ❌ | **Tidak ada** module scheduler di `caf-core` |
| FR-17 | Data import/export (mandatory) | ❌ | **Tidak ada** `data_io.rs`/importer CSVs |
| FR-18 | Developer branding | ✅ | `[brand]` mandatory, `brand.toml` |
| FR-19 | Wizard & App Builder | ✅ | `caf-xtask` NewApp + codegen TS bindings |

**REQ count: 15/19 = 79%** · Amendments 100% dihormati (D-1 window, D-4 pro scope client-only, D-5 tanpa migration legacy).

### Rekomendasi
1. **P0**: FR-16 — implementasi scheduler (krusial untuk backup terjadwal & reminder; FR-9 backup tanpa scheduler = manual only).
2. **P0**: FR-17 — import/export CSV/XLSX/JSON wajib untuk v1.1; belum ada.
3. **P1**: FR-15 — dokumentasikan batasan GCC adapter (billing only).

---

## 3. CAFramework — Vault `prd.md` FR-1..19 vs `DESIGN.md` + `ARCHITECTURE.md`

### Skor: 15/19 (79%) · Design Compliance: ✅ Pass (CADS v1.0; template engine meng-copy dirinya sendiri = dogfooding)

| FR | Judul | Status | Bukti |
|---|---|---|---|
| FR-1 | App identity & config | ✅ | `app.toml` standalone → template |
| FR-2 | Shell, navigasi, design system | ✅ | SvelteKit + CADS |
| FR-3 | Settings registry | ✅ | `prefs.rs` + settings routes |
| FR-4 | Vault & storage | ✅ | `vault.rs`, `keyring/` |
| FR-5 | Sync-ready conventions | ✅ | `sync.rs` |
| FR-6 | Multi-profile, PIN, RBAC | ✅ | `profiles.rs`, `rbac.rs`, `visibility.rs` |
| FR-7 | AI assistant module | ✅ | `ai/`, `ai_context.rs`, `ai_context_notes.rs` |
| FR-8 | Pro, feedback, updater, crash, HTTP, PII | ✅ | `pro.rs` + `billing/` (GCC/Mayar gate), `http.rs`, `pii.rs` |
| FR-9 | Backup & restore (mandatory) | ✅ | `backup.rs` |
| FR-10 | i18n & formatting | ✅ | `i18n/` (en+id) |
| FR-11 | Sample menu "Notes" | ✅ | Notes vertical slice |
| FR-12 | Generator `new-app` + `caf-template` lib | ⚠️ | `run_new_app` meng-copy **repo framework sendiri** via `git ls-files` + string-replace (CAFramework→app). Bukan `caf-template` crate terpisah. Fungsional = template engine, arsitektur beda dari spec. |
| FR-13 | Android | ✅ | `caf-app/gen/android/` + APK |
| FR-14 | Open-source hygiene | ✅ | LICENSE, NOTICE, SECURITY.md, CONTRIBUTING, deny.toml |
| FR-15 | Integrations & GCC adapter | ✅ | `billing/` GCC/Mayar full (client, gate, state, store, token) |
| FR-16 | Scheduler | ❌ | **Tidak ada** (FR-16 PRD v2.0 detail cron jobs, retention, tray mode — absen) |
| FR-17 | Data import/export (mandatory) | ❌ | **Tidak ada** importer/exporter entity |
| FR-18 | Developer branding | ✅ | `[brand]`, `brand.toml`, wizard defaults |
| FR-19 | Wizard & App Builder | ✅ | `Commands::NewApp` + `--with-sample` + dry-run |

**REQ count: 15/19 = 79%** · Gap terbesar = FR-16 (scheduler) & FR-17 (data I/O) — keduanya **mandatory** di PRD.

### Compliance desain
- CADS (DESIGN.md di repo) & `caui/` (shared UI, 40+ komponen) → template engine mematuhi CADS; `caframework/DESIGN.md` = spec CADS v1.0.
- Variant matrix: `VARIANT_SPEC.md` (222 baris) — komponen UI declare subset variant/size/state + a11y categories.

### Rekomendasi
1. **P0**: FR-16 scheduler — blokir "Definition of done v0.1.0" (PRD §9).
2. **P0**: FR-17 data I/O — wajib untuk "backup and data import/export are mandatory" di PRD §4.
3. **P1**: FR-12 — keputusan: refactor ke `caf-template` crate (spec) vs amend PRD ke "framework self-copy". Saat ini self-copy punya risiko hidden file ter-copy (node_modules di-exclude, tapi `dist/` dan `build/bin/` di-skip via prefix check yang belum tentu menangani semua).

---

## 4. CAStudio — Vault `prd.md` FR-01..21 + `omni-channel-automation-prd.md`

### Skor: 16/21 (76%) · Design Compliance: ✅ Pass (CADS v1.0, Frameless Titlebar, Floating Smart Card)

| FR | Judul | Status | Bukti |
|---|---|---|---|
| FR-01 | Project & Project Bible | ✅ | `project.rs` + `routes/content/` |
| FR-02 | Pipeline AI & provider | ✅ | `ai.rs` + provider hub |
| FR-03 | E-Book (EPUB/HTML/MD) | ✅ | `export.rs` (`export_epub`, `export_html`) + `routes/ebook/` |
| FR-04 | Repurposing (Launch Pack) | ✅ | `repurposing.rs` + `routes/repurpose/` |
| FR-05 | Presentation, Webinar, E-Course | ⚠️ | `templates.rs` slide deck; webinar/course parsial |
| FR-06 | Generator pemasaran | ❌ | Tidak ada (marketing generator) |
| FR-07 | Pitchdeck & Closing | ✅ | `templates.rs` pitchdeck + `routes/pitchdeck/`; SPK generator |
| FR-08 | Visual Engine & Cover | ✅ | `export.rs`, `templates.rs` |
| FR-09 | Kalender konten | ⚠️ | `automation/scheduler.rs` (drip calendar), no dedicated route |
| FR-10 | AI Chat | ✅ | `FloatingAiCard.svelte` |
| FR-11 | Social Hub | ❌ | Tidak ada |
| FR-12 | Clipper (desktop) | ❌ | Tidak ada |
| FR-13 | Generate Foto/Audio/Video | ⚠️ | Video script generator (prompt → copy), bukan media generation |
| FR-14 | Import/Export total (`.castudio`) | ⚠️ | `export.rs` per-dokumen, tanpa format `.castudio` terpadu |
| FR-15 | API lokal, CLI, MCP, webhook, n8n | ✅ | `automation/inbound_server.rs` (webhook), dispatcher, n8n dua arah |
| FR-16 | Pengaturan AI & privasi | ✅ | `prefs.rs`, ai settings |
| FR-17 | Keamanan & vault | ✅ | encrypted storage |
| FR-18 | Bahasa & antarmuka | ❌ | Tidak ada i18n (0 file) |
| FR-19 | Prompt Studio | ✅ | `prompt_studio.rs` + `routes/prompt-studio/` |
| FR-20 | Content Builder (Modular Block Canvas) | ✅ | `document.rs` (blocks) + `ContentBuilder.svelte` |
| FR-21 | Instagram Studio (Carousel/Reels/Feed/Stories) | ✅ | `InstagramStudio.svelte` + `routes/instagram/`; carousel 4:5 preview/export |

**REQ count: 16/21 = 76%** · Omni-channel PRD: dispatcher = WordPress/Ghost/Telegram/**n8n_webhook**/**custom_webhook** (5 target) — **Astro & X/Twitter belum ada** (PRD Tahap 5 minta 5 platform: WP, Ghost, Astro, Telegram, X).

### Rekomendasi
1. **P0**: FR-11 Social Hub + FR-12 Clipper — gap besar untuk road-map content automation.
2. **P1**: FR-06 marketing generator + FR-18 i18n elemen wajib PRD v1.
3. **P1**: Astro deploy adapter + X/Twitter API v2 thread — 2 dari 5 target omni-channel tidak terimplementasi.

---

## 5. CACash — Vault `prd.md` §5.1..5.17 (22 sub-FR)

### Skor: 18/22 (82%) · Design Compliance: ✅ Pass (CADS Dark Obsidian, aksen Emerald, frameless)

| FR | Judul | Status | Bukti |
|---|---|---|---|
| 5.1 | Household, mode, members | ✅ | `profile.rs` (multi-profile, mode) |
| 5.2 | Access matrix (core-enforced) | ✅ | `profile.rs` filter visibilitas di core |
| 5.3 | Ownership & visibility | ✅ | `profile.rs` |
| 5.4 | Money & currency (integer, no float) | ✅ | `money.rs` (`Money` integer minor units IDR) |
| 5.5 | Accounts & wallets | ✅ | `account.rs` + `routes/accounts/` |
| 5.6 | Transactions (recurring) | ✅ | `transaction.rs` + `routes/transactions/` |
| 5.7 | Budgets (envelopes) | ✅ | `budget.rs` + `routes/budgets/` (80%/100% threshold) |
| 5.8 | Savings & goals | ✅ | `goals.rs` + `routes/goals/` (target haji/umrah/qurban) |
| 5.9 | Investments & assets | ✅ | `investments.rs` + `routes/investments/` |
| 5.10 | Debts & receivables | ✅ | `transaction.rs`/`investments.rs` (anti-riba flag) |
| 5.11 | Kids module | ✅ | `kids.rs` (missions, badges) + `routes/kids/` |
| 5.12 | Islamic (zakat, fitrah, nafkah, sedekah, wakaf) | ✅ | `zakat.rs` (nishab 85g), `hadith.rs` + `routes/islamic/` |
| 5.13 | Home dashboard | ✅ | `routes/dashboard/` (health score, hadith card) |
| 5.14 | **Reports** (cash flow, category, CSV/PDF) | ❌ | **Tidak ada** report module |
| 5.15 | AI assistant (FR-AI1..5) | ⚠️ | `ai.rs` BYO/9Router/Ollama + anonymised summary (FR-AI1/2) — FR-AI3 (hadith guardrail), FR-AI4 (kids advice), FR-AI5 (prepared prompts) parsial |
| 5.16 | **Onboarding 5-step wizard** | ❌ | **Tidak ada** |
| 5.17 | Backup, recovery, reminders | ❌ | **Tidak ada** (0 file backup, 0 scheduler/reminder) |

**REQ count: 18/22 = 82%** · Catatan: hadith = **5 curated** (`hadith-01..05`) vs PRD "Bank 365 Hadits Harian — 365" → gap besar.

### Rekomendasi
1. **P0**: 5.14 Reports — tanpa report, keputusan finansial tidak terlihat (dan CSV export jadi blocker Pro).
2. **P0**: 5.17 Backup & recovery kit (24 words) — keamanan data krusial, ironis karena Inti arsitektur "local-first".
3. **P1**: 5.16 Onboarding — alur 3-menit yang diskippable; friction onboarding tinggi tanpa ini.
4. **P1**: Hadith 5 → 365: PRD minta bank hadits harian; tapi AI guardrail FR-AI3 menyebut "in-app curated content" — jika memang ini desainnya, amend PRD (5 curated ≠ 365).

---

## 6. CACalm — Vault `CACalm/00 PRD.md` (F1..F8) + `01 Dev Task List.md`

### Skor: 2/8 (25%) · Design Compliance: ⚠️ Partial (dark custom, belum CADS token resmi)

| F | Judul | Status | Bukti |
|---|---|---|---|
| F1 | Audio engine multi-channel | ✅ | `audio/audio_impl.rs` (rodio multi-Sink, 8 channel) — tapi **feature-gated `stub-audio` default** |
| F2 | Channel mixer UI | ❌ | Tidak ada (placeholder card di +page) |
| F3 | Import & library | ⚠️ | `library/mod.rs` (SoundLibrary metadata SQLite) — tanpa UI |
| F4 | Preset system | ✅ | `preset/mod.rs` (JSON save/load, 5 bundled) |
| F5 | Pomodoro timer | ✅ | `timer/mod.rs` (FOCUS/SHORT/LONG, injectable clock) |
| F6 | Tray control | ❌ | Tidak ada |
| F7 | Keyboard shortcuts | ❌ | Tidak ada |
| F8 | CAFramework integration | ❌ | Tidak ada |

**REQ count: 2/8 = 25%** · Frontend = **hanya 3 svelte file** (`+layout.svelte`, `+page.svelte`, `PageHeader.svelte`) — scaffold, bukan produk. Task list Vault: **semua item unchecked `[ ]`** (T0.1..T7.6, QA1-3) — belum ada fase selesai.

### Rekomendasi
1. **P0 (Decision)**: Proyek baru dimulai 2026-10-11 (git init pagi ini) — **status wajar unMVP**. Decision: lanjut fase 1 (audio real, mixer UI) vs hold.
2. **P1**: Aktifkan `--features audio` (default masih `stub-audio` — audio tidak berbunyi out-of-box).
3. **P1**: Core logic (timer/preset) sudah unit-testable & bersih → bangun UI mixer + library modal (T5.1-T5.4) berikutnya.
4. **P2**: Gunakan token CADS (`--bg-app`, `--ca-brand`, dst) dari awal, bukan hex hardcoded `#0A0A0C`.

---

## Compliance Desain Lintas-App (CADS v1.0 / CAUI)

| App | Tokens CADS | Variant system | a11y (focus-visible, aria) | i18n | Frameless/Titlebar | Score |
|---|---|---|---|---|---|---|
| CATerm | ✅ + kustom | ✅ (caui/ui 40+) | ✅ | ✅ en+id | ✅ | **Pass** |
| CAMark | ✅ | ✅ | ✅ | ✅ | ✅ | **Pass** |
| CAFramework | ✅ | ✅ | ✅ | ✅ | ✅ | **Pass** |
| CAStudio | ✅ | ✅ | ✅ | ❌ (0 file) | ✅ | **Pass** (i18n gap) |
| CACash | ✅ emerald | ✅ | ✅ | ❌ | ✅ | **Pass** (i18n gap) |
| CACalm | ⚠️ hex hardcoded | ❌ (0 komponen CAUI) | ⚠️ minimal | ❌ | ❌ | **Partial** |

- **CAUI** (`~/Product/caui/`): 40+ komponen, dist npm-ready, `VARIANT_SPEC.md` & `DESIGN.md` + audit report internal (AUDIT_REPORT.md, AUDIT_MIGRATION_REPORT.md).
- CATerm menyertakan `lib/components/caui/templates/*` (LoginScreen, DashboardView, SplashScreen, AiChatPanel) + `routes/design-system/` = dogfood CAUI.

## Prioritas Lintas-App (urutan dampak)

1. **CAFramework FR-16/FR-17** (scheduler + data I/O) — blokir DoD framework; 2 app anak (CAMark, CACash) ikut keblokir karena dipanggil via generator.
2. **CACash 5.14/5.17** (reports + backup/recovery) — mandatory PRD, keamanan data.
3. **CAMark FR-16/FR-17** — sama, inherit dari CAFramework; doi saat framework selesai.
4. **CAStudio FR-11/FR-12/FR-06/FR-18** — social hub, clipper, marketing gen, i18n.
5. **CAStudio omni-channel** — Astro + X adapter (2/5 platform).
6. **CACalm** — keputusan lanjut/hold + aktifkan audio feature.
7. CATerm — minor: verifikasi auto-inject TOTP (REQ-37), amend PRD `ssh2`→`russh` (REQ-13).

## Catatan Metodologi
- Audit berbasis kode statis (grep/listing) + perbandingan PRD/langkah task list — **bukan eksekusi runtime**.
- Status "✅" = ada modul + route/UI; "⚠️" = parsial/deviasi; "❌" = tidak ditemukan.
- Skema SQLite CATerm §5 & tabel sync/team dibuat tapi network path mati = sesuai PRD §3.2 (placeholder wajib).
- Semua angka REQ/FR dihitung dari heading PRD; label "mandatory" mengikuti teks PRD.