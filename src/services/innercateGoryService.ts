import api from "./api";

export const getInnerCategory = async (): Promise<[]> => {
  const url = "/innercategory/getallinnercategory?page=1&pageSize=10";
  const method = "get";

  const res = await api({ url, method });
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
