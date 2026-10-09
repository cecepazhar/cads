<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<div class="min-h-screen bg-white dark:bg-[#0A0A0C] text-neutral-900 dark:text-[#EDEDED] font-sans antialiased transition-colors duration-200">
  {@render children()}
</div>
