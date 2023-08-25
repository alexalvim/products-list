export interface IProduct {
  label: string;
  imagePath: string;
  priceCents: number;
  id: string;
}

export interface ICartProduct {
  label: string;
  imagePath: string;
  priceCents: number;
  id: number | string;
  quantity: number;
}

export interface IDefaultPrice {
  active: false;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount: null;
  id: string;
  livemode: boolean;
  lookup_key: null;
  metadata: Record<string,any>;
  nickname: null;
  object: string;
  product: string;
  recurring: null;
  tax_behavior: string;
  tiers_mode: null;
  transform_quantity: null;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

export interface IStripeProduct {
  active: boolean;
  created: number;
  default_price: IDefaultPrice;
  description: string | null;
  id: string;
  images: string[];
  livemode: boolean
  metadata: Record<string,any>
  name: string
  object: string
  package_dimensions: null;
  shippable: null;
  statement_descriptor: null;
  tax_code: null;
  type: string;
  unit_label: null;
  updated: number;
  url: null;
}

export interface IStripeProductResponse {
  data: IStripeProduct[];
  has_more: boolean;
  object: string;
  url: string;
}
