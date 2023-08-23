import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../../services/products"

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
      <h1>ProductsList</h1>
      <ul>
        {data.map((p) => (<li>{p.label}</li>))}
      </ul>
    </div>
  );
}