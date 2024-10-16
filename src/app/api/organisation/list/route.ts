import { type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const reqData = await req.json();
  const resData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}organisation/list`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ organisation: reqData.organisation }),
  });
  const res = await resData.json();

  return Response.json(res);
}
