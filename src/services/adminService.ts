import api from "./api";

export const getAdmin = async (params: { page: number; pageSize: number }) => {
  const url = "/user/admin?page=1&pageSize=10";
  const method = "get";
  const headers = {};
  const res = await api({ url, method, headers });
  return res.data;
};

export const assignAdmin = async (data: any) => {
  const url = "/user/assing/admin";
  const method = "post";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, data, headers });
};

export const removeAdmin = (id: string) => {
  const url = `/remove/admin/${id}`,
    method = "patch";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, headers, data: {} });
};
