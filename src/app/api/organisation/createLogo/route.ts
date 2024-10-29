import { BPostApi } from '@/app/api/instance';
import { type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const reqData = req.body;
  return await BPostApi(req, 'file/uploadOrganisationLogo', reqData);
}
