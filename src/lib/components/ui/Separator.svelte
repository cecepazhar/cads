<script lang="ts">
  interface Props {
    orientation?: 'horizontal' | 'vertical';
    class?: string;
  }

  let { orientation = 'horizontal', class: customClass = '' }: Props = $props();
</script>

<div
  role="separator"
  class="shrink-0 bg-neutral-800 {orientation === 'horizontal' ? 'h-px w-full my-2' : 'w-px h-full min-h-[16px] mx-2'} {customClass}"
></div>
