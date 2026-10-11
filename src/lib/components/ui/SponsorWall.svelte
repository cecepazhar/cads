<script lang="ts">
  import type { ComponentSize } from './types';
  import ProfileAvatar from './ProfileAvatar.svelte';

  export interface Sponsor {
    id: string;
    name: string;
    url?: string;
    avatar?: string;
    initials?: string;
  }

  type SponsorWallSize = Extract<ComponentSize, 'sm' | 'md' | 'lg'>;

  interface Props {
    sponsors: Sponsor[];
    size?: SponsorWallSize;
    title?: string;
    class?: string;
  }

  let {
    sponsors = [],
    size = 'md',
    title = 'Sponsors & Contributors',
    class: customClass = '',
  }: Props = $props();

  const gridCls: Record<SponsorWallSize, string> = {
    sm: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6',
    md: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-8',
    lg: 'grid-cols-4 sm:grid-cols-6 md:grid-cols-10',
  };

  const avatarSize: Record<SponsorWallSize, 'sm' | 'md' | 'lg'> = { sm: 'sm', md: 'md', lg: 'lg' };
</script>

<section aria-label={title} class={customClass}>
  <h2 class="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--ca-text-muted)]">{title}</h2>
  <div class="grid {gridCls[size]} gap-3">
    {#each sponsors as sponsor (sponsor.id)}
      <div class="flex flex-col items-center gap-1.5 group">
        {#if sponsor.url}
          <a
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={sponsor.name}
            class="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ca-brand)]"
          >
            <ProfileAvatar
              size={avatarSize[size]}
              name={sponsor.name}
              initials={sponsor.initials}
              url={sponsor.avatar}
              variant="secondary"
              class="group-hover:ring-2 group-hover:ring-[var(--ca-brand)] transition-all duration-[var(--ca-motion-duration-fast)]"
            />
          </a>
        {:else}
          <ProfileAvatar
            size={avatarSize[size]}
            name={sponsor.name}
            initials={sponsor.initials}
            url={sponsor.avatar}
            variant="secondary"
          />
        {/if}
        <span class="truncate max-w-full text-[10px] text-[var(--ca-text-muted)] group-hover:text-[var(--ca-text-primary)] transition-colors duration-[var(--ca-motion-duration-fast)]">
          {sponsor.name}
        </span>
      </div>
    {/each}
  </div>
</section>
