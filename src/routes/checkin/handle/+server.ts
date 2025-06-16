import type { RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ url, cookies, fetch }) => {
	const kartenNr = url.searchParams.get('kartenNr');

	if (!kartenNr) {
		cookies.set('checkinStatus', 'failure', { path: '/', maxAge: 60 });
		throw redirect(302, '/checkin/failure');
	}

	const response = await fetch(`/api/v1/checkin?kartenNr=${encodeURIComponent(kartenNr)}`, {
		method: 'POST'
	});

	if (response.status === 200) {
		cookies.set('checkinStatus', 'success', { path: '/', maxAge: 60 });
		throw redirect(302, '/checkin/success');
	} else if (response.status === 400 || response.status === 403) {
		cookies.set('checkinStatus', 'failure', { path: '/', maxAge: 60 });
		throw redirect(302, '/checkin/failure');
	}

	throw redirect(302, '/checkin');
};
