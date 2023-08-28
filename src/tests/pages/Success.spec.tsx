import { render, screen } from "@testing-library/react";

import { Success } from "../../pages/Success";
import { MemoryRouter } from "react-router-dom";

var mockClearCart = jest.fn();

jest.mock('../../stores/cart', () => ({
  useCartStore: () => ({
    clearCart: mockClearCart,
  })
 }));

describe('Success', () => {
  it('should render component correctly', () => {
    render(
      <MemoryRouter>
        <Success />
      </MemoryRouter>
    );
    const headerTitle = screen.getByText('Pagamento realizado');
    const pageText = screen.getByText('Seu pagamento foi realizado com sucessso');
    const pageLink = screen.getByText('Retornar para página de listagem de produtos');

    
    expect(headerTitle).toBeInTheDocument();
    expect(pageText).toBeInTheDocument();
    expect(pageLink).toBeInTheDocument();
    expect(pageLink).toHaveAttribute('href', '/products');
    expect(mockClearCart).toHaveBeenCalled();
  });
});
