<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		const referer = document.referrer;

		if (!referer.includes('/checkin?kartenNr=')) {
			goto('/checkin');
		}
	});
</script>

<h1>✅ Check-in successful!</h1>
<p>Welcome, enjoy the event 🎉</p>
