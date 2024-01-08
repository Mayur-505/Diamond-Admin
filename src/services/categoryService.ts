import api from "./api";

export const getCategory = async (params: {
  page: number;
  pageSize: number;
}) => {
  const url = "/category/getallcategory";
  const method = "get";

  const res = await api({ url, method, params });
  return res.data;
};

export const AddCategory = async (data: any) => {
  const url = "/category/create";
  const method = "post";
  return api({ url, method, data, isFormData: true });
};

export const EditCategory = async (id: string, data: any) => {
  console.log("localStorage.token ", localStorage.token);
  const url = `/category/update/${id}`;
  const method = "put";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${localStorage.token || ""}`,
  };
  return api({ url, method, data, isFormData: true, headers });
};
