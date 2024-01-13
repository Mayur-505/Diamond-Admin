import api from "./api";

export const getCut = async ({
  params,
}: {
  params: { page: number; pageSize: number };
}) => {
  const url = "/cut/fetch";
  const method = "get";

  const res = await api({ url, method, params });
  return res.data;
};

export const createCut = async (data: string) => {
  const url = "/cut/create";
  const method = "post";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await api({ url, method, data, headers });
  return res.data;
};

export const updateCut = async ({ data }: { data: { name: string } }) => {
  const url = `/cut/update`;
  const method = "patch";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await api({ url, method, data, headers });
  return res.data;
};

export const deleteCut = async (id: string) => {
  const url = `/cut/delete/${id}`;
  const method = "delete";
  const res = await api({ url, method, data: {} });
  return res.data;
};
