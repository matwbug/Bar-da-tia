import { Input } from "@nextui-org/react";
import { NumericFormat } from "react-number-format";
import { produtoProps } from "../../../home/cardProduto";
import { FormDataProduto } from "../../itens/modalAddItem";

/**
 * Componente ProdutoPriceInput
 * 
 * @param {object} produto - As informações do produto.
 * @param {function} setProduto - Função para atualizar as informações do produto.
 * @param {object} formData - Os dados do formulário.
 * @param {function} setFormData - Função para atualizar os dados do formulário.
 * @param {string} variant - A variante do componente ('edit' ou 'add').
 */
export const ProdutoPriceInput = ({produto, setProduto, variant, formData, setFormData}: {
  produto?: produtoProps
  setProduto?: (produto: produtoProps) => void
  formData?: FormDataProduto
  setFormData?: (formData: FormDataProduto) => void
  variant: 'edit' | 'add'
}) => {
    return (
      // Componente NumericFormat para entrada do preço
      <NumericFormat
        label="Preço"
        prefix={'R$ '}
        customInput={Input}
        value={produto?.preco}
        classNames={{
            inputWrapper: `bg-light-background-200 border-1 border-zinc-200`
        }}
        thousandSeparator={'.'}
        decimalSeparator={','}
        decimalScale={2}
        fixedDecimalScale={true}
        allowNegative={false}
        isAllowed={({floatValue}) => {
          // Verifica se o valor é válido e atualiza os dados conforme a variante
          if(floatValue && variant === 'edit' && produto && setProduto) setProduto({...produto, preco: floatValue}) 
          if(floatValue && variant === 'add' && formData && setFormData) setFormData({...formData, preco: floatValue}) 
          return true
        }}
      />
    );
}
