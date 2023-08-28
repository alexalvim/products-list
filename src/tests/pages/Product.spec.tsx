import { fireEvent, render, screen } from "@testing-library/react";

import * as cartStore from "../../stores/cart";
import * as reactQuery from "@tanstack/react-query";
import { Product } from "../../pages/Product";
import { MemoryRouter } from "react-router-dom";
import { formatCentsToCurrency } from "../../utils";

var mockedProductId = 'productId';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    productId: mockedProductId
  }),
}));


describe('Product', () => {
  it('should render isLoading page correctly', () => {
    jest.spyOn(reactQuery, "useQueryClient").mockImplementation(jest.fn());
    jest.spyOn(reactQuery, "useQuery").mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    } as any);
    jest.spyOn(reactQuery, "useMutation").mockReturnValue({
      mutate: jest.fn(),
    } as any);

    render(
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    );

    const headerTitle = screen.getByText('Produto');
    const loadingText = screen.getByText('Carregando');

    expect(headerTitle).toBeInTheDocument();
    expect(loadingText).toBeInTheDocument();
  });

  it('should render isError page correctly', () => {
    jest.spyOn(reactQuery, "useQueryClient").mockImplementation(jest.fn());
    jest.spyOn(reactQuery, "useQuery").mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    } as any);
    jest.spyOn(reactQuery, "useMutation").mockReturnValue({
      mutate: jest.fn(),
    } as any);

    render(
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    );

    const headerTitle = screen.getByText('Produto');
    const loadingText = screen.getByText('Erro ao buscar produto');

    expect(headerTitle).toBeInTheDocument();
    expect(loadingText).toBeInTheDocument();
  });

  it('should render page correctly', () => {
    const mockedRefreshCart = jest.fn();
    const mockedAddProduct = jest.fn();
    const mockedProduct = {
      active: true,
      default_price: {
        unit_amount: 1000,
      },
      id: mockedProductId,
      images: ['imagePath'],
      name: 'Product Name',
    };

    jest.spyOn(cartStore, "useCartStore").mockImplementation(() => ({
      cart: [],
      refreshCart: mockedRefreshCart,
      addProduct: mockedAddProduct,
    }));
    jest.spyOn(reactQuery, "useQueryClient").mockImplementation(jest.fn());
    jest.spyOn(reactQuery, "useQueryClient").mockImplementation(jest.fn());
    jest.spyOn(reactQuery, "useQuery").mockReturnValue({
      data: mockedProduct,
      isLoading: false,
      isError: false,
    } as any);
    jest.spyOn(reactQuery, "useMutation").mockReturnValue({
      mutate: jest.fn(),
    } as any);

    render(
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    );

    const headerTitle = screen.getByText('Produto');
    const productName = screen.getByText(mockedProduct.name);
    const productPrice = screen.getByText(formatCentsToCurrency(mockedProduct.default_price.unit_amount));
    const addButtonLabel = screen.getByText('Adicionar ao carrinho');
    const updateProductButton = screen.getByText('Atualizar Produto');
    const removeProductButton = screen.getByText('Remover Produto');

    fireEvent.click(addButtonLabel)

    expect(headerTitle).toBeInTheDocument();
    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(addButtonLabel).toBeInTheDocument();
    expect(updateProductButton).toBeInTheDocument();
    expect(removeProductButton).toBeInTheDocument();
    expect(mockedAddProduct).toHaveBeenCalled();
    expect(mockedRefreshCart).toHaveBeenCalled();
  });

  it('should render page correctly with product in Cart updating item', () => {
    const mockedUpdateProduct = jest.fn();
    const mockedQuantity = 1;
    const mockedProduct = {
      active: true,
      default_price: {
        unit_amount: 1000,
        id: 'priceId'
      },
      id: mockedProductId,
      images: ['imagePath'],
      name: 'Product Name',
    };

    jest.spyOn(cartStore, "useCartStore").mockImplementation(() => ({
      cart: [{
        label: mockedProduct.name,
        imagePath: mockedProduct.images[0],
        priceCents: mockedProduct.default_price.unit_amount,
        id: mockedProduct.id,
        priceId: mockedProduct.default_price.id,
        quantity: mockedQuantity,
      }],
      updateProduct: mockedUpdateProduct,
    }));
    jest.spyOn(reactQuery, "useQueryClient").mockImplementation(jest.fn());
    jest.spyOn(reactQuery, "useQueryClient").mockImplementation(jest.fn());
    jest.spyOn(reactQuery, "useQuery").mockReturnValue({
      data: mockedProduct,
      isLoading: false,
      isError: false,
    } as any);
    jest.spyOn(reactQuery, "useMutation").mockReturnValue({
      mutate: jest.fn(),
    } as any);

    render(
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    );

    const headerTitle = screen.getByText('Produto');
    const productName = screen.getByText(mockedProduct.name);
    const productPrice = screen.getByText(formatCentsToCurrency(mockedProduct.default_price.unit_amount));
    const addButton = screen.getByText('Atualizar carrinho');
    const messageLabel = screen.getByText('Exclua o produto do carrinho para habilitar ações');
    const addCounterButton = screen.getByText('+');

    fireEvent.click(addCounterButton)
    fireEvent.click(addButton)

    expect(headerTitle).toBeInTheDocument();
    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(messageLabel).toBeInTheDocument();
    expect(mockedUpdateProduct).toHaveBeenCalledWith({
      label: mockedProduct.name,
      imagePath: mockedProduct.images[0],
      priceCents: mockedProduct.default_price.unit_amount,
      id: mockedProduct.id,
      priceId: mockedProduct.default_price.id,
      quantity: mockedQuantity + 1,
    })
  });

  it('should render page correctly with product in Cart removing item', async () => {
    const mockedRemoveProduct = jest.fn();
    const mockedQuantity = 1;
    const mockedProduct = {
      active: true,
      default_price: {
        unit_amount: 1000,
        id: 'priceId'
      },
      id: mockedProductId,
      images: ['imagePath'],
      name: 'Product Name',
    };

    jest.spyOn(cartStore, "useCartStore").mockImplementation(() => ({
      cart: [{
        label: mockedProduct.name,
        imagePath: mockedProduct.images[0],
        priceCents: mockedProduct.default_price.unit_amount,
        id: mockedProduct.id,
        priceId: mockedProduct.default_price.id,
        quantity: mockedQuantity,
      }],
      removeProduct: mockedRemoveProduct,
    }));
    jest.spyOn(reactQuery, "useQueryClient").mockImplementation(jest.fn());
    jest.spyOn(reactQuery, "useQueryClient").mockImplementation(jest.fn());
    jest.spyOn(reactQuery, "useQuery").mockReturnValue({
      data: mockedProduct,
      isLoading: false,
      isError: false,
    } as any);
    jest.spyOn(reactQuery, "useMutation").mockReturnValue({
      mutate: jest.fn(),
    } as any);

    render(
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    );

    const headerTitle = screen.getByText('Produto');
    const productName = screen.getByText(mockedProduct.name);
    const productPrice = screen.getByText(formatCentsToCurrency(mockedProduct.default_price.unit_amount));
    const messageLabel = screen.getByText('Exclua o produto do carrinho para habilitar ações');
    const minusCounterButton = screen.getByText('-');

    fireEvent.click(minusCounterButton)

    const updateButton = screen.getByText('Remover do carrinho');

    fireEvent.click(updateButton)

    expect(headerTitle).toBeInTheDocument();
    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(updateButton).toBeInTheDocument();
    expect(messageLabel).toBeInTheDocument();
    expect(mockedRemoveProduct).toHaveBeenCalledWith(mockedProduct.id)
  });
});
