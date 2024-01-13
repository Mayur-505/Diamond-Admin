import api from "./api";

export enum Order_Status {
  Processing,
  Ongoing,
  Delivered,
}
export enum payment_Status {
  Pendding,
  Processing,
  Complete,
}

export const getOrderHistory = async (params) => {
  const url = "/order/getall";
  const method = "get";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await api({ url, method, params, headers });
  return res.data;
};

export const getOrderSummary = async (id: string) => {
  const url = `/order/single/${id}`;
  const method = "get";
  const token = localStorage.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return api({ url, method, headers });
};
