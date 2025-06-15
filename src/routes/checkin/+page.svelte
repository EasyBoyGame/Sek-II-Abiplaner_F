<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    const kartenNr = params.get('kartenNr');

    if (!kartenNr) return;

    try {
      const response = await fetch(`/api/v1/checkin?kartenNr=${encodeURIComponent(kartenNr)}`, {
        method: 'POST'
      });

      if (response.status === 200) {
        goto('/checkin/redirect?status=success');
      } else if (response.status === 400 || response.status === 403) {
        goto('/checkin/failure');
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Check-in failed:', error);
    }
  });
</script>

<main class="p-4">
  <h1 class="text-2xl font-bold mb-4">This is checkin</h1>
</main>

<style>
  main {
    max-width: 600px;
    margin: 2rem auto;
    text-align: center;
  }
</style>
