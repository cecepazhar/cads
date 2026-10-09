export interface AppThemeInfo {
  id: string;
  name: string;
  role: string;
  color: string;
  glow: string;
  characteristics: string;
}

export const CA_APPS_THEMES: AppThemeInfo[] = [
  {
    id: 'caterm',
    name: 'CATerm',
    role: 'Sovereign Terminal & SRE Workspace',
    color: '#EF4444',
    glow: 'rgba(239, 68, 68, 0.15)',
    characteristics: 'Kecepatan, peringatan kritis, performa Rust murni.'
  },
  {
    id: 'camark',
    name: 'CAMark',
    role: 'Markdown Studio & Knowledge Vault',
    color: '#06B6D4',
    glow: 'rgba(6, 182, 212, 0.15)',
    characteristics: 'Kejernihan ide, dokumentasi bersih, LaTeX.'
  },
  {
    id: 'castudio',
    name: 'CAStudio',
    role: 'Content, Media & Pitch Deck Engine',
    color: '#8B5CF6',
    glow: 'rgba(139, 92, 246, 0.15)',
    characteristics: 'Kreativitas, studio grafis, otomasi konten.'
  },
  {
    id: 'cacash',
    name: 'CACash',
    role: 'Personal & Family Zero-Knowledge Finance',
    color: '#10B981',
    glow: 'rgba(16, 185, 129, 0.15)',
    characteristics: 'Pertumbuhan aset, zakat/waris Islami, investasi.'
  },
  {
    id: 'catama',
    name: 'CATama',
    role: 'Autonomous Virtual Pet & Sovereign Arena',
    color: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.15)',
    characteristics: 'Karakter gaming retro pixel, dev keystrokes.'
  },
  {
    id: 'fathstore',
    name: 'FathStore',
    role: 'Multi-Tenant POS & Cloud Webstore',
    color: '#3B82F6',
    glow: 'rgba(59, 130, 246, 0.15)',
    characteristics: 'Reliabilitas ritel, transaksi instan, multi-cabang.'
  },
  {
    id: 'cabench',
    name: 'CABench',
    role: 'Hardware & Security Benchmark Lab',
    color: '#EC4899',
    glow: 'rgba(236, 72, 153, 0.15)',
    characteristics: 'Stress test hardware, profiling latency mikrodetik.'
  },
  {
    id: 'catable',
    name: 'CATable',
    role: 'Zero-Knowledge Database Manager (SQL)',
    color: '#6366F1',
    glow: 'rgba(99, 102, 241, 0.15)',
    characteristics: 'Arsitektur data tabular, no-tab limits.'
  },
  {
    id: 'capost',
    name: 'CAPost',
    role: 'API Testing Suite & Mock Server Relay',
    color: '#F97316',
    glow: 'rgba(249, 115, 22, 0.15)',
    characteristics: 'Protokol jaringan gRPC/REST, payload validator.'
  },
  {
    id: 'cabook',
    name: 'CABook',
    role: 'Interactive E-Learning & Digital Books',
    color: '#14B8A6',
    glow: 'rgba(20, 184, 166, 0.15)',
    characteristics: 'Bacaan interaktif, modul riset, studi AI.'
  },
  {
    id: 'caproduct',
    name: 'CAProduct',
    role: 'Founder Dashboard & Metric Analytics',
    color: '#84CC16',
    glow: 'rgba(132, 204, 22, 0.15)',
    characteristics: 'MRR tracking, konversi corong, target 1 Miliar.'
  },
  {
    id: 'cavision',
    name: 'CAVision',
    role: 'AI Medical Image & Diagnostic Suite',
    color: '#0EA5E9',
    glow: 'rgba(14, 165, 233, 0.15)',
    characteristics: 'Citra medis resolusi tinggi, kepatuhan HIPAA/ISO.'
  },
  {
    id: 'caentech',
    name: 'CAEntech',
    role: 'Energy & IoT Telemetry Monitor',
    color: '#D97706',
    glow: 'rgba(217, 119, 6, 0.15)',
    characteristics: 'Sensor IoT realtime, konsumsi daya hardware.'
  },
  {
    id: 'caigent',
    name: 'CAIgent',
    role: 'Autonomous Agent Orchestration Canvas',
    color: '#A855F7',
    glow: 'rgba(168, 85, 247, 0.15)',
    characteristics: 'Subagent tree, DAG workflow, LLM routing.'
  },
  {
    id: 'gcchub',
    name: 'GCC Hub',
    role: 'Global Command Center (Billing & Auth)',
    color: '#FFFFFF',
    glow: 'rgba(255, 255, 255, 0.2)',
    characteristics: 'Titik pusat kedaulatan, lisensi Ed25519.'
  },
  {
    id: 'caframework',
    name: 'CAFramework',
    role: 'Base Core Template Engine',
    color: '#64748B',
    glow: 'rgba(100, 116, 139, 0.15)',
    characteristics: 'Fondasi arsitektur bersama.'
  },
  {
    id: 'caui',
    name: 'CAUI',
    role: 'Design System, Iconography & Component Library',
    color: '#E2E8F0',
    glow: 'rgba(226, 232, 240, 0.15)',
    characteristics: 'Standar baku komponen lintas platform.'
  }
];
