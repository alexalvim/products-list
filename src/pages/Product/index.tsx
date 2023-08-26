import { UseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Header } from "../../components/Header"
import { getProduct, removeProductById } from "../../services/products";
import { useNavigate, useParams } from "react-router-dom";
import { ActionButtons, ActionMessage, BackLink, ButtonsWrapper, ContentHolder, ContentWrapper, ProductImage, ProductPrice, ProductTitle } from "./styles";
import { formatCentsToCurrency } from "../../utils";
import { Button } from "../../components/Button";
import { Counter } from "../../components/Counter";
import { useEffect, useState } from "react";
import { useCartStore } from "../../stores/cart";
import { RegisterModal } from "../../components/RegisterModal";
import { IStripeProduct } from "../../types";

export const Product = () => {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { cart, addProduct, updateProduct, removeProduct, refreshCart } = useCartStore()
  const { data: product, isError, isLoading }: UseQueryResult<IStripeProduct> = useQuery({ queryKey: ['getProduct'], queryFn: () => getProduct(productId as string) });
  const [counterValue, setCounterValue] = useState<number>(cart.find((cp) => cp.id.toString() === productId)?.quantity || 1);
  const [openedRegisterModal, setOpenedRegisterModal] = useState<boolean>(false);
  const existingCartProduct = cart.find((cp) => cp.id.toString() === productId);

  useEffect(() => {
    if(cart.length === 0) {
      refreshCart();
    }
  }, [])

  const { mutate } = useMutation({
    mutationFn: (id: string) => {
      return removeProductById(id);
    },
    onSuccess:  () => {
      queryClient.invalidateQueries({ queryKey: ['getProducts'] });
      navigate('/products');
    },
  })

  const handleClickAddButton = () => {
    if(!product) { return }
    const productInCart = cart.find((cp) => cp.id === product?.id);

    if(productInCart) {
      if(counterValue === productInCart.quantity) {
        return;
      }
      if(counterValue === 0) {
        removeProduct(product.id);
      } else {
        updateProduct({
          id: product.id,
          label: product.name,
          imagePath: product.images[0],
          priceCents: product.default_price.unit_amount,
          quantity: counterValue,
          priceId: product.default_price.id,
        })
      }
    } else {
      addProduct({
        id: product.id,
        label: product.name,
        imagePath: product.images[0],
        priceCents: product.default_price.unit_amount,
        quantity: counterValue,
        priceId: product.default_price.id,
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

  if(isLoading || (product && product.id !== productId)) {
    return (
      <div>
        <Header
          showCartLink={true}
          label={'Produto'}/>
        <ContentWrapper>
          Carregando
        </ContentWrapper>
      </div>
    )
  }

  if(isError || !product || !product.active) {
    return (
      <div>
        <Header
          showCartLink={true}
          label={'Produto'}/>
        <ContentWrapper>
          Erro ao buscar produto
        </ContentWrapper>
      </div>
    )
  }

  return (
    <div>
      <Header
        showCartLink={true}
        label={'Produto'}/>
      <ContentWrapper>
        <BackLink to={'/products'}>
          Voltar para listagem
        </BackLink>
        <ContentHolder>
          <ProductImage src={product.images[0]} />
          <div>
            <ProductTitle>
              {product.name}
            </ProductTitle>
            <ProductPrice>
              R$ <b>{formatCentsToCurrency(product.default_price.unit_amount)}</b>
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
        {cart.find((cp) => cp.id === product.id) ? (
          <ActionMessage>
            Exclua o produto do carrinho para habilitar ações
          </ActionMessage>
        ): (
          <ActionButtons>
            <Button
              onClick={() => {
                mutate(product.id)
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
        defaultProduct={{
          label: product.name,
          imagePath: product.images[0],
          priceCents: product.default_price.unit_amount,
          id: product.id,
        }}
        isOpened={openedRegisterModal}
        onClose={() => {setOpenedRegisterModal(false)}}/>
    </div>
  )
}