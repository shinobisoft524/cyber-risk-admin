import { type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const cookieStore = cookies();

  cookieStore.delete('isLogin');
  cookieStore.delete('jwt-token');

  try {
    console.log('rea', `${process.env.NEXT_PUBLIC_API_URL}user/logout`);
    const reqData = await req.json();
    const resData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/logout`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: reqData.user }),
    });
    const res = await resData.json();
    console.log(res);

    return Response.json(res);
  } catch (error) {
    return Response.json(error);
  }
}
