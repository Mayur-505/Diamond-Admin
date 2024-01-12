export type ErrorType = {
  code: number;
  data: ErrorData;
};

export type ErrorData = {
  message: {
    en: string;
    ko: string;
  };
  status: boolean;
};

export type Clarity = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Products = {
  id: string;
  title: string;
  maintitle: string,
  price: string,
  disccount_price: string,
  createdAt: string;
  updatedAt: string;
};

export type Cut = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Color = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Shape = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  image: string;
};
