import { UseQueryResult, useQuery } from "@tanstack/react-query"
import { getProducts } from "../../services/products"
import { Header } from "../../components/Header";
import { ButtonWrapper, ContentWrapper, MaintList } from "./styles";
import { ProductItem } from "../../components/ProductItem";
import { Button } from "../../components/Button";
import { RegisterModal } from "../../components/RegisterModal";
import { useState } from "react";
import { IStripeProductResponse } from "../../types";

export const ProductsList = () => {
  const { data: products, isError, isLoading }: UseQueryResult<IStripeProductResponse> = useQuery({ queryKey: ['getProducts'], queryFn: getProducts });
  const [openedRegisterModal, setOpenedRegisterModal] = useState<boolean>(false);

  if(isLoading) {
    return (
      <div>
        <Header
          showCartLink={true}
          label={'Lista de Produtos'}/>
        <ContentWrapper>Carregando</ContentWrapper>
      </div>
    );
  }

  if(isError) {
    return (
      <div>
        <Header
          showCartLink={true}
          label={'Lista de Produtos'}/>
        <ContentWrapper>Erro ao carregar produtos</ContentWrapper>
      </div>
    );
  }

  return (
    <div>
      <Header
        showCartLink={true}
        label={'Lista de Produtos'}/>
      <ContentWrapper>
        <MaintList>
          {products.data.map((p) => (
            <li key={p.id}>
              <ProductItem
                product={{
                  label: p.name,
                  imagePath: p.images[0],
                  priceCents: p.default_price.unit_amount,
                  id: p.id,
                }}/>
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