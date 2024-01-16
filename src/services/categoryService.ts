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

export const allgetCategorydata = async () => {
  const url = "/category/getallcategory";
  const method = "get";

  const res = await api({ url, method });
  return res.data;
};

export const AddCategory = async (data: any) => {
  const url = "/category/create";
  const method = "post";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, data, headers, isFormData: true });
};

export const EditCategory = async (id: string, data: any) => {
  const url = `/category/update/${id}`;
  const method = "put";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return api({ url, method, data, headers });
};

export const deleteCategory = (id: string) => {
  const url = `category/delete/${id}`,
    method = "delete";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, headers, data: {} });
};
