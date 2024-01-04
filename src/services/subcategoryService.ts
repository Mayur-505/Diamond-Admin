import api from "./api";

export const getSubCategory = async (): Promise<[]> => {
  const url = "/subcategory/getall";
  const method = "get";

  const res = await api({ url, method });
  return res.data;
};
