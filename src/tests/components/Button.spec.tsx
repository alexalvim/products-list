import { fireEvent, render, screen } from "@testing-library/react";

import { Button } from "../../components/Button";

describe('Button', () => {
  it('should render component correctly', () => {
    const mockedProps = {
      label: 'Test',
      onClick: jest.fn(),
    }
    render(
      <Button {...mockedProps} />
    );
    const buttonLabel = screen.getByText(mockedProps.label);
    fireEvent.click(buttonLabel);

    expect(mockedProps.onClick).toHaveBeenCalled();
    expect(buttonLabel).toBeInTheDocument();
  });
});
