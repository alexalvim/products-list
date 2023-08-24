import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../../services/products"
import { Header } from "../../components/Header";
import { ButtonWrapper, ContentWrapper, MaintList } from "./styles";
import { ProductItem } from "../../components/ProductItem";
import { Button } from "../../components/Button";
import { RegisterModal } from "../../components/RegisterModal";
import { useState } from "react";

export const ProductsList = () => {
  const { data, isError, isLoading } = useQuery({ queryKey: ['getProducts'], queryFn: getProducts });
  const [openedRegisterModal, setOpenedRegisterModal] = useState<boolean>(false);

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
            onClick={() => setOpenedRegisterModal(true)}
            label={'Cadastrar Produto'}/>
        </ButtonWrapper>
      </ContentWrapper>
      <RegisterModal
        title={'Novo Produto'}
        isOpened={openedRegisterModal}
        onClose={() => {setOpenedRegisterModal(false)}}/>
    </div>
  );
}