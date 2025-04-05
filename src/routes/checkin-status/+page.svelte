<script lang="ts">
    import { onMount } from 'svelte';
  
    let status: string | null = null;
  
    onMount(async () => {
      const res = await fetch('/api/v1/checkin-status');
  
      if (res.ok) {
        status = await res.text();
      } else {
        status = 'No status found';
      }
    });
  </script>
  
  {#if status === 'success'}
    <h1>✅ Check-in successful!</h1>
    <p>Welcome, enjoy the event 🎉</p>
  {:else if status === 'failure'}
    <h1>❌ Check-in failed</h1>
    <p>Please try again or ask for help.</p>
  {:else}
    <h1>🔄 Checking...</h1>
    <p>Your status is being processed.</p>
  {/if}
  