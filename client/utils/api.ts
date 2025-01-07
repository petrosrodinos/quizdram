export const getHeaders = (token: string | undefined) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return headers;
};

export const searchParams = (query: { [key: string]: string }) => {
  return new URLSearchParams(query).toString();
};
