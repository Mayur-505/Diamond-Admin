import api from "./api";

export const getSubCategory = async (params) => {
  const url = "/subcategory/getallSubCategories";
  const method = "get";

  const res = await api({ url, method, params });
  return res.data;
};

export const AddSubCategory = async (data: any) => {
  const url = "/subcategory/create";
  const method = "post";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, data, headers, isFormData: true });
};
