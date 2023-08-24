import { ContentWrapper, CustomInput, ErrorMessage, TextLabel } from "./styles";

interface IFieldProps {
  label: string;
  inputProps: Record<string, any>;
  error: Record<string, any> | null;
}

export const Field = ({ label, inputProps, error }: IFieldProps) => {
  return (
    <ContentWrapper>
      <TextLabel>{label}</TextLabel>
      <CustomInput {...inputProps}/>
      {error ?
        <ErrorMessage>
          {error.type === 'required' ? 'Campo obrigatório!': null}
          {error.type === 'minLength' ? 'Texto muito curto para este campo!': null}
        </ErrorMessage>
      : null}
    </ContentWrapper>
  )
}