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
