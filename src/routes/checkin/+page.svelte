<script lang="ts">
    import { postApiV1CheckinByKartenNr } from '$lib/client';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
  
    let kartenNr = null;
    let checkinResult = null;
  
    onMount(async () => {
      const params = new URLSearchParams(window.location.search);
      kartenNr = params.get('kartenNr');
  
      if (kartenNr) {
        try {
          const {response} = await postApiV1CheckinByKartenNr({
            body: {kartenNr}
          });

/*
          const response = await fetch('/api/v1/checkin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ kartenNr })
          });
  */
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const result = await response.json();
          checkinResult = result === true ? goto('/checkin/success') : goto('/checkin/failure');
  
        } catch (error) {
          console.error('Error during check-in:', error);
          checkinResult = 'An error occurred during check-in.';
        }
      } else {
        checkinResult = 'No kartenNr provided in the URL.';
      }
    });
  </script>
  
  <main class="p-4">
    <h1 class="text-2xl font-bold mb-4">Check-in</h1>
  </main>
  
  <style>
    main {
      max-width: 600px;
      margin: 2rem auto;
      text-align: center;
    }
  </style>
  