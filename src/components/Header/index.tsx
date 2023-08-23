import {
  ContentWrapper,
  ContentHolder,
  HeaderTitle,
} from "./styles";

interface IHeaderProps {
  label: string;
}

export const Header = ({ label }: IHeaderProps) => {
  return (
    <ContentWrapper>
      <ContentHolder>
        <HeaderTitle>
          {label}
        </HeaderTitle>
      </ContentHolder>
    </ContentWrapper>
  );
}