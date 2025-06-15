<script lang="ts">
	import { postApiV1CheckinByKartenNr } from '$lib/client';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let checkinResult: string | null = null;

	onMount(async () => {
		const params = new URLSearchParams(window.location.search);
		const kartenNr = params.get('kartenNr');

		if (!kartenNr) {
			checkinResult = 'No kartenNr provided in the URL.';
			return;
		}

		try {
			const { response } = await postApiV1CheckinByKartenNr({
				body: { kartenNr }
			});

			if (response.status === 200) {
				goto('/checkin/success');
			} else if (response.status === 400 || response.status === 403) {
				goto('/checkin/failure');
			} else {
				checkinResult = `Unexpected response status: ${response.status}`;
			}
		} catch (error) {
			console.error('Error during check-in:', error);
			checkinResult = 'An error occurred during check-in.';
		}
	});
</script>

<main class="p-4">
	<h1 class="text-2xl font-bold mb-4">Check-in</h1>
	{#if checkinResult}
		<p class="text-red-500">{checkinResult}</p>
	{/if}
</main>

<style>
	main {
		max-width: 600px;
		margin: 2rem auto;
		text-align: center;
	}
</style>
