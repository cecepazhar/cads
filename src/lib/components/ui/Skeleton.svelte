<script lang="ts">
  interface Props {
    class?: string;
  }

  let { class: customClass = '' }: Props = $props();
</script>

<div class="animate-pulse rounded-md bg-neutral-800/80 {customClass}"></div>
