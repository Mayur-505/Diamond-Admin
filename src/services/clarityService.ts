import { Clarity } from "@/lib/types";
import api from "./api";

export const getClarity = async (): Promise<Clarity[]> => {
  const url = "/clarity/fetch";
  const method = "get";

  const res = await api({ url, method });
  return res.data;
};

export const createClarity = async (name: string) => {
  const url = "/clarity/create";
  const method = "post";
  const data = { name };
  const res = await api({ url, method, data });
  return res.data;
};
