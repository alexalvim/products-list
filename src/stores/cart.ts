import { create } from 'zustand';
import { ICartProduct } from '../types';

interface ICartStore {
  cart: ICartProduct[];
  addProduct: (cartProduct: ICartProduct) => void;
  updateProduct: (cartProduct: ICartProduct) => void;
}

export const useCartStore = create<ICartStore>((set) => ({
  cart: [],

  addProduct: (cartProduct: ICartProduct) => {
    set((state) => ({ cart: [ ...state.cart, cartProduct ] }))
  },

  updateProduct: (cartProduct: ICartProduct) => {
    set((state) => ({ cart: [...state.cart.filter((cp) => cp.id !== cartProduct.id), cartProduct] }))
  }
}))