import { ContentWrapper, CustomInput, ErrorMessage, TextLabel } from "./styles";

interface IFieldProps {
  label: string;
  inputProps: Record<string, any>;
  error: Record<string, any> | null;
  customErrorMessages?: Record<string,string>;
}

export const Field = ({ label, inputProps, error, customErrorMessages }: IFieldProps) => {
  return (
    <ContentWrapper>
      <TextLabel>{label}</TextLabel>
      <CustomInput data-testid={'field-input'} {...inputProps}/>
      {error ?
        <ErrorMessage>
          {error.type === 'required' ?
            (customErrorMessages && customErrorMessages['required']) ||
            'Campo obrigatório!' : null}
          {error.type === 'minLength' ?
            (customErrorMessages && customErrorMessages['minLength']) ||
            'Texto muito curto para este campo!' : null}
          {error.type === 'pattern' ?
            (customErrorMessages && customErrorMessages['pattern']) ||
            'Valor digitado não corresponde com o esperado nesse campo!' : null}
          {error.type === 'min' ?
            (customErrorMessages && customErrorMessages['min']) ||
            'Valor minimo não atingido!' : null}
        </ErrorMessage>
      : null}
    </ContentWrapper>
  )
}