export async function FPostApi(url: string, reqData: any, isNoJson = 'json') {
  const res = await fetch(url, {
    method: 'post',
    // duplex: 'half',
    headers:
      isNoJson === 'form'
        ? { 'Content-Type': 'multipart/form-data' }
        : isNoJson == 'enc'
          ? {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          : {
              'Content-Type': 'application/json',
            },
    body: isNoJson !== 'json' ? reqData : JSON.stringify(reqData),
  });
  return res.json();
}
