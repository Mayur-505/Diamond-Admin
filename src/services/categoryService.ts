import api from "./api";

export const getCategory = async (): Promise<[]> => {
  const url = "/category/getall?page=1&pageSize=5";
  const method = "get";

  const res = await api({ url, method });
  return res.data;
};

export const AddCategory = async (data: any) => {
  const url = "/category/create";
  const method = "post";
  return api({ url, method, data, isFormData: true });
};
