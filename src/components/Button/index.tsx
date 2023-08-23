import { CustomButton } from "./styles";

interface IButtonProps {
  label: string;
}

export const Button = ({ label }: IButtonProps) => {
  return (
    <CustomButton>
      {label}
    </CustomButton>
  )
}