import { IProduct, IRequestError } from "../types"

const BASE_URL = 'http://localhost:3003';


export const getProducts = (): Promise<IProduct[]> | IProduct[] => {
  try {
    return fetch(`${BASE_URL}/products`).then((res) => res.json())
  } catch (e: IRequestError | unknown) {
    reportError({ message: (e as IRequestError).message || 'Request Error'})
    return [];
  }
}

export const getProduct = (productId: number): Promise<IProduct> | null => {
  try {
    return fetch(`${BASE_URL}/products/${productId}`).then((res) => res.json())
  } catch (e: IRequestError | unknown) {
    reportError({ message: (e as IRequestError).message || 'Request Error'})
    return null;
  }
}

interface ICreateProductProps {
  label: string;
  imagePath: string;
  priceCents: number;
}

export const createProduct = (product: ICreateProductProps): Promise<IProduct> | null => {
  try {
    return fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(product)
    }).then((res) => res.json())
  } catch (e: IRequestError | unknown) {
    reportError({ message: (e as IRequestError).message || 'Request Error'})
    return null;
  }
}

export const updateProduct = (product: IProduct): Promise<IProduct> | null => {
  try {
    return fetch(`${BASE_URL}/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        label: product.label,
        imagePath: product.imagePath
      })
    }).then((res) => res.json())
  } catch (e: IRequestError | unknown) {
    reportError({ message: (e as IRequestError).message || 'Request Error'})
    return null;
  }
}

export const removeProductById = (productId: number): void => {
  try {
    fetch(`${BASE_URL}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
    }).then((res) => res.json())
  } catch (e: IRequestError | unknown) {
    reportError({ message: (e as IRequestError).message || 'Request Error'})
  }
}