import { PostApi } from './_';

export const register = async (data: unknown) => {
  const res = await fetch(`user/register`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: data }),
  });
  return res.json();
};

export const loginApi = async (data: unknown) => {
  return await PostApi(`/api/auth/login`, { reqData: data });
};

export const logout = async (data: { email: string }) => {
  const res = await fetch(`/api/auth/logout`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: data }),
  });
  return res.json();
};
