import { redirect } from '@sveltejs/kit';
import type { ServerLoad } from '@sveltejs/kit';

/*
export const prerender = true;

export const load: ServerLoad = async (event) => {
  const status = event.cookies.get('checkinStatus');

  if (status !== 'success') {
    // If the cookie isn't 'failure', redirect back to /checkin
    throw redirect(302, '/checkin');
  }

  // Do not delete the cookie here so that it remains available on refresh
  return { status };
};

*/