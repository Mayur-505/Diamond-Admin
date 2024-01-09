import api from "./api";

export const getColor = async (params: {
  params: { page: number; pageSize: number };
}) => {
  const url = "/color/fetch";
  const method = "get";

  const res = await api({ url, method, params });
  return res.data;
};

export const createColor = async (data: string) => {
  const url = "/color/create";
  const method = "post";
  const res = await api({ url, method, data });
  return res.data;
};

export const updateColor = async ({ data }: { data: string }) => {
  const url = "/color/update";
  const method = "patch";
  const res = await api({ url, method, data });
  return res.data;
};

export const deleteColor = async (id: string) => {
  const url = `/color/delete/${id}`;
  const method = "delete";
  const res = await api({ url, method, data: {} });
  return res.data;
};