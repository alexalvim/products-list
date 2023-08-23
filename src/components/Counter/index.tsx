import { ActionButton, ContentWrapper, ValueHolder } from "./styles";

interface ICounterProps {
  value: number;
  onAdd: () => void;
  onMinus: () => void;
}

export const Counter = ({ value, onAdd, onMinus }: ICounterProps) => {
  return (
    <ContentWrapper>
      <ActionButton onClick={onMinus}>-</ActionButton>
      <ValueHolder>{value}</ValueHolder>
      <ActionButton onClick={onAdd}>+</ActionButton>
    </ContentWrapper>
  );
}