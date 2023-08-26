import { fireEvent, render, screen } from "@testing-library/react";

import { CartItem } from "../../components/CartItem";
import { MemoryRouter } from "react-router-dom";
import { formatCentsToCurrency } from "../../utils";

describe('CartItem', () => {
  it('should render component correctly', () => {
    const mockedProps = {
      product: {
        label: 'TestLabel',
        imagePath: 'ImagePath',
        priceCents: 1000,
        id: 'product1',
        priceId: 'price1',
        quantity: 3,
      },
      onRemove: jest.fn(),
    }
    render(
      <MemoryRouter>
        <CartItem {...mockedProps} />
      </MemoryRouter>
    );
    const productLabel = screen.getByText(mockedProps.product.label);
    const productQuantity = screen.getByText(`${mockedProps.product.quantity}x`);
    const productPrice = screen.getByText(`R$ ${formatCentsToCurrency(mockedProps.product.priceCents)} cada`);
    const productTotalPrice = screen.getByText(
      `Total: R$ ${formatCentsToCurrency(mockedProps.product.quantity * mockedProps.product.priceCents)}`
    );
    const removeButton = screen.getByText('Remover do carrinho');
    const productImage = screen.getByAltText(`Imagem do ${mockedProps.product.label}`);

    fireEvent.click(removeButton);

    expect(productLabel).toBeInTheDocument();
    expect(productLabel).toHaveAttribute('href', `/products/${mockedProps.product.id}`);
    expect(productQuantity).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(productTotalPrice).toBeInTheDocument();
    expect(mockedProps.onRemove).toHaveBeenCalledWith(mockedProps.product.id);
    expect(productImage).toHaveAttribute('src', mockedProps.product.imagePath);
  });
});
