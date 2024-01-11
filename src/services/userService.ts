import api from "./api";

export const getUser = async (params: { page: number; pageSize: number }) => {
  const url = "/user/userlist";
  const method = "get";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await api({ url, method, params, headers });
  return res.data;
};
