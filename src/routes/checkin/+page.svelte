<script lang="ts">
  import { getApiV1CheckinStatus } from '$lib/client';
  import { onMount } from 'svelte';

  let status: string | null = null;

  onMount(async () => {
    try {
      const res = await getApiV1CheckinStatus();

      if (!res.error && res.data) {
        status = res.data;
      } else {
        status = 'No status found';
      }
    } catch (error) {
      console.error("Failed to fetch status:", error);
      status = 'No status found';
    }
  });
</script>


{#if status === "success"}
  <h1>✅ Check-in successful!</h1>
  <p>Welcome, enjoy the event 🎉</p>
{:else if status === "failure"}
  <h1>❌ Check-in failed</h1>
  <p>Please try again or ask for help.</p>
{:else}
  <h1>🔄 Checking...</h1>
  <p>Your status is being processed.</p>
{/if}
