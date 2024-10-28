export async function FPostApi(url: string, reqData: any) {
  const res = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqData),
  });
  return res.json();
}
