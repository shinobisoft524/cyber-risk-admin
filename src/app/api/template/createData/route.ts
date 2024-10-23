import { PostApi } from '@/app/api/instance';
import { type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const reqData = await req.json();
  return await PostApi(req, 'template/createData', reqData);
}
