import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Header } from "../../components/Header"
import { getProduct, removeProductById } from "../../services/products";
import { useNavigate, useParams } from "react-router-dom";
import { ActionButtons, ActionMessage, BackLink, ButtonsWrapper, ContentHolder, ContentWrapper, ProductImage, ProductPrice, ProductTitle } from "./styles";
import { formatCentsToCurrency } from "../../utils";
import { Button } from "../../components/Button";
import { Counter } from "../../components/Counter";
import { useState } from "react";
import { useCartStore } from "../../stores/cart";
import { RegisterModal } from "../../components/RegisterModal";

export const Product = () => {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { cart, addProduct, updateProduct, removeProduct } = useCartStore()
  const { data, isError, isLoading } = useQuery({ queryKey: ['getProduct'], queryFn: () => getProduct(parseInt(productId as string)) });
  const [counterValue, setCounterValue] = useState<number>(cart.find((cp) => cp.id.toString() === productId)?.quantity || 1);
  const [openedRegisterModal, setOpenedRegisterModal] = useState<boolean>(false);
  const existingCartProduct = cart.find((cp) => cp.id.toString() === productId);

  const { mutate } = useMutation({
    mutationFn: (productId: number) => {
      return removeProductById(productId);
    },
    onSuccess:  () => {
      queryClient.invalidateQueries({ queryKey: ['getProducts'] });
      navigate('/products');
    },
  })

  const handleClickAddButton = () => {
    if(!data) { return }
    const productInCart = cart.find((cp) => cp.id === data?.id);

    if(productInCart) {
      if(counterValue === productInCart.quantity) {
        return;
      }
      if(counterValue === 0) {
        removeProduct(data.id);
      } else {
        updateProduct({
          ...data,
          quantity: counterValue,
        })
      }
    } else {
      addProduct({
        ...data,
        quantity: counterValue,
      });
    }
  }

  const getButtonLabel = () => {
    if(existingCartProduct) {
      if(counterValue === 0) {
        return 'Remover do carrinho'
      }
      return 'Atualizar carrinho'
    }

    return 'Adicionar ao carrinho'
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
              onMinus={() => { if(counterValue > 0) { setCounterValue((cv) => cv - 1) }}}
              onAdd={() => setCounterValue((cv) => cv + 1)}
              value={counterValue}/>
            <ButtonsWrapper>
              <Button
                onClick={handleClickAddButton}
                label={getButtonLabel()}/>
            </ButtonsWrapper>
          </div>
        </ContentHolder>
        {cart.find((cp) => cp.id === data?.id) ? (
          <ActionMessage>
            Exclua o produto do carrinho para habilitar ações
          </ActionMessage>
        ): (
          <ActionButtons>
            <Button
              onClick={() => {
                mutate(data.id)
              }}
              label={'Remover Produto'}/>
            <Button
              onClick={() => setOpenedRegisterModal(true)}
              label={'Atualizar Produto'}/>
          </ActionButtons>
        )}
      </ContentWrapper>
      <RegisterModal
        title={'Atualizar Produto'}
        defaultProduct={data}
        isOpened={openedRegisterModal}
        onClose={() => {setOpenedRegisterModal(false)}}/>
    </div>
  )
}