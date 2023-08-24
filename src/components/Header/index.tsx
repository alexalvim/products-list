import {
  ContentWrapper,
  ContentHolder,
  HeaderTitle,
  CustomLink,
} from "./styles";

interface IHeaderProps {
  label: string;
  showCartLink?: boolean;
}

export const Header = ({ label, showCartLink }: IHeaderProps) => {
  return (
    <ContentWrapper>
      <ContentHolder>
        <HeaderTitle>
          {label}
        </HeaderTitle>
        {showCartLink ?
          <CustomLink to='/cart'>
            Carrinho
          </CustomLink> : null}
      </ContentHolder>
    </ContentWrapper>
  );
}