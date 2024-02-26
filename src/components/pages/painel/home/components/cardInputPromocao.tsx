import { produtoProps } from "@/components/pages/home/cardProduto"
import { Button, Input, Slider, Switch } from "@nextui-org/react"
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from "react"
import { CiDiscount1 } from "react-icons/ci"
import { ImPriceTags } from "react-icons/im"
import { MdOutlineDiscount } from "react-icons/md"
import { NumericFormat } from "react-number-format"

export const CardInputPromocao = ({produto, setProduto}: {
    produto: produtoProps,
    setProduto: (produto: produtoProps) => void
}) => {
    const controls = useAnimation();

    useEffect(() => {
        if (produto.promocao) {
            controls.start({ opacity: 1, y: 0, height: 'auto' });
        } else {
            controls.start({ opacity: 0, y: 20, height: '0' });
        }
    }, [produto.promocao, controls]);

    const [isValid, setValid] = useState<{valid: true | false, errorMessage?: string}>({valid: true})

    useEffect(() => {
        if(produto.promocao_preco && produto.promocao_preco >= produto.preco){
            setValid({
                valid: false, 
                errorMessage: 'O valor promocional precisa ser menor que o valor inicial.'
            })
        }
        else{
            setValid({
                valid: true, 
                errorMessage: undefined
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [produto.promocao_preco])

    return(
        <div className="flex flex-col gap-2 w-full">
            <Button onClick={() => setProduto({...produto, promocao: !produto.promocao})} fullWidth color="primary" variant="flat" className="flex flex-row items-center"><CiDiscount1 /> Adicionar promoção</Button>
            <motion.div
                animate={controls}
                initial={{ opacity: 0, y: 20, height: '0' }}
                transition={{ type: "spring", stiffness: 100, duration: 0.2 }}
            >
              <NumericFormat 
                customInput={Input}
                label={<span className="flex flex-row justify-center items-center gap-1">Valor promocional <MdOutlineDiscount /></span>}
                prefix={'R$ '}
                value={produto.promocao_preco}
                classNames={{
                    inputWrapper: `bg-light-background-200 border-1 border-zinc-200`,
                }}
                thousandSeparator={'.'}
                decimalSeparator={','}
                decimalScale={2}
                fixedDecimalScale={true}
                allowNegative={false}
                isAllowed={({floatValue}) => {
                if(floatValue) setProduto({...produto, promocao_preco: floatValue})
                    return true
                }}
                isInvalid={!isValid.valid}
                errorMessage={<span>{isValid.errorMessage}</span>}
              />
            </motion.div>
        </div>
    )
}