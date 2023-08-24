import { useQuery } from "@tanstack/react-query";
import { Header } from "../../components/Header"
import { getProduct } from "../../services/products";
import { useParams } from "react-router-dom";
import { BackLink, ButtonsWrapper, ContentHolder, ContentWrapper, ProductImage, ProductPrice, ProductTitle } from "./styles";
import { formatCentsToCurrency } from "../../utils";
import { Button } from "../../components/Button";
import { Counter } from "../../components/Counter";
import { useState } from "react";
import { useCartStore } from "../../stores/cart";

export const Product = () => {
  const { productId } = useParams();
  const { cart, addProduct, updateProduct } = useCartStore()
  const { data, isError, isLoading } = useQuery({ queryKey: ['getProduct'], queryFn: () => getProduct(parseInt(productId as string)) });
  const [counterValue, setCounterValue] = useState<number>(1);

  const handleClickAddButton = () => {
    if(!data) { return }
    const productInCart = cart.find((cp) => cp.id === data?.id);

    if(productInCart) {
      updateProduct({
        ...data,
        quantity: counterValue,
      })
    } else {
      addProduct({
        ...data,
        quantity: counterValue,
      });
    }
  }

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
                onClick={handleClickAddButton}
                label={'Adicionar ao carrinho'}/>
            </ButtonsWrapper>
          </div>
        </ContentHolder>
      </ContentWrapper>
    </div>
  )
}