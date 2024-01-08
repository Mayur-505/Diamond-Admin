import api from "./api";

export const getInnerCategory = async (params) => {
  const url = "/innercategory/getallinnercategory";
  const method = "get";

  const res = await api({ url, method, params });
  return res.data;
};

export const addInnerCategory = async (data: any) => {
  const url = "/innercategory/create";
  const method = "post";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, data, headers, isFormData: true });
};

export const deleteInnerCategory = (id: string) => {
  const url = `/innercategory/delete/${id}`,
    method = "delete";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, headers, data: {} });
};
