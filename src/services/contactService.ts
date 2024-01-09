import api from "./api";

export const getActiveContact = async (params: {
  page: number;
  pageSize: number;
}) => {
  const url = "/contact/active";
  const method = "get";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await api({ url, method, params, headers });
  return res.data;
};

export const getInActiveContact = async (params: {
  page: number;
  pageSize: number;
}) => {
  const url = "/contact/inactive";
  const method = "get";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await api({ url, method, params, headers });
  return res.data;
};

export const addContact = async (data: any) => {
  const url = "/contact/create";
  const method = "post";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, data, headers });
};
