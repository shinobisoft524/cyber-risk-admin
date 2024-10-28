import { NextRequest } from 'next/server';

export async function BPostApi(req: NextRequest, url: string, reqData: any) {
  console.log(reqData);

  let jwtToken = req.cookies.get('jwt-token');

  console.log('Api calling: token = ', jwtToken);

  const resData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/${url}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${jwtToken?.value}`,
    },
    body: JSON.stringify(reqData),
  });
  const res = await resData.json();

  return Response.json(res);
}
