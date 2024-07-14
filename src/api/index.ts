const apiKey = process.env.EXPO_PUBLIC_ACCESS_KEY;

export const get = async (url: string) =>
  await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });
