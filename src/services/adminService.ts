import api from "./api";

export const getAdmin = async (params: { page: number; pageSize: number }) => {
  const url = `/user/admin?page=${params.page}&pageSize=${params.pageSize}`;
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
  const url = `user/remove/admin/${id}`,
    method = "patch";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, headers, data: {} });
};

export const ChangePassword = (data: any) => {
  const url = `/user/change_password`,
    method = "post";
  const token = localStorage.token;
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, headers, data });
};

export const GetOneUser = (id: any) => {
  const url = `/user/fetch_user/${id}`,
    method = "get";
  const token = localStorage.token;
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, headers });
};

export const UploadImage = (data: any) => {
  const url = `/product/updatefile`,
    method = "post";
  const token = localStorage.token;
  const headers = {
    "Content-Type":
      "multipart/form-data; boundary=<calculated when request is sent>",
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, headers, data });
};

export const UpdateProfile = (data: any) => {
  const url = `/user/update`,
    method = "patch";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  return api({ url, method, headers, data });
};
