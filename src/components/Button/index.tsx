import { CustomButton } from "./styles";

interface IButtonProps {
  label: string;
  onClick?: () => void;
}

export const Button = ({ label, onClick }: IButtonProps) => {
  return (
    <CustomButton {...{onClick}}>
      {label}
    </CustomButton>
  )
}