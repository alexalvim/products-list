import { fireEvent, render, screen } from "@testing-library/react";

import * as cartStore from "../../stores/cart";
import * as serviceProducts from "../../services/products";
import { Cart } from "../../pages/Cart";
import { MemoryRouter } from "react-router-dom";
import { formatCentsToCurrency } from "../../utils";


describe('Cart', () => {
  it('should render empty page correctly', () => {
    const mockedRefreshCart = jest.fn();

    jest.spyOn(cartStore, "useCartStore").mockImplementation(() => ({
      cart: [],
      removeProduct: jest.fn(),
      refreshCart: mockedRefreshCart,
    }));

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );
    const headerTitle = screen.getByText('Carrinho');
    const emptyStateText = screen.getByText('Sem itens no carrinho.');
    const emptyStateLink = screen.getByText('Voltar para listagem de produtos');

    
    expect(headerTitle).toBeInTheDocument();
    expect(emptyStateText).toBeInTheDocument();
    expect(emptyStateLink).toBeInTheDocument();
    expect(emptyStateLink).toHaveAttribute('href', '/products');
    expect(mockedRefreshCart).toHaveBeenCalled();
  });

  it('should render page correctly', () => {
    const mockedRemoveCart = jest.fn();
    const mockedCreateCheckout = jest.fn();
    const mockedProduct= {
      label: 'Test label',
      imagePath: 'Test image path',
      priceCents: 1000,
      id: 'productId',
      priceId: 'priceId',
      quantity: 3,
    }

    jest.spyOn(cartStore, "useCartStore").mockImplementation(() => ({
      cart: [mockedProduct],
      removeProduct: mockedRemoveCart,
      refreshCart: jest.fn(),
    }));

    jest.spyOn(serviceProducts, "createCheckout").mockImplementation(mockedCreateCheckout);

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );
    const backLink = screen.getByText('Voltar para listagem de produtos');
    const removeButton = screen.getByText('Remover do carrinho');
    const totalPriceText = screen.getAllByText(`Total: R$ ${formatCentsToCurrency(mockedProduct.quantity * mockedProduct.priceCents)}`);
    const buyButton = screen.getByText('Finalizar compra');

    fireEvent.click(removeButton);
    fireEvent.click(buyButton);
    
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/products');
    expect(mockedRemoveCart).toHaveBeenCalledWith(mockedProduct.id);
    expect(totalPriceText[0]).toBeInTheDocument();
    expect(totalPriceText[1]).toBeInTheDocument();
    expect(buyButton).toBeInTheDocument();
    expect(mockedCreateCheckout).toHaveBeenCalledWith([mockedProduct]);
  });
});
