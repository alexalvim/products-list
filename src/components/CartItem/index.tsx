import { Link } from "react-router-dom"
import { ICartProduct } from "../../types"
import { ContentHolder, ContentWrapper, ProductImage, ProductLabel, ProductPrice, TotalPrice } from "./styles"
import { formatCentsToCurrency } from "../../utils"
import { Button } from "../Button"

interface ICartItemProps {
  product: ICartProduct;
  onRemove: (id: number) => void;
}

export const CartItem = ({ product, onRemove }: ICartItemProps) => {
  return (
    <ContentWrapper>
      <ProductImage src={product.imagePath} alt={`Imagem dom ${product.label}`} />
      <ContentHolder>
        <div>
          <ProductLabel>
            {product.quantity}x
            <Link to={`/products/${product.id}`}>
              {product.label}
            </Link>
          </ProductLabel>
          <ProductPrice>
            R$ {formatCentsToCurrency(product.priceCents)} cada
          </ProductPrice>
          <TotalPrice>
            Total: R$ {formatCentsToCurrency(product.priceCents * product.quantity)}
          </TotalPrice>
        </div>
        <Button
          onClick={() => onRemove(product.id)}
          label={'Remover do carrinho'}/>
      </ContentHolder>
    </ContentWrapper>
  )
}