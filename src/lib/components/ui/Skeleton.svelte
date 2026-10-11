<script lang="ts">
  import type { ComponentSize } from './types';

  type SkeletonVariant = 'text' | 'circular' | 'rectangular';
  type SkeletonSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    variant?: SkeletonVariant;
    size?: SkeletonSize;
    class?: string;
  }

  let { variant = 'text', size = 'md', class: customClass = '' }: Props = $props();

  const shapeClasses: Record<SkeletonVariant, string> = {
    text: 'rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-sm',
  };

  const sizeClasses: Record<SkeletonVariant, Record<SkeletonSize, string>> = {
    text: { sm: 'h-3', md: 'h-4', lg: 'h-5' },
    circular: { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-14 h-14' },
    rectangular: { sm: 'h-16 w-full', md: 'h-24 w-full', lg: 'h-32 w-full' },
  };
</script>

<div
  role="status"
  aria-busy="true"
  aria-label="Loading"
  class="animate-pulse {shapeClasses[variant]} {sizeClasses[variant][size]} bg-neutral-800/80 {customClass}"
></div>