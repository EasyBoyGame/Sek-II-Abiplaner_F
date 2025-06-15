import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ cookies, url }) => {
  const status = url.searchParams.get('status');

  if (status === 'success') {
    cookies.set('checkinStatus', 'success', {
      path: '/',
      httpOnly: false,
      sameSite: 'strict',
      maxAge: 60 // expires in 1 min
    });

    throw redirect(302, '/checkin/success');
  }

  throw redirect(302, '/checkin/failure');
};
