<script lang="ts">
  import {
    Home, Terminal, Code, Folder, File, FolderOpen, Search, Settings,
    User, Users, Bell, Mail, Calendar, MessageSquare, LayoutGrid, Menu,
    Star, Heart, Bookmark, Zap, Shield, Database, Globe, Camera, Image,
    Music, Clock, MapPin, Navigation, Send, List, Briefcase, Package,
    ShoppingBag, CreditCard, TrendingUp, ChartColumn, Activity,
    Plus, MoreHorizontal, Wifi, Circle, Lock, LogOut, Info, TriangleAlert,
    Moon, Sun, Upload, Download, Trash, Pencil, Filter
  } from 'lucide-svelte';
  import type { ComponentVariant, ComponentSize, BaseComponentProps } from './types';

  export type MobileNavVariant = Extract<ComponentVariant, 'primary' | 'ghost'>;
  export type MobileNavSize = Extract<ComponentSize, 'sm' | 'md'>;

  type LucideIcon = typeof Home;

  export interface MobileNavItem {
    /** Display label for the item. */
    label: string;
    /** lucide icon name (kebab-case). */
    icon: string;
    /** Link target. When set, renders `<a>`; otherwise renders `<button>`. */
    href?: string;
    /** Badge indicator: `true` shows an animated ping dot; a number shows a count pill. */
    badge?: boolean | number;
    /** Override active state (bypasses `activeItem` matching). */
    active?: boolean;
  }

  export interface MobileBottomNavProps extends BaseComponentProps {
    /** Navigation items (typically 3-5). */
    items: MobileNavItem[];
    /** Label or index (as string) of the active item. Ignored when `item.active` is set. */
    activeItem?: string;
    /** Callback fired when any item is clicked. */
    onItemClick?: (item: MobileNavItem, index: number) => void;
    /** Show text labels beneath icons. @default true */
    showLabels?: boolean;
    /** Visual variant for active-item styling. @default 'primary' */
    variant?: MobileNavVariant;
    /** Size controlling bar height and icon scale. @default 'md' */
    size?: MobileNavSize;
    /** `<nav>` element's `aria-label`. @default 'Primary' */
    navLabel?: string;
  }

  let {
    items,
    activeItem,
    onItemClick,
    showLabels = true,
    variant = 'primary',
    size = 'md',
    navLabel = 'Primary',
    class: customClass = '',
  }: MobileBottomNavProps = $props();

  function isActive(item: MobileNavItem, index: number): boolean {
    if (typeof item.active === 'boolean') return item.active;
    if (activeItem === undefined) return false;
    return activeItem === item.label || activeItem === String(index);
  }

  function resolveIcon(name: string): LucideIcon {
    return ICON_MAP[name] ?? Circle;
  }

  const sizeCfg = $derived.by(() => {
    switch (size) {
      case 'sm': return { bar: 'h-12', icon: 18, label: 'text-[10px]' };
      case 'md': return { bar: 'h-14', icon: 20, label: 'text-[10px]' };
    }
  });

  const activeClasses: Record<MobileNavVariant, string> = {
    primary: 'text-[var(--ca-brand)] font-semibold',
    ghost: 'text-[var(--ca-text-primary)] font-semibold bg-[var(--ca-surface-subtle)] rounded-lg',
  };

  const inactiveClass = 'text-[var(--ca-text-secondary)] hover:text-[var(--ca-text-primary)]';

  const ICON_MAP: Record<string, LucideIcon> = {
    'home': Home,
    'terminal': Terminal,
    'code': Code,
    'folder': Folder,
    'file': File,
    'files': File,
    'folder-open': FolderOpen,
    'search': Search,
    'settings': Settings,
    'user': User,
    'users': Users,
    'bell': Bell,
    'mail': Mail,
    'calendar': Calendar,
    'message-square': MessageSquare,
    'layout-grid': LayoutGrid,
    'menu': Menu,
    'star': Star,
    'heart': Heart,
    'bookmark': Bookmark,
    'zap': Zap,
    'shield': Shield,
    'database': Database,
    'globe': Globe,
    'camera': Camera,
    'image': Image,
    'music': Music,
    'clock': Clock,
    'map-pin': MapPin,
    'navigation': Navigation,
    'send': Send,
    'list': List,
    'briefcase': Briefcase,
    'package': Package,
    'shopping-bag': ShoppingBag,
    'credit-card': CreditCard,
    'trending-up': TrendingUp,
    'chart-column': ChartColumn,
    'activity': Activity,
    'plus': Plus,
    'more-horizontal': MoreHorizontal,
    'wifi': Wifi,
    'circle': Circle,
    'lock': Lock,
    'log-out': LogOut,
    'info': Info,
    'alert': TriangleAlert,
    'moon': Moon,
    'sun': Sun,
    'upload': Upload,
    'download': Download,
    'trash': Trash,
    'edit': Pencil,
    'filter': Filter,
  };
</script>

{#snippet navItemContent(item: MobileNavItem, IconComp: LucideIcon)}
  <span class="relative flex items-center justify-center">
    <IconComp size={sizeCfg.icon} class="shrink-0" aria-hidden="true" />
    {#if item.badge === true}
      <span class="absolute -top-1 -right-1 flex h-2 w-2" aria-hidden="true">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ca-success)] opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-[var(--ca-success)]"></span>
      </span>
    {:else if typeof item.badge === 'number'}
      <span class="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-[var(--ca-danger)] text-white text-[9px] font-semibold flex items-center justify-center tabular-nums leading-none">
        {item.badge > 99 ? '99+' : item.badge}
      </span>
    {/if}
  </span>
  {#if showLabels}
    <span class="truncate max-w-14 leading-none">{item.label}</span>
  {/if}
{/snippet}

<nav
  aria-label={navLabel}
  class="md:hidden fixed bottom-0 left-0 right-0 z-30 backdrop-blur-md border-t border-[var(--ca-border)] pb-[env(safe-area-inset-bottom,0px)] transition-colors select-none {customClass}"
  style="background-color: color-mix(in srgb, var(--ca-surface) 90%, transparent)"
>
  <div class="flex items-stretch {sizeCfg.bar} px-1">
    {#each items as item, index (item.id || index)}
      {@const IconComp = resolveIcon(item.icon)}
      {@const active = isActive(item, index)}
      {@const activeCls = active ? activeClasses[variant] : inactiveClass}

      {#if item.href}
        <a
          href={item.href}
          aria-current={active ? 'page' : undefined}
          aria-label={item.label}
          onclick={() => onItemClick?.(item, index)}
          class="relative flex-1 flex flex-col items-center justify-center gap-1 {sizeCfg.label} font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {activeCls}"
        >
          {@render navItemContent(item, IconComp)}
        </a>
      {:else}
        <button
          type="button"
          aria-current={active ? 'page' : undefined}
          aria-label={item.label}
          onclick={() => onItemClick?.(item, index)}
          class="relative flex-1 flex flex-col items-center justify-center gap-1 {sizeCfg.label} font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ca-surface)] {activeCls}"
        >
          {@render navItemContent(item, IconComp)}
        </button>
      {/if}
    {/each}
  </div>
</nav>