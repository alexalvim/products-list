import { IProduct } from "../../types";
import { formatCentsToCurrency } from "../../utils";
import { ContentWrapper, ImageWrapper, ProductImage, ProductLabel, ProductPrice } from "./styles";

interface IProductItemProps {
  product: IProduct;
}

export const ProductItem = ({ product }: IProductItemProps) => {
  return (
    <ContentWrapper>
      <ImageWrapper>
        <ProductImage src={product.imagePath} alt={`Imagem do ${product.label}`}/>
      </ImageWrapper>
      <ProductLabel to={`/products/${product.id}`}>
        {product.label}
      </ProductLabel>
      <ProductPrice>
        R$ <b>{formatCentsToCurrency(product.priceCents)}</b>
      </ProductPrice>
    </ContentWrapper>
  );
}