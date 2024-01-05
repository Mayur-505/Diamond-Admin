import api from "./api";

export const userLogin = (data: any) => {
  const method = "post",
    url = "/user/login";
  return api({ method, url, data });
};
