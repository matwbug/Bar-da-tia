import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from "react"
import { NumericFormat } from "react-number-format"
import { Item } from '@prisma/client'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { PercentDiamond, PercentDiamondIcon } from 'lucide-react'
import { FormDataProduto } from '@/app/itens/components/modal-add-item'

/**
 * Componente CardInputPromocao
 * 
 * @param {object} produto - As informações do produto.
 * @param {function} setProduto - Função para atualizar as informações do produto.
 * @param {object} formData - As informações do formulário do produto.
 * @param {function} setFormData - Função para atualizar as informações do formulário do produto.
 * @param {string} variant - Variante do componente: 'edit' para edição, 'add' para adição.
 */
export const CardInputPromocao = ({produto, setProduto, variant, formData, setFormData}: {
    produto?: Item
    setProduto?: (produto: Item) => void
    formData?: FormDataProduto
    setFormData?: (formData: FormDataProduto) => void
    variant: 'edit' | 'add'
}) => {
    // Controles para animação do componente
    const controls = useAnimation();

    // Efeito para animar a abertura e fechamento do componente
    useEffect(() => {
        if (formData?.promocao || produto?.promocao) {
            controls.start({ opacity: 1, y: 0, height: 'auto' });
        } else {
            controls.start({ opacity: 0, y: 20, height: '0' });
        }
    }, [produto?.promocao, formData?.promocao, controls]);

    // Estado para verificar a validade do valor promocional
    const [isValid, setValid] = useState<{valid: true | false, errorMessage?: string}>({valid: true})

    // Efeito para validar o valor promocional
    useEffect(() => {
        if(produto && setProduto && variant === 'edit'){
            if(produto.promocaoPreco && produto.promocaoPreco >= produto.preco){
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
    }, [formData, formData?.promocao_preco, produto, produto?.promocaoPreco, setFormData, setProduto, variant])

    // Função para adicionar ou remover promoção
    const handleAddPromo = () => {
        if(produto && setProduto && variant === 'edit'){
            setProduto({...produto, promocao: !produto.promocao})
        }
        else if(formData && setFormData && variant === 'add'){
            setFormData({...formData, promocao: !formData.promocao})
        }
    }

    // Valor do input de valor promocional
    const value = produto?.promocaoPreco ? produto?.promocaoPreco : (formData?.promocao_preco ? formData?.promocao_preco : 0)

    return(
        // Container principal do componente
        <div className="flex flex-col gap-2 w-full">
            {/* Botão para adicionar ou remover promoção */}
            <Button onClick={handleAddPromo} fullWidth color="primary" variant="flat" className="flex flex-row items-center"><PercentDiamondIcon /> Adicionar promoção</Button>
            {/* Componente para inserir valor promocional */}
            <motion.div
                animate={controls}
                initial={{ opacity: 0, y: 20, height: '0' }}
                transition={{ type: "spring", stiffness: 100, duration: 0.2 }}
            >
              <NumericFormat 
                customInput={Input}
                label={<span className="flex flex-row justify-center items-center gap-1">Valor promocional <PercentDiamond /></span>}
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
                            setProduto({...produto, promocaoPreco: floatValue})
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
