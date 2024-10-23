import { type NextRequest } from 'next/server';
import { PostApi } from '@/app/api/instance';

export async function POST(req: NextRequest) {
  const reqData = await req.json();
  return await PostApi(req, 'organisation/createOrganisationAssessment', reqData);
}
