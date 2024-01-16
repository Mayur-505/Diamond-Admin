import api from "./api";

export const getSubCategory = async (params) => {
  const url = "/subcategory/getallSubCategories";
  const method = "get";

  const res = await api({ url, method, params });
  return res.data;
};

export const getSubCategoryall = async () => {
  const url = "/subcategory/getallSubCategories";
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

export const EditSubCategory = async (id: string, data: any) => {
  const url = `/subcategory/update/${id}`;
  const method = "put";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return api({ url, method, data, headers, isFormData: true });
};

export const deleteSubCategory = (id: string) => {
  const url = `subcategory/delete/${id}`,
    method = "delete";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, headers, data: {} });
};

export const categoryTosubCategory = async (params) => {
  const url = `/category/subcategory`;
  const method = "get";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return api({ url, method, params, headers });
};
export const subcategoryToInnerCategory = async (params) => {
  const url = `/subcategory/innercategory`;
  const method = "get";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return api({ url, method, params, headers });
};
