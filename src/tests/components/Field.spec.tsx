import { fireEvent, render, screen } from "@testing-library/react";

import { Field } from "../../components/Field";

describe('Field', () => {
  it('should render component correctly', () => {
    const mockedProps = {
      label: 'Test',
      inputProps: { type: 'text' },
      error: null,
    }
    const mockedNewValue = 'new value';
    render(
      <Field
        {...mockedProps}/>
    );
    const labelText = screen.getByText(mockedProps.label);
    const fieldInput = screen.getByTestId('field-input');

    fireEvent.change(fieldInput, {
      target: { value: mockedNewValue }
    });

    expect(labelText).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockedNewValue)).toBeInTheDocument();
  });

  it('should render correctly with default required error', () => {
    const mockedProps = {
      label: 'Test',
      inputProps: { type: 'text' },
      error: { type: 'required' },
    }
    render(
      <Field
        {...mockedProps}/>
    );
    const errorText = screen.getByText('Campo obrigatório!');

    expect(errorText).toBeInTheDocument();
  });

  it('should render correctly with custom required error', () => {
    const customErrorText = 'custom required'
    const mockedProps = {
      label: 'Test',
      inputProps: { type: 'text' },
      error: { type: 'required' },
      customErrorMessages: {
        required: customErrorText,
      }
    }
    render(
      <Field
        {...mockedProps}/>
    );
    const errorText = screen.getByText(customErrorText);

    expect(errorText).toBeInTheDocument();
  });

  it('should render correctly with default minLength error', () => {
    const mockedProps = {
      label: 'Test',
      inputProps: { type: 'text' },
      error: { type: 'minLength' },
    }
    render(
      <Field
        {...mockedProps}/>
    );
    const errorText = screen.getByText('Texto muito curto para este campo!');

    expect(errorText).toBeInTheDocument();
  });

  it('should render correctly with custom minLength error', () => {
    const customErrorText = 'custom minLength'
    const mockedProps = {
      label: 'Test',
      inputProps: { type: 'text' },
      error: { type: 'minLength' },
      customErrorMessages: {
        minLength: customErrorText,
      }
    }
    render(
      <Field
        {...mockedProps}/>
    );
    const errorText = screen.getByText(customErrorText);

    expect(errorText).toBeInTheDocument();
  });

  it('should render correctly with default pattern error', () => {
    const mockedProps = {
      label: 'Test',
      inputProps: { type: 'text' },
      error: { type: 'pattern' },
    }
    render(
      <Field
        {...mockedProps}/>
    );
    const errorText = screen.getByText('Valor digitado não corresponde com o esperado nesse campo!');

    expect(errorText).toBeInTheDocument();
  });

  it('should render correctly with custom pattern error', () => {
    const customErrorText = 'custom pattern'
    const mockedProps = {
      label: 'Test',
      inputProps: { type: 'text' },
      error: { type: 'pattern' },
      customErrorMessages: {
        pattern: customErrorText,
      }
    }
    render(
      <Field
        {...mockedProps}/>
    );
    const errorText = screen.getByText(customErrorText);

    expect(errorText).toBeInTheDocument();
  });

  it('should render correctly with default min error', () => {
    const mockedProps = {
      label: 'Test',
      inputProps: { type: 'text' },
      error: { type: 'min' },
    }
    render(
      <Field
        {...mockedProps}/>
    );
    const errorText = screen.getByText('Valor minimo não atingido!');

    expect(errorText).toBeInTheDocument();
  });

  it('should render correctly with custom min error', () => {
    const customErrorText = 'custom min'
    const mockedProps = {
      label: 'Test',
      inputProps: { type: 'text' },
      error: { type: 'min' },
      customErrorMessages: {
        min: customErrorText,
      }
    }
    render(
      <Field
        {...mockedProps}/>
    );
    const errorText = screen.getByText(customErrorText);

    expect(errorText).toBeInTheDocument();
  });
});
