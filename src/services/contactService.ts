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

export const EditContact = async (data: any) => {
  const url = "/contact/update";
  const method = "patch";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, data, headers });
};

export const deleteContact = (id: string) => {
  const url = `/contact/remove/${id}`,
    method = "delete";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, headers, data: {} });
};
