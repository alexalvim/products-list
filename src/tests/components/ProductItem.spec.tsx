import { render, screen } from "@testing-library/react";

import { ProductItem } from "../../components/ProductItem";
import { MemoryRouter } from "react-router-dom";
import { formatCentsToCurrency } from "../../utils";

describe('ProductItem', () => {
  it('should render component correctly', () => {
    const mockedProps = {
      product: {
        label: 'Product Label',
        imagePath: 'Image path',
        priceCents: 1000,
        id: 'product1',
      }
    };
    render(
      <MemoryRouter>
        <ProductItem {...mockedProps} />
      </MemoryRouter>
    );
    const productLabel = screen.getByText(mockedProps.product.label);
    const productPrice = screen.getByText(formatCentsToCurrency(mockedProps.product.priceCents));
    const productImage = screen.getByAltText(`Imagem do ${mockedProps.product.label}`);


    expect(productLabel).toBeInTheDocument();
    expect(productLabel).toHaveAttribute('href', `/products/${mockedProps.product.id}`);
    expect(productPrice).toBeInTheDocument();
    expect(productImage).toHaveAttribute('src', mockedProps.product.imagePath);
  });
});
