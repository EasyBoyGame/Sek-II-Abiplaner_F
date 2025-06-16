<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		const kartenNr = params.get('kartenNr');

		if (kartenNr) {
			// Redirect via POST form to server-side handler
			const form = document.createElement('form');
			form.method = 'POST';
			form.action = `/checkin/handle?kartenNr=${encodeURIComponent(kartenNr)}`;
			document.body.appendChild(form);
			form.submit();
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
