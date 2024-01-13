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

export const createProduct = async (data: FormData) => {
  const url = "/product/create";
  const method = "post";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await api({ url, method, data, isFormData: true, headers });
  return res.data;
};

export const getSingleProduct = async (id: string) => {
  const url = `/product/single/product/${id}`;
  const method = "get";
  const res = await api({ url, method, data: {} });
  return res.data;
};

export const deleteProduct = async (id: string) => {
  const url = `/product/delete/${id}`;
  const method = "delete";
  const res = await api({ url, method, data: {} });
  return res.data;
};

export const updateProduct = async ({ data }: { data: FormData }) => {
  const url = `/product/update`;
  const method = "patch";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const res = await api({ url, method, data, headers, isFormData: false });
  return res.data;
};
