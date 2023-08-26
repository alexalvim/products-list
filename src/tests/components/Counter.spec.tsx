import { fireEvent, render, screen } from "@testing-library/react";

import { Counter } from "../../components/Counter";

describe('Counter', () => {
  const mockedProps = {
    value: 1,
    onAdd: jest.fn(),
    onMinus: jest.fn(),
  }

  it('should render component correctly', () => {
    render(
      <Counter {...mockedProps} />
    );
    const counterValue = screen.getByText(mockedProps.value);
    expect(counterValue).toBeInTheDocument();
  });

  it('should call correct function when user click in plus button', () => {
    render(
      <Counter {...mockedProps} />
    );
    const plusButton = screen.getByText('+');

    fireEvent.click(plusButton)

    expect(mockedProps.onAdd).toHaveBeenCalled();
  });

  it('should call correct function when user click in minus button', () => {
    render(
      <Counter {...mockedProps} />
    );
    const plusButton = screen.getByText('-');

    fireEvent.click(plusButton)

    expect(mockedProps.onMinus).toHaveBeenCalled();
  });
});
