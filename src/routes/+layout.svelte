<script lang="ts">
  import '../app.css';
  import '$lib/tokens/tokens.css';
  let { children } = $props();
</script>

<div class="min-h-screen bg-[#0A0A0C] text-[#EDEDED] font-sans antialiased">
  {@render children()}
</div>
