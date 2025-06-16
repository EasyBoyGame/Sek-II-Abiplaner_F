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
        goto('/checkin/success');
      } else {
        goto('/checkin/failure');
      }
    } catch (error) {
      console.error('Check-in failed:', error);
    }
  });
</script>

<main class="p-4">
  <h1 class="text-2xl font-bold mb-4">This is checkin</h1>
</main>
