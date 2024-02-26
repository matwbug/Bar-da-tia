import { Input } from "@nextui-org/react";
import { NumericFormat } from "react-number-format";
import { produtoProps } from "../../../home/cardProduto";

export const ProdutoPriceInput = ({produto, setProduto}: {
    produto: produtoProps
    setProduto: (produto: produtoProps) => void
}) => {
    return (
      <NumericFormat
        label="Preço"
        prefix={'R$ '}
        customInput={Input}
        value={produto.preco}
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
          if(floatValue) setProduto({...produto, preco: floatValue})
          return true
        }}
      />
    );
}