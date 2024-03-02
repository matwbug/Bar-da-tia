import { Input } from "@nextui-org/react";
import { NumericFormat } from "react-number-format";
import { produtoProps } from "../../../home/cardProduto";
import { FormDataProduto } from "../../itens/modalAddItem";

export const ProdutoPriceInput = ({produto, setProduto, variant, formData, setFormData}: {
  produto?: produtoProps
  setProduto?: (produto: produtoProps) => void
  formData?: FormDataProduto
  setFormData?: (formData: FormDataProduto) => void
  variant: 'edit' | 'add'
}) => {
    return (
      <NumericFormat
        label="Preço"
        prefix={'R$ '}
        customInput={Input}
        value={produto?.preco}
        // className="max-w-[200px]"
        classNames={{
            inputWrapper: `bg-light-background-200 border-1 border-zinc-200`
        }}
        thousandSeparator={'.'}
        decimalSeparator={','}
        decimalScale={2}
        fixedDecimalScale={true}
        allowNegative={false}
        isAllowed={({floatValue}) => {
          if(floatValue && variant === 'edit' && produto && setProduto) setProduto({...produto, preco: floatValue}) 
          if(floatValue && variant === 'add' && formData && setFormData) setFormData({...formData, preco: floatValue}) 
          return true
        }}
      />
    );
}