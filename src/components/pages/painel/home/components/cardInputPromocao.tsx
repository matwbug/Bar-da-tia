import { produtoProps } from "@/components/pages/home/cardProduto"
import { Button, Input, Slider, Switch } from "@nextui-org/react"
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from "react"
import { CiDiscount1 } from "react-icons/ci"
import { ImPriceTags } from "react-icons/im"
import { MdOutlineDiscount } from "react-icons/md"
import { NumericFormat } from "react-number-format"
import { FormDataProduto } from "../../itens/modalAddItem"

export const CardInputPromocao = ({produto, setProduto, variant, formData, setFormData}: {
    produto?: produtoProps
    setProduto?: (produto: produtoProps) => void
    formData?: FormDataProduto
    setFormData?: (formData: FormDataProduto) => void
    variant: 'edit' | 'add'
}) => {
    const controls = useAnimation();

    useEffect(() => {
        if (formData?.promocao || produto?.promocao) {
            controls.start({ opacity: 1, y: 0, height: 'auto' });
        } else {
            controls.start({ opacity: 0, y: 20, height: '0' });
        }
    }, [produto?.promocao, formData?.promocao, controls]);

    const [isValid, setValid] = useState<{valid: true | false, errorMessage?: string}>({valid: true})

    useEffect(() => {
        if(produto && setProduto && variant === 'edit'){
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
        }
        else if(formData && setFormData && variant === 'add'){
            if(!formData.preco) return setValid({valid: false, errorMessage: 'O valor promocional precisa ser menor que o valor inicial.'})
            if(formData.promocao_preco && formData.promocao_preco >= formData.preco){
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
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData?.promocao_preco, produto?.promocao_preco])

    const handleAddPromo = () => {
        if(produto && setProduto && variant === 'edit'){
            setProduto({...produto, promocao: !produto.promocao})
        }
        else if(formData && setFormData && variant === 'add'){
            setFormData({...formData, promocao: !formData.promocao})
        }
    }

    const value = produto?.promocao_preco ? produto?.promocao_preco : (formData?.promocao_preco ? formData?.promocao_preco : 0)

    return(
        <div className="flex flex-col gap-2 w-full">
            <Button onClick={handleAddPromo} fullWidth color="primary" variant="flat" className="flex flex-row items-center"><CiDiscount1 /> Adicionar promoção</Button>
            <motion.div
                animate={controls}
                initial={{ opacity: 0, y: 20, height: '0' }}
                transition={{ type: "spring", stiffness: 100, duration: 0.2 }}
            >
              <NumericFormat 
                customInput={Input}
                label={<span className="flex flex-row justify-center items-center gap-1">Valor promocional <MdOutlineDiscount /></span>}
                prefix={'R$ '}
                value={value}
                classNames={{
                    inputWrapper: `bg-light-background-200 border-1 border-zinc-200`,
                }}
                thousandSeparator={'.'}
                decimalSeparator={','}
                decimalScale={2}
                fixedDecimalScale={true}
                allowNegative={false}
                isAllowed={({floatValue}) => {
                    if(floatValue){
                        if(produto && setProduto && variant === 'edit'){
                            setProduto({...produto, promocao_preco: floatValue})
                        }  
                        else if(formData && setFormData && variant === 'add'){
                            setFormData({...formData, promocao_preco: floatValue})
                        }  
                    }
                    return true
                }}
                isInvalid={!isValid.valid}
                errorMessage={<span>{isValid.errorMessage}</span>}
              />
            </motion.div>
        </div>
    )
}