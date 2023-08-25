import { create } from 'zustand';
import { ICartProduct } from '../types';

interface ICartStore {
  cart: ICartProduct[];
  addProduct: (cartProduct: ICartProduct) => void;
  updateProduct: (cartProduct: ICartProduct) => void;
  removeProduct: (cartProduct: number | string) => void;
  refreshCart: () => void;
  clearCart: () => void;
}

export const useCartStore = create<ICartStore>((set) => ({
  cart: [],

  refreshCart: () => {
    const legacyProductList = JSON.parse(window.localStorage.getItem('products_list_cart') || '[]');
    if(legacyProductList && legacyProductList.length > 0) {
      set({ cart: legacyProductList });
    }
  },

  addProduct: (cartProduct: ICartProduct) => {
    set((state) => {
      const newCart = [ ...state.cart, cartProduct ];
      localStorage.setItem('products_list_cart', JSON.stringify(newCart));
      return ({ cart: newCart });
    });
  },

  updateProduct: (cartProduct: ICartProduct) => {
    set((state) => {
      const newCart = [...state.cart.filter((cp) => cp.id !== cartProduct.id), cartProduct];
      localStorage.setItem('products_list_cart', JSON.stringify(newCart));
      return ({ cart: newCart });
    });
  },

  removeProduct: (cartProductId) => {
    set((state) => {
      const newCart = [...state.cart.filter((cp) => cp.id !== cartProductId)];
      localStorage.setItem('products_list_cart', JSON.stringify(newCart));
      return ({ cart: newCart });
    });
  },

  clearCart: () => {
    localStorage.setItem('products_list_cart', JSON.stringify([]));
    set({ cart: [] });
  },
}))