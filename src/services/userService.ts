import api from "./api";

export const getUser = async (params: { page: number; pageSize: number }) => {
  const url = "/user/userlist";
  const method = "get";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const stringParams = {
    page: params.page.toString(),
    pageSize: params.pageSize.toString(),
  };

  const res = await api({ url, method, params: stringParams, headers });
  return res.data;
};
