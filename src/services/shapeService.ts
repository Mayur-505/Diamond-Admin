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
  const res = await api({ url, method, data, isFormData: true });
  return res.data;
};
