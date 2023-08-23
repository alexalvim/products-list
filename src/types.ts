export interface IProduct {
  label: string;
  imagePath: string;
  priceCents: number;
  id: number;
}

export interface ICartProduct {
  label: string;
  imagePath: string;
  priceCents: number;
  id: number;
  quantity: number;
}

export interface IRequestError {
  message: string;
}
