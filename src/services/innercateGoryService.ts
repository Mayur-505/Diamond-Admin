import api from "./api";

export const getInnerCategory = async (): Promise<[]> => {
  const url = "/innercategory/getall";
  const method = "get";

  const res = await api({ url, method });
  return res.data;
};
