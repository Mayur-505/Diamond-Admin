import api from "./api";

export const getBanner = async (params: any) => {
  const url = "/banner/fetch";
  const method = "get";

  const res = await api({ url, method, params });
  return res.data.data;
};

export const createBanner = async (data: FormData) => {
  const url = "/banner/create";
  const method = "post";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await api({ url, method, data, isFormData: true, headers });
  return res.data;
};

export const deleteBanner = async (id: string) => {
  const url = `/banner/delete/${id}`;
  const method = "delete";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await api({ url, method, headers, data: {} });
  return res.data;
};

export const updateBanner = async ({ data }: { data: FormData }) => {
  const url = `/banner/update`;
  const method = "patch";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await api({ url, method, data, headers, isFormData: true });
  return res.data;
};

export const getSingleBanner = async (id: string) => {
  const url = `/banner/fetch/${id}`;
  const method = "get";
  const res = await api({ url, method, data: {} });
  return res.data;
};
