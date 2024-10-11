import { type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  console.log('rea', `${process.env.NEXT_PUBLIC_API_URL}user/login`)
  const reqData = await req.json();
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
    cookieStore.set('isLogin', 'true');
    cookieStore.set('jwt-token', res.data.token);
  } else {
    cookieStore.delete('isLogin');
    cookieStore.delete('jwt-token');
  }

  return Response.json(res);
}
