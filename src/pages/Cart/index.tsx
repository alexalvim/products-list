import { Link } from "react-router-dom"
import { Header } from "../../components/Header"
import { useCartStore } from "../../stores/cart"
import { BackLink, CartList, ContentWrapper, EmptyMessage, PurchaseLine } from "./styles"
import { CartItem } from "../../components/CartItem"
import { formatCentsToCurrency } from "../../utils";
import { Button } from "../../components/Button"
import { createCheckout } from "../../services/products"
import { useEffect } from "react"

export const Cart = () => {
  const { cart, removeProduct, refreshCart } = useCartStore();

  useEffect(() => {
    if(cart.length === 0) {
      refreshCart();
    }
  }, [])

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
                  Total: R$ {formatCentsToCurrency(cart.reduce((acc, cp) => acc + cp.priceCents * cp.quantity, 0))}
                </span>
                <Button
                  onClick={async () => {
                    const checkoutUrl = await createCheckout(cart)

                    if(checkoutUrl) {
                      window.location.href = checkoutUrl;
                    }
                  }}
                  label={"Finalizar compra"}/>
              </PurchaseLine>
            </>
          )}

      </ContentWrapper>
    </>
  )
}