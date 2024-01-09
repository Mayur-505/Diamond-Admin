import { Shape } from "@/lib/types";
import api from "./api";

export const getShape = async (params: {
  page: number;
  pageSize: number;
}): Promise<Shape[]> => {
  const url = "/shape/fetch";
  const method = "get";

  const res = await api({ url, method, params });
  return res.data.data;
};

export const createShape = async (data: FormData) => {
  const url = "/shape/create";
  const method = "post";
  const res = await api({ url, method, data, isFormData: true });
  return res.data;
};

export const deleteShape = async (id: string) => {
  const url = `/shape/delete/${id}`;
  const method = "delete";
  const res = await api({ url, method, data: {} });
  return res.data;
};

export const updateShape = async ({ data }: { data: FormData }) => {
  const url = `/shape/update`;
  const method = "patch";
  const res = await api({ url, method, data });
  return res.data;
};
