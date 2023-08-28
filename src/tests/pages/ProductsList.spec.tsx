import { fireEvent, render, screen } from "@testing-library/react";

import * as reactQuery from "@tanstack/react-query";
import { ProductsList } from "../../pages/ProductsList";
import { MemoryRouter } from "react-router-dom";

var mockClearCart = jest.fn();

jest.mock('../../stores/cart', () => ({
  useCartStore: () => ({
    clearCart: mockClearCart,
  })
 }));

describe('ProductsList', () => {
  it('should render page correctly in loading state', () => {
    jest.spyOn(reactQuery, "useQuery").mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    } as any);

    render(
      <MemoryRouter>
        <ProductsList />
      </MemoryRouter>
    );
    const headerTitle = screen.getByText('Lista de Produtos');
    const pageText = screen.getByText('Carregando');

    expect(headerTitle).toBeInTheDocument();
    expect(pageText).toBeInTheDocument();
  });

  it('should render page correctly in error state', () => {
    jest.spyOn(reactQuery, "useQuery").mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    } as any);

    render(
      <MemoryRouter>
        <ProductsList />
      </MemoryRouter>
    );
    const headerTitle = screen.getByText('Lista de Produtos');
    const pageText = screen.getByText('Erro ao carregar produtos');

    expect(headerTitle).toBeInTheDocument();
    expect(pageText).toBeInTheDocument();
  });

  it('should render page correctly with empty list', () => {
    jest.spyOn(reactQuery, "useQueryClient").mockImplementation(jest.fn());
    jest.spyOn(reactQuery, "useMutation").mockReturnValue({
      mutate: jest.fn(),
    } as any);
    jest.spyOn(reactQuery, "useQuery").mockReturnValue({
      data: {
        data: []
      },
      isLoading: false,
      isError: false,
    } as any);

    render(
      <MemoryRouter>
        <ProductsList />
      </MemoryRouter>
    );
    const headerTitle = screen.getByText('Lista de Produtos');
    const emptyMessage = screen.getByText('Nenhum produto encontrado.');
    
    expect(headerTitle).toBeInTheDocument();
    expect(emptyMessage).toBeInTheDocument();
  });

  it('should render page correctly with completed list clicking in register product', () => {
    const mockedProduct = {
      name: 'Product name',
      images: ['Image 1'],
      id: 'productId',
      default_price: {
        unit_amount: 1000,
      }
    }
    jest.spyOn(reactQuery, "useQueryClient").mockImplementation(jest.fn());
    jest.spyOn(reactQuery, "useMutation").mockReturnValue({
      mutate: jest.fn(),
    } as any);
    jest.spyOn(reactQuery, "useQuery").mockReturnValue({
      data: {
        data: [mockedProduct]
      },
      isLoading: false,
      isError: false,
    } as any);

    render(
      <MemoryRouter>
        <ProductsList />
      </MemoryRouter>
    );
    const headerTitle = screen.getByText('Lista de Produtos');
    const productName = screen.getByText(mockedProduct.name);
    const productImage = screen.getByAltText(`Imagem do ${mockedProduct.name}`);
    const newProductButton = screen.getByText('Cadastrar Produto');
    
    expect(headerTitle).toBeInTheDocument();
    expect(productName).toBeInTheDocument();
    expect(productName).toHaveAttribute('href', `/products/${mockedProduct.id}`);
    expect(productImage).toHaveAttribute('src', mockedProduct.images[0]);
    expect(newProductButton).toBeInTheDocument();

    fireEvent.click(newProductButton);

    const modalTitle = screen.getByText('Novo Produto');

    expect(modalTitle).toBeInTheDocument();
  });
});
