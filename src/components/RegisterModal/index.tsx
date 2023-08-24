import { SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "../Modal"
import { ButtonsWrapper, CustomSubmit, FieldsWrapper, ModalTitle } from "./styles";
import { Field } from "../Field";
import { Button } from "../Button";
import { formatCurrencyToCents } from "../../utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreateProductProps, createProduct, getProducts } from "../../services/products";

interface IRegisterModalProps {
  isOpened: boolean;
  onClose: () => void;
}

interface IRegisterInputs {
  label: string;
  imagePath: string;
  price: string;
};

export const RegisterModal = ({ isOpened, onClose }: IRegisterModalProps) => {
  const queryClient = useQueryClient()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IRegisterInputs>();
  const { mutate } = useMutation({
    mutationFn: (newProduct: ICreateProductProps) => {
      return createProduct(newProduct);
    },
    onSuccess:  () => {
      queryClient.invalidateQueries({ queryKey: ['getProducts'] });
      onClose();
      reset();
    },
  })
  const onSubmit: SubmitHandler<IRegisterInputs> =  (data) => {
    mutate({
      label: data.label,
      imagePath: data.imagePath,
      priceCents: formatCurrencyToCents(data.price.toString())
    })
  }

  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <ModalTitle>Novo Produto</ModalTitle>
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