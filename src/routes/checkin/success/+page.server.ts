import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export async function load({ cookies }: RequestEvent) {
	const status = cookies.get('checkinStatus');

	if (status !== 'success') {
		throw redirect(302, '/checkin');
	}

	// Optionally clear the cookie
	cookies.delete('checkinStatus', { path: '/checkin' });

	return { status };
}
