<script lang="ts">
  import {
    Terminal, Server, Cpu, Shield, Sparkles, Settings,
    Code, Folder, File, Search, ChevronDown, ChevronRight,
    Check, X, RefreshCw, User, Globe, Moon, Sun,
    Palette, Zap, Database, Info, TriangleAlert, Lock,
    Copy, LogOut, Calendar, Upload, Download, Plus, Minus,
    ChevronLeft, ChevronUp, Trash, Pencil, Filter, Loader
  } from 'lucide-svelte';

  export type IconName =
    | 'terminal'
    | 'server'
    | 'cpu'
    | 'shield'
    | 'sparkles'
    | 'settings'
    | 'code'
    | 'folder'
    | 'file'
    | 'search'
    | 'chevron-down'
    | 'chevron-right'
    | 'check'
    | 'x'
    | 'refresh'
    | 'user'
    | 'globe'
    | 'moon'
    | 'sun'
    | 'palette'
    | 'zap'
    | 'database'
    | 'info'
    | 'alert'
    | 'lock'
    | 'copy'
    | 'logout'
    | 'calendar'
    | 'upload'
    | 'download'
    | 'plus'
    | 'minus'
    | 'chevron-left'
    | 'chevron-up'
    | 'trash'
    | 'edit'
    | 'filter'
    | 'loader';

  interface Props {
    name: IconName;
    size?: number | string;
    class?: string;
  }

  let {
    name,
    size = 16,
    class: customClass = '',
  }: Props = $props();

  const ICON_MAP: Record<IconName, typeof Terminal> = {
    'terminal': Terminal,
    'server': Server,
    'cpu': Cpu,
    'shield': Shield,
    'sparkles': Sparkles,
    'settings': Settings,
    'code': Code,
    'folder': Folder,
    'file': File,
    'search': Search,
    'chevron-down': ChevronDown,
    'chevron-right': ChevronRight,
    'check': Check,
    'x': X,
    'refresh': RefreshCw,
    'user': User,
    'globe': Globe,
    'moon': Moon,
    'sun': Sun,
    'palette': Palette,
    'zap': Zap,
    'database': Database,
    'info': Info,
    'alert': TriangleAlert,
    'lock': Lock,
    'copy': Copy,
    'logout': LogOut,
    'calendar': Calendar,
    'upload': Upload,
    'download': Download,
    'plus': Plus,
    'minus': Minus,
    'chevron-left': ChevronLeft,
    'chevron-up': ChevronUp,
    'trash': Trash,
    'edit': Pencil,
    'filter': Filter,
    'loader': Loader,
  };
</script>

<svelte:component
  this={ICON_MAP[name]}
  {size}
  class="shrink-0 inline-block {customClass}"
  aria-hidden="true"
/>