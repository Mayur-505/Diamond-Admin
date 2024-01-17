import api from "./api";

export const getBlog = async (params: any) => {
  const url = "/blog/fetch";
  const method = "get";

  const res = await api({ url, method, params });
  return res.data.data;
};

export const createBlog = async (data: FormData) => {
  const url = "/blog/create";
  const method = "post";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await api({ url, method, data, isFormData: true, headers });
  return res.data;
};

export const deleteBlog = async (id: string) => {
  const url = `/blog/delete/${id}`;
  const method = "delete";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await api({ url, method, headers, data: {} });
  return res.data;
};

export const updateBlog = async ({ data }: { data: FormData }) => {
  const url = `/blog/update`;
  const method = "patch";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await api({ url, method, data, headers, isFormData: true });
  return res.data;
};

export const getSingleBlog = async (id: string) => {
  const url = `/blog/fetch/${id}`;
  const method = "get";
  const res = await api({ url, method, data: {} });
  return res.data;
};
