import api from "./api";

export const BulkUploadData = async (data: any) => {
  const url = "/product/create/bulk_product";
  const method = "post";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, data, headers, isFormData: true });
};
