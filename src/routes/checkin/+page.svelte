<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores"; // "$app/state" → "$app/stores" in SvelteKit
  import { postApiV1CheckinByKartenNr } from "$lib/client";
  import { get } from "svelte/store";

  let status: 'idle' | 'success' | 'failure' = 'idle';

  onMount(async () => {
    const kartenNr = get(page).url.searchParams.get('kartenNr');
    console.log("kartenNr:", kartenNr);

    if (kartenNr) {
      try {
        const { data, response } = await postApiV1CheckinByKartenNr({
          body: { kartenNr },
        });

        if (response.ok) {
          status = 'success';
        } else {
          status = 'failure';
        }
      } catch (error) {
        status = 'failure';
      }
    }
  });
</script>

<style>
  .glowing-box {
    background: white;
    padding: 5vw 7vw;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 90vw;
    width: 320px;
    text-align: center;
    border: 0.3vw solid;
    box-shadow: 0 0 1.5vw 0.6vw;
  }

  .icon-circle {
    width: 15vw;
    max-width: 80px;
    aspect-ratio: 1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.2rem;
    flex-shrink: 0;
  }

  .path {
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 24;
    stroke-dashoffset: 24;
    animation: draw 1s ease forwards;
  }

  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }

  .success-border {
    border-color: #22c55e;
    box-shadow: 0 0 1.5vw 0.6vw rgba(34, 197, 94, 0.6);
  }

  .failure-border {
    border-color: #ef4444;
    box-shadow: 0 0 1.5vw 0.6vw rgba(239, 68, 68, 0.6);
  }

  .success-circle {
    background-color: #22c55e;
    box-shadow: 0 0 0.5vw 0.25vw rgba(34, 197, 94, 0.8);
  }

  .failure-circle {
    background-color: #ef4444;
    box-shadow: 0 0 0.5vw 0.25vw rgba(239, 68, 68, 0.8);
  }

  svg {
    width: 50%;
    height: 50%;
    stroke: white;
    stroke-width: 3;
    fill: none;
  }

  h1 {
    font-size: clamp(18px, 5vw, 24px);
    font-weight: 700;
    margin: 0;
  }

  p {
    font-size: clamp(14px, 4vw, 18px);
    color: #4b5563;
    margin-top: 0.5rem;
  }
</style>

<main class="p-4 flex justify-center items-center min-h-screen">
  {#if status === 'success'}
    <div class="glowing-box success-border" role="alert" aria-live="polite">
      <div class="icon-circle success-circle">
        <svg viewBox="0 0 24 24">
          <path class="path" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1>QR Code Scanned</h1>
      <p>Successfully scanned the QR code.</p>
    </div>
  {:else if status === 'failure'}
    <div class="glowing-box failure-border" role="alert" aria-live="polite">
      <div class="icon-circle failure-circle">
        <svg viewBox="0 0 24 24">
          <path class="path" d="M6 6L18 18" />
          <path class="path" d="M18 6L6 18" />
        </svg>
      </div>
      <h1>QR Code Scan Failed</h1>
      <p>Unable to scan the QR code. Please try again.</p>
    </div>
  {:else}
    <h1 class="text-2xl font-bold">Checking QR code...</h1>
  {/if}
</main>