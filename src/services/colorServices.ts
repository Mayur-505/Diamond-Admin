import api from "./api";

export const getColor = async (params: any) => {
  const url = "/color/fetch";
  const method = "get";

  const res = await api({ url, method, params });
  return res.data;
};

export const createColor = async (data: string) => {
  const url = "/color/create";
  const method = "post";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await api({ url, method, data, headers });
  return res.data;
};

export const updateColor = async ({ data }: { data: string }) => {
  const url = "/color/update";
  const method = "patch";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await api({ url, method, data, headers });
  return res.data;
};

export const deleteColor = async (id: string) => {
  const url = `/color/delete/${id}`;
  const method = "delete";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await api({ url, method, data: {}, headers });
  return res.data;
};
