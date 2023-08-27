import { fireEvent, render, screen } from "@testing-library/react";

import { Modal } from "../../components/Modal";

describe('Modal', () => {
  it('should render component correctly', () => {
    const mockedProps = {
      isOpened: true,
      onClose: jest.fn(),
    }
    render(
      <Modal {...mockedProps}>
        <p>Test text</p>
      </Modal>
    );
    const childrenText = screen.getByText('Test text');
    const modalOverlay = screen.getByTestId('modal-overlay');

    fireEvent.click(modalOverlay);

    expect(mockedProps.onClose).toHaveBeenCalled();
    expect(childrenText).toBeInTheDocument();
  });

  it('should return null when isOpened is false', () => {
    const mockedProps = {
      isOpened: false,
      onClose: jest.fn(),
    }
    const { container } = render(
      <Modal {...mockedProps}>
        <p>Test text</p>
      </Modal>
    );

    expect(container).toBeEmptyDOMElement()
  });
});
