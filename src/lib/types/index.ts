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
  maintitle: string;
  price: string;
  disccount_price: string;
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
  images: string;
};
export type Customers = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  phone_number: string;
  comment: string;
  status: number;
  images: string;
};
export type Blog = {
  id: string;
  title: string;
  heading: string;
  description: string;
  images: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  total: any;
};
export type Banner = {
  id: string;
  title: string;
  heading: string;
  description: string;
  images: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  total: any;
};

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};
export type Admin = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};
export type Profile = {
  id: string;
  firstname: string;
  lastname: string;
  Address: string;
  email: string;
  image: string;
  role: string;
  mobile: string;
  password: string;
  Comment: string;
  createdAt: string;
  updatedAt: string;
};
