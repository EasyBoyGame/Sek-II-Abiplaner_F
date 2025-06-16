<script lang="ts">

import { redirect, type ServerLoad } from '@sveltejs/kit';

export const prerender = false;

export const load: ServerLoad = async ({ request }) => {
	const referer = request.headers.get('referer');

	// Allow access only if they came from the check-in page with kartenNr
	if (!referer || !referer.includes('/checkin?kartenNr=')) {
		throw redirect(302, '/checkin');
	}

	return {};
};
</script>