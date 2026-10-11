<script lang="ts">
  import MobileBottomNav from './MobileBottomNav.svelte';
  import type { ComponentVariant } from './types';

  export interface MobileNavItem {
    id?: string;
    label: string;
    icon: string;
    href?: string;
    badge?: boolean | number;
    active?: boolean;
  }

  export type BottomNavVariant = Extract<ComponentVariant, 'primary' | 'ghost'>;
  export type BottomNavSize = 'sm' | 'md';

  interface Props {
    items: MobileNavItem[];
    activeId?: string;
    variant?: BottomNavVariant;
    size?: BottomNavSize;
    navLabel?: string;
    class?: string;
    onItemSelect?: (item: MobileNavItem, index: number) => void;
  }

  let {
    items,
    activeId,
    variant = 'primary',
    size = 'md',
    navLabel = 'Bottom navigation',
    class: customClass = '',
    onItemSelect,
  }: Props = $props();
</script>

<MobileBottomNav
  {items}
  activeItem={activeId}
  {variant}
  {size}
  navLabel={navLabel}
  class={customClass}
  onItemClick={onItemSelect}
/>
