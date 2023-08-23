import { useQuery } from "@tanstack/react-query";
import { Header } from "../../components/Header"
import { getProduct } from "../../services/products";
import { useParams } from "react-router-dom";
import { BackLink, ContentHolder, ContentWrapper, ProductImage, ProductPrice, ProductTitle } from "./styles";
import { formatCentsToCurrency } from "../../utils";
import { Button } from "../../components/Button";

export const Product = () => {
  const { productId } = useParams();
  const { data, isError, isLoading } = useQuery({ queryKey: ['getProduct'], queryFn: () => getProduct(parseInt(productId as string)) });

  if(isLoading) {
    return <ContentWrapper>Carregando</ContentWrapper>
  }

  if(isError || !data) {
    return <ContentWrapper>Erro</ContentWrapper>
  }

  return (
    <div>
      <Header
        label={'Produto'}/>
      <ContentWrapper>
        <BackLink to={'/products'}>
          Voltar para listagem
        </BackLink>
        <ContentHolder>
          <ProductImage src={data.imagePath} />
          <div>
            <ProductTitle>
              {data.label}
            </ProductTitle>
            <ProductPrice>
              R$ <b>{formatCentsToCurrency(data.priceCents)}</b>
            </ProductPrice>
            <Button
              label={'Adicionar ao carrinho'}/>
          </div>
        </ContentHolder>
      </ContentWrapper>
    </div>
  )
}