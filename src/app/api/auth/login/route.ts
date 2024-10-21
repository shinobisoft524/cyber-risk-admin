import { type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const reqData = await req.json();
  console.log('----login check:', reqData);
  console.log('----login check:', `${process.env.NEXT_PUBLIC_API_URL}user/login`);
  const resData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/login`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: reqData.user }),
  });
  const res = await resData.json();
  console.log(res);
  const cookieStore = cookies();
  if (res.statusCode === 200) {
    const oneDay = 5 * 60 * 1000; // 24 hrs 24 * 60 * 60 * 1000;
    cookieStore.set('isLogin', 'true', { maxAge: 60 * 60 }); //, { expires: Date.now() - oneDay });
    cookieStore.set('jwt-token', res.data.token), { maxAge: 60 * 60 }; //, { expires: Date.now() - oneDay });
  } else {
    cookieStore.delete('isLogin');
    cookieStore.delete('jwt-token');
  }

  console.log('User login state', cookieStore.get('isLogin'));

  return Response.json(res);
}
