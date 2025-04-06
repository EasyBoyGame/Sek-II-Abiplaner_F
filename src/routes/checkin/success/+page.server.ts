import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export async function load({ cookies, url }: RequestEvent) {
  // Check the status from the cookie
  const status = cookies.get('checkinStatus');
  const kartenNr = url.searchParams.get('kartenNr');  // If needed, you can extract kartenNr from the URL

  // If the checkin status is not 'success', redirect to the /checkin page
  if (status !== 'success') {
    throw redirect(302, '/checkin');
  }

  // Optionally clear the cookie after reading it
  cookies.delete('checkinStatus', { path: '/checkin' });

  return { status, kartenNr };  // Return status and kartenNr to the frontend
}
