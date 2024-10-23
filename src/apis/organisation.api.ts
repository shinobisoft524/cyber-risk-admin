import { PostApi } from './instance.api';

export const createOrganisationApi = async (data: unknown) => {
  return await PostApi(`/api/organisation/create`, { reqData: data });
};

export const getOrganisationListApi = async (data: unknown) => {
  const res = await fetch(`/api/organisation/list`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ organisation: null }),
  });
  return res.json();
};

export const getOrganisationDetailApi = async (data: unknown) => {
  return await PostApi(`/api/organisation/detail`, { reqData: data });
};
