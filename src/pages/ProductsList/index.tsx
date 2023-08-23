import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../../services/products"
import { Header } from "../../components/Header";

export const ProductsList = () => {
  const { data, isError, isLoading } = useQuery({ queryKey: ['getProducts'], queryFn: getProducts });

  if(isLoading) {
    return <>Carregando</>
  }

  if(isError) {
    return <>Erro</>
  }

  return (
    <div>
      <Header
        label={'Lista de Produtos'}/>
      <ul>
        {data.map((p) => (<li>{p.label}</li>))}
      </ul>
    </div>
  );
}