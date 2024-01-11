import api from "./api";

export const addProduct = async (data: any) => {
  const url = "/product/create";
  const method = "post";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, data, headers, isFormData: true });
};
