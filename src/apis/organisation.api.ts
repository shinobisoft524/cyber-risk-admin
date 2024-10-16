export const createOrganisationApi = async (data: unknown) => {
  const res = await fetch(`/api/organisation/create`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ organisation: data }),
  });
  return res.json();
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
  const res = await fetch(`/api/organisation/list`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ organisation: data }),
  });
  return res.json();
};
