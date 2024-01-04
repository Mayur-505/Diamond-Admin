import api from "./api";

export const getCategory = async (): Promise<[]> => {
  const url = "/category/getall?page=1&pageSize=5";
  const method = "get";

  const res = await api({ url, method });
  return res.data;
};
