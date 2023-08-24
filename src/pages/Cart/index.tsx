import { Link } from "react-router-dom"
import { Header } from "../../components/Header"
import { useCartStore } from "../../stores/cart"
import { BackLink, CartList, ContentWrapper, EmptyMessage, PurchaseLine } from "./styles"
import { CartItem } from "../../components/CartItem"
import { formatCentsToCurrency } from "../../utils";
import { Button } from "../../components/Button"

export const Cart = () => {
  const { cart, removeProduct } = useCartStore()
  return (
    <>
      <Header
        label={'Carrinho'}/>
      <ContentWrapper>
        {cart.length === 0 ?
          (
            <EmptyMessage>
              Sem itens no carrinho.<Link to={'/products'}>Voltar para listagem de produtos</Link>
            </EmptyMessage>
          ) : (
            <>
              <BackLink to={'/products'}>
                Voltar para listagem de produtos
              </BackLink>
              <CartList>
                {cart.map((cp) => (
                  <li key={cp.id}>
                    <CartItem
                      onRemove={(id) => removeProduct(id)}
                      product={cp}/>
                  </li>
                ))}
              </CartList>
              <PurchaseLine>
                <span>
                  Total: {formatCentsToCurrency(cart.reduce((acc, cp) => acc + cp.priceCents * cp.quantity, 0))}
                </span>
                <Button
                  label={"Finalizar compra"}/>
              </PurchaseLine>
            </>
          )}

      </ContentWrapper>
    </>
  )
}