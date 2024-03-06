import api from "./api";

interface getParams {
  page: number;
  pageSize: number;
}

export const getCurrency = async (params: getParams) => {
  const url = "/currency/fetch";
  const method = "get";
  const res = await api({ url, method, params });
  return res.data;
};

export const createCurrency = async (data: {
  name: string;
  description: string;
}) => {
  const url = "/currency/create";
  const method = "post";
  const res = await api({ url, method, data });

  return res.data;
};

export const updateCurrency = async ({
  data,
  id,
}: {
  data: {
    name: string;
    description: string;
  };
  id: string;
}) => {
  const url = `/currency/update/${id}`;
  const method = "patch";
  const res = await api({ url, method, data });

  return res.data;
};
