import api from "./api";

export const getClarity = async (params: any) => {
  const url = "/clarity/fetch";
  const method = "get";

  const res = await api({ url, method, params });
  return res.data;
};

export const createClarity = async (data: any) => {
  const url = "/clarity/create";
  const method = "post";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, data, headers, isFormData: false });
};

export const updateClarity = (data: any) => {
  const url = "/clarity/update";
  const method = "patch";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, data, headers });
};

export const deleteClarity = (id: string) => {
  const url = `/clarity/delete/${id}`,
    method = "delete";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, headers, data: {} });
};
