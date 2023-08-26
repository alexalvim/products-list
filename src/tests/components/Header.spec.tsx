import { render, screen } from "@testing-library/react";

import { Header } from "../../components/Header";
import { MemoryRouter } from "react-router-dom";

describe('Header', () => {

  it('should render component correctly', () => {
    const mockedProps = {
      label: 'Header Label',
      showCartLink: false,
    }

    render(
      <MemoryRouter>
        <Header {...mockedProps} />
      </MemoryRouter>
    );
    const headerTitle = screen.getByText(mockedProps.label);

    expect(headerTitle).toBeInTheDocument();
  });

  it('should render component correctly with cart link', () => {
    const mockedProps = {
      label: 'Header Label',
      showCartLink: true,
    }

    render(
      <MemoryRouter>
        <Header {...mockedProps} />
      </MemoryRouter>
    );
    const headerTitle = screen.getByText(mockedProps.label);
    const cartLink = screen.getByText('Carrinho');

    expect(headerTitle).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute('href', '/cart');
  });
});
