import Stripe from "stripe";
import { ICartProduct, IProduct } from "../types"
import stripeConfig from '../config/stripe';

const stripe = new Stripe(stripeConfig.secretKey, {
   apiVersion: '2023-08-16', 
})

export interface ICreateProductProps {
  label: string;
  imagePath: string;
  priceCents: number;
}

export const createProduct = async (prod: ICreateProductProps) => {
  return stripe.products.create({
    name: prod.label,
    images: [prod.imagePath],
    default_price_data: {
      currency: 'brl',
      unit_amount: prod.priceCents,
    }
  })
}

export const getProducts = async () => {
  return stripe.products.list({
    active: true,
    expand: ['data.default_price'],
  });
}

export const getProduct = (productId: string) => {
  return stripe.products.retrieve(
    productId,
    {
      expand: ['default_price']
    }
  );
}

export const updateProduct = async (product: IProduct) => {
  const newPrice = await stripe.prices.create({
    currency: 'brl',
    unit_amount: product.priceCents,
    product: product.id,
  });

  return stripe.products.update(
    product.id,
    {
      name: product.label,
      images: [product.imagePath],
      default_price: newPrice.id
    }
  )
}

export const removeProductById = (productId: string, priceId: string) => {
  return stripe.products.update(productId, {
    active: false
  });
}

export const createCheckout = async (cart: ICartProduct[]) => {
  const session = await stripe.checkout.sessions.create({
    line_items: cart.map((cp) => ({
      price: cp.priceId,
      quantity: cp.quantity,
    })),
    mode: 'payment',
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/cart`,
  });

  return session.url;
}