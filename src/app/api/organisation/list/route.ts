import { type NextRequest } from 'next/server';
import { BPostApi } from '@/app/api/instance';

export async function POST(req: NextRequest) {
  const reqData = await req.json();
  return await BPostApi(req, 'organisation/list', reqData);
}
