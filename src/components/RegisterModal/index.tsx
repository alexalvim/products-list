import { SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "../Modal"
import { ButtonsWrapper, CustomSubmit, FieldsWrapper, ModalTitle } from "./styles";
import { Field } from "../Field";
import { Button } from "../Button";
import { formatCurrencyToCents, formatCentsToCurrency } from "../../utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreateProductProps, createProduct, updateProduct } from "../../services/products";
import { IProduct } from "../../types";

interface IRegisterModalProps {
  isOpened: boolean;
  onClose: () => void;
  title: string;
  defaultProduct?: IProduct;
}

interface IRegisterInputs {
  label: string;
  imagePath: string;
  price: string;
};

export const RegisterModal = ({ isOpened, onClose, defaultProduct, title }: IRegisterModalProps) => {
  const queryClient = useQueryClient()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IRegisterInputs>({
    defaultValues: {
      imagePath: defaultProduct ? defaultProduct.imagePath : '',
      label: defaultProduct ? defaultProduct.label : '',
      price: defaultProduct ? formatCentsToCurrency(defaultProduct.priceCents) : '',
    }
  });
  const { mutate: creationMutate } = useMutation({
    mutationFn: (newProduct: ICreateProductProps) => {
      return createProduct(newProduct)
    },
    onSuccess:  () => {
      queryClient.invalidateQueries({ queryKey: ['getProducts'] });
      onClose();
      reset();
    },
  })

  const { mutate: updateMutate } = useMutation({
    mutationFn: (product: IProduct) => {
      return updateProduct(product);
    },
    onSuccess:  () => {
      queryClient.invalidateQueries({ queryKey: ['getProducts'] });
      queryClient.invalidateQueries({ queryKey: ['getProduct'] });
      onClose();
      reset();
    },
  })

  const onSubmit: SubmitHandler<IRegisterInputs> =  (data) => {
    if(defaultProduct) {
      updateMutate({
        label: data.label,
        imagePath: data.imagePath,
        priceCents: formatCurrencyToCents(data.price.toString()),
        id: defaultProduct.id,
      })
    } else {
      creationMutate({
        label: data.label,
        imagePath: data.imagePath,
        priceCents: formatCurrencyToCents(data.price.toString())
      })
    }
  }

  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <ModalTitle>{title}</ModalTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldsWrapper>
          <Field
            error={errors.label || null}
            label="Nome do produto"
            inputProps={{...register("label", { required: true, minLength: 3 }), type: 'text'}} />
          <Field
            error={errors.imagePath || null}
            label="URL da imagem"
            inputProps={{...register("imagePath", { required: true, minLength: 10 }), type: 'text'}} />
          <Field
            error={errors.price || null}
            label="Preço"
            inputProps={{...register("price", { required: true }), type: 'text'}} />
        </FieldsWrapper>
        
        <ButtonsWrapper>
          <Button
            onClick={onClose}
            label={"Fechar"}/>
          <CustomSubmit type="submit" />
        </ButtonsWrapper>
      </form>
    </Modal>
  )
}