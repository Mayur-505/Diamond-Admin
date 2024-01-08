import api from "./api";

export const userLogin = (data: any) => {
  const method = "post",
    url = "/user/login";
  return api({ method, url, data });
};

export const forgotPassword = (data: any) => {
  const method = "post",
    url = "user/verification/forgetpassword";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ method, url, headers, data });
};
