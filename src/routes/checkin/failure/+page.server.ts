import { redirect } from '@sveltejs/kit';
import type { ServerLoad } from '@sveltejs/kit';

export const prerender = false;

export const load: ServerLoad = async (event) => {
  const status = event.cookies.get('checkinStatus');
  
  if (status !== 'failure') {
    throw redirect(302, '/checkin');
  }
  
  // Optionally clear the cookie after reading it
  event.cookies.delete('checkinStatus', { path: '/checkin' });
  
  return { status };
};
