import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { formatCurrencyToCents, formatCentsToCurrency } from '../../utils';
import { RegisterModal } from "../../components/RegisterModal";

var mockMutate = jest.fn();

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({
    invalidateQueries: jest.fn()
  }),
  useMutation: () => ({
    mutate: mockMutate
  })
 }));

describe('RegisterModal', () => {

  it('should render component correctly', () => {
    const mockedProps = {
      isOpened: true,
      onClose: jest.fn(),
      title: 'Test Title',
    }
    render(
      <RegisterModal {...mockedProps} />
    );
    const modalTitle = screen.getByText(mockedProps.title);
    const closeButton = screen.getByText('Fechar');
    const labelText = screen.getByText('Nome do produto');
    const pathText = screen.getByText('URL da imagem');
    const priceText = screen.getByText('Preço(em reais)');

    fireEvent.click(closeButton)

    expect(modalTitle).toBeInTheDocument();
    expect(mockedProps.onClose).toHaveBeenCalled();
    expect(labelText).toBeInTheDocument();
    expect(pathText).toBeInTheDocument();
    expect(priceText).toBeInTheDocument();
  });

  it('should return null when isOpened is false', () => {
    const mockedProps = {
      isOpened: false,
      onClose: jest.fn(),
      title: 'Test Title',
    }
    const { container } = render(
      <RegisterModal {...mockedProps} />
    );
    
    expect(container).toBeEmptyDOMElement()
  });

  it('should render component correctly with default product', () => {
    const mockedProps = {
      isOpened: true,
      onClose: jest.fn(),
      title: 'Test Title',
      defaultProduct: {
        label: 'Test label',
        imagePath: 'Test path',
        priceCents: 1000,
        id: 'productId1'
      }
    }
    render(
      <RegisterModal {...mockedProps} />
    );
    const modalTitle = screen.getByText(mockedProps.title);
    const closeButton = screen.getByText('Fechar');
    const labelText = screen.getByText('Nome do produto');
    const pathText = screen.getByText('URL da imagem');
    const priceText = screen.getByText('Preço(em reais)');

    fireEvent.click(closeButton)

    expect(modalTitle).toBeInTheDocument();
    expect(mockedProps.onClose).toHaveBeenCalled();
    expect(labelText).toBeInTheDocument();
    expect(pathText).toBeInTheDocument();
    expect(priceText).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockedProps.defaultProduct.label)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockedProps.defaultProduct.imagePath)).toBeInTheDocument();
    expect(screen.getByDisplayValue(formatCentsToCurrency(mockedProps.defaultProduct.priceCents))).toBeInTheDocument();
  });

  it('should show saving message when product is saved', async () => {
    const mockedProps = {
      isOpened: true,
      onClose: jest.fn(),
      title: 'Test Title',
      defaultProduct: {
        label: 'Test label',
        imagePath: 'Test image path.',
        priceCents: 1000,
        id: 'productId1'
      }
    }
    render(
      <RegisterModal {...mockedProps} />
    );

    const saveButton = screen.getByText('Salvar');

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('Salvando...')).toBeInTheDocument();
    })
  });

  it('should call update mutate when form is submitted', async () => {
    const mockedProps = {
      isOpened: true,
      onClose: jest.fn(),
      title: 'Test Title',
      defaultProduct: {
        label: 'Test label',
        imagePath: 'Test image path.',
        priceCents: 1000,
        id: 'productId1'
      }
    }
    render(
      <RegisterModal {...mockedProps} />
    );

    const saveButton = screen.getByText('Salvar');

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(mockedProps.defaultProduct);
    })
  });

  it('should call create mutate when form is submitted', async () => {
    const mockedProps = {
      isOpened: true,
      onClose: jest.fn(),
      title: 'Test Title',
    }
    const mockProduct = {
      label: 'Test label',
      imagePath: 'Test image path.',
      priceCents: '10,00',
    }
    render(
      <RegisterModal {...mockedProps} />
    );
    const labelField = screen.getByLabelText('Nome do produto');
    const imageField = screen.getByLabelText('URL da imagem');
    const priceField = screen.getByLabelText('Preço(em reais)');

    fireEvent.change(labelField, {
      target: { value: mockProduct.label }
    });

    fireEvent.change(imageField, {
      target: { value: mockProduct.imagePath }
    });

    fireEvent.change(priceField, {
      target: { value: mockProduct.priceCents }
    });

    const saveButton = screen.getByText('Salvar');

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        ...mockProduct,
        priceCents: formatCurrencyToCents(mockProduct.priceCents)
      });
    })
  });
});
