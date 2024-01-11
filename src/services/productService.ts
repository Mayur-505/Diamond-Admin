import api from "./api";

export const getProduct = async (params: {
  subcategoryid: string;
  innnercategoryid: string;
  categoryid: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
  mincarat: string;
  maxcarat: string;
  Clarity: string[];
  Cuts: string[];
  Color: string[];
  shape: string;
}) => {
  const url = "/product/product";
  const method = "get";

  const res = await api({ url, method, params });
  return res.data.data;
};
