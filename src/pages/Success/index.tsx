import { useEffect } from "react"
import { Header } from "../../components/Header"
import { ContentWrapper, PageLink, PageText } from "./styles"
import { useCartStore } from "../../stores/cart"

export const Success = () => {
  const { clearCart } = useCartStore()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div>
      <Header
        label="Pagamento realizado"/>
      <ContentWrapper>
        <div>
          <PageText>Seu pagamento foi realizado com sucessso</PageText>
          <PageLink to={'/products'}>Retornar para página de listagem de produtos</PageLink>
        </div>
      </ContentWrapper>
    </div>
  )
}