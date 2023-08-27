import { SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "../Modal"
import { ButtonsWrapper, CustomSubmit, FieldsWrapper, ModalTitle, SavingMessage } from "./styles";
import { Field } from "../Field";
import { Button } from "../Button";
import { formatCurrencyToCents, formatCentsToCurrency } from "../../utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreateProductProps, createProduct, updateProduct } from "../../services/products";
import { IProduct } from "../../types";
import { useState } from "react";

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
  const [isSaving, setIsSaving] = useState(false);
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
      setIsSaving(false);
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
      setIsSaving(false);
      onClose();
      reset();
    },
  })

  const handleClose = () => {
    reset();
    onClose();
  }

  const onSubmit: SubmitHandler<IRegisterInputs> =  (data) => {
    setIsSaving(true);
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
    <Modal isOpened={isOpened} onClose={handleClose}>
      <ModalTitle>{title}</ModalTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldsWrapper>
          <Field
            error={errors.label || null}
            label="Nome do produto"
            inputProps={{...register("label", { required: true, minLength: 3 }), type: 'text'}}
            customErrorMessages={{
              minLength: 'Esperado ao menos 3 caracteres neste campo'
            }}/>
          <Field
            error={errors.imagePath || null}
            label="URL da imagem"
            inputProps={{...register("imagePath", { required: true, minLength: 10 }), type: 'text'}}
            customErrorMessages={{
              minLength: 'Esperado ao menos 10 caracteres neste campo'
            }}/>
          <Field
            error={errors.price || null}
            label="Preço(em reais)"
            inputProps={{
              ...register("price", { 
                required: true,
                pattern: /^(0|[1-9]\d*)(,\d+)?$/
              }),
              type: 'text'}}
              customErrorMessages={{
                pattern: 'Este campo aceita apenas números'
              }}/>
        </FieldsWrapper>
        
        {
          !isSaving ?
          <ButtonsWrapper>
            <Button
              onClick={handleClose}
              label={"Fechar"}/>
            <CustomSubmit value="Salvar" type="submit" />
          </ButtonsWrapper> : (
            <SavingMessage>
              Salvando...
            </SavingMessage>
          )
        }
      </form>
    </Modal>
  )
}