import { Shape } from "@/lib/types";
import api from "./api";

export const getShape = async (params: any) => {
  const url = "/shape/fetch";
  const method = "get";

  // Convert number values to strings
  const stringParams = {
    page: params.page.toString(),
    pageSize: params.pageSize.toString(),
  };

  const res = await api({ url, method, params: stringParams });
  return res.data.data;
};

export const createShape = async (data: FormData) => {
  const url = "/shape/create";
  const method = "post";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await api({ url, method, data, isFormData: true, headers });
  return res.data;
};

export const deleteShape = async (id: string) => {
  const url = `/shape/delete/${id}`;
  const method = "delete";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await api({ url, method, headers, data: {} });
  return res.data;
};

export const updateShape = async ({ data }: { data: FormData }) => {
  const url = `/shape/update`;
  const method = "patch";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await api({ url, method, data, headers });
  return res.data;
};
