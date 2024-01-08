import api from "./api";

export const getSubCategory = async (): Promise<[]> => {
  const url = "/subcategory/getallSubCategories?page=1&pageSize=10";
  const method = "get";

  const res = await api({ url, method });
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
