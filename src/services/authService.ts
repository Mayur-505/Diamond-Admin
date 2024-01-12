import api from "./api";

export const userLogin = (data: any) => {
  const method = "post",
    url = "/user/login";
  return api({ method, url, data });
};

export const forgotPassword = (data: any) => {
  const method = "post",
    url = "/user/forgetpassword";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ method, url, headers, data, isFormData: false });
};

export const VerificationOtp = (data: any) => {
  const method = "post",
    url = "/user/verification/forgetpassword";
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

export const newPassword = (data: any) => {
  const method = "post",
    url = "/user/create_password";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ method, url, headers, data });
};
