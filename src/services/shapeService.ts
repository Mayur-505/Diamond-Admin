import { Shape } from "@/lib/types";
import api from "./api";

export const getShape = async (): Promise<Shape[]> => {
  const url = "/shape/fetch";
  const method = "get";

  const res = await api({ url, method });
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

export const updateShape = (data: any) => {
  const url = "/shape/update";
  const method = "patch";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, data, headers });
};

export const deleteShape = (id: string) => {
  const url = `/shape/delete/${id}`,
    method = "delete";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return api({ url, method, headers, data: {} });
};
