export const register = async (data: unknown) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/register`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: data }),
  });
  return res.json();
};

export const login = async (data: unknown) => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/login`, {
  //   method: 'post',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ user: data }),
  // });
  // return res.json();
  const res = await fetch(`/api/auth/login`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: data }),
  });
  return res.json();
};
