import { BPostApi } from '@/app/api/instance';
import { type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const reqData = await req.json();
  return await BPostApi(req, 'organisation/create', reqData);
}
