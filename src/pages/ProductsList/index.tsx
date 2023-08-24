import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../../services/products"
import { Header } from "../../components/Header";
import { ButtonWrapper, ContentWrapper, MaintList } from "./styles";
import { ProductItem } from "../../components/ProductItem";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";

export const ProductsList = () => {
  const { data, isError, isLoading } = useQuery({ queryKey: ['getProducts'], queryFn: getProducts });

  if(isLoading) {
    return <ContentWrapper>Carregando</ContentWrapper>
  }

  if(isError) {
    return <ContentWrapper>Erro</ContentWrapper>
  }

  return (
    <div>
      <Header
        label={'Lista de Produtos'}/>
      <ContentWrapper>
        <MaintList>
          {data.map((p) => (
            <li key={p.id}>
              <ProductItem
                product={p}/>
            </li>
          ))}
        </MaintList>
        <ButtonWrapper>
          <Button
            label={'Cadastrar Produto'}/>
        </ButtonWrapper>
      </ContentWrapper>
    </div>
  );
}