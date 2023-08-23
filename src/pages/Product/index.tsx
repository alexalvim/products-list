import { useQuery } from "@tanstack/react-query";
import { Header } from "../../components/Header"
import { getProduct } from "../../services/products";
import { useParams } from "react-router-dom";
import { BackLink, ButtonsWrapper, ContentHolder, ContentWrapper, ProductImage, ProductPrice, ProductTitle } from "./styles";
import { formatCentsToCurrency } from "../../utils";
import { Button } from "../../components/Button";
import { Counter } from "../../components/Counter";
import { useState } from "react";

export const Product = () => {
  const { productId } = useParams();
  const { data, isError, isLoading } = useQuery({ queryKey: ['getProduct'], queryFn: () => getProduct(parseInt(productId as string)) });
  const [counterValue, setCounterValue] = useState<number>(1);

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
            <Counter
              onMinus={() => { if(counterValue > 1) { setCounterValue((cv) => cv - 1) }}}
              onAdd={() => setCounterValue((cv) => cv + 1)}
              value={counterValue}/>
            <ButtonsWrapper>
              <Button
                label={'Adicionar ao carrinho'}/>
            </ButtonsWrapper>
          </div>
        </ContentHolder>
      </ContentWrapper>
    </div>
  )
}