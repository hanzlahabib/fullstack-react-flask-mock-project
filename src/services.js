export const servies = async (url, options) => {
  const res = await fetch(url, {
    headers: {
      accepts: 'application/json',
    },
  });
  return await res.json();
};
