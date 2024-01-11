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

export const addUser = async (data: any) => {
  const url = "/user/create";
  const method = "post";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, data, headers });
};

export const UserVerificationOtp = (data: any) => {
  const method = "post",
    url = "/user/verification";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ method, url, headers, data, isFormData: false });
};
export const ResendOtp = (data: any) => {
  const method = "post",
    url = "/user/resendotp";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ method, url, headers, data, isFormData: false });
};
