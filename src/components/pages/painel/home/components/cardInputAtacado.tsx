import { produtoProps } from '@/components/pages/home/cardProduto'
import { Slider, Switch } from '@nextui-org/react'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { RiShoppingCartFill } from 'react-icons/ri'
import { FormDataProduto } from '../../itens/modalAddItem'

/**
 * Componente CardInputAtacado
 * 
 * @param {object} produto - As informações do produto.
 * @param {function} setProduto - Função para atualizar as informações do produto.
 * @param {object} formData - Os dados do formulário do produto.
 * @param {function} setFormData - Função para atualizar os dados do formulário do produto.
 * @param {string} variant - Variante do componente ('edit' ou 'add').
 */
export const CardInputAtacado = ({produto, setProduto, formData, setFormData, variant}: {
    produto?: produtoProps,
    setProduto?: (produto: produtoProps) => void
    formData?: FormDataProduto
    setFormData?: (formData: FormDataProduto) => void
    variant: 'edit' | 'add'
}) => {
    // Controles para animação do cartão
    const controls = useAnimation();

    // Efeito para mostrar ou esconder o cartão com base no status do atacado
    useEffect(() => {
        if (formData?.atacado || produto?.atacado) {
            controls.start({ opacity: 1, y: 0, height: 'auto' });
        } else {
            controls.start({ opacity: 0, y: 1000, height: 0 });
        }
    }, [produto?.atacado, formData?.atacado, controls]);

    // Valor padrão para o slider
    const defaultValue = variant === 'add' ? (formData?.atacado_minquantidade ? formData?.atacado_minquantidade : 0) : variant === 'edit' ? (produto?.atacado_minquantidade ? produto?.atacado_minquantidade : 0) : 0

    // Valor padrão para o switch
    const defaultSelected = variant === 'add' ? (formData?.atacado ? formData?.atacado : false) : variant === 'edit' ? (produto?.atacado ? produto?.atacado : false) : false

    return(
        // Container principal do cartão
        <div className="flex flex-row gap-2 items-start w-full  rounded-md p-4">
            <div className="flex flex-col gap-2 w-full">
                {/* Título indicando opção de atacado */}
                <p className="flex flex-row gap-1 items-center">Atacado <RiShoppingCartFill size={20} /></p>
                {/* Descrição da opção */}
                <span className="text-tiny text-zinc-600">Essa opção ativa o preço de atacado, que é oferecido para compras em grandes quantidades a um preço mais baixo.</span>
                {/* Slider para definir a quantidade mínima */}
                <motion.div
                    animate={controls}
                    initial={{ opacity: 0, y: 1000, height: '0' }}
                    transition={{ type: "tween", stiffness: 100, duration: 0.1 }}
                >
                    <Slider 
                        label={<span>Quantidade mínima</span>}
                        step={2}
                        showOutline
                        maxValue={20}
                        color="primary"
                        showTooltip
                        classNames={{
                            track: `bg-light-background-300`
                        }}
                        defaultValue={defaultValue}
                        onChange={(value) => {
                            // Atualiza a quantidade mínima com base no valor do slider
                            if(produto && setProduto && variant === 'edit'){
                                if(Array.isArray(value)){
                                    setProduto({
                                        ...produto,
                                        atacado_minquantidade: value[0]
                                    })
                                }else{
                                    setProduto({
                                        ...produto,
                                        atacado_minquantidade: value
                                    })
                                }
                            }else if(formData && setFormData && variant === 'add'){
                                if(Array.isArray(value)){
                                    setFormData({
                                        ...formData,
                                        atacado_minquantidade: value[0]
                                    })
                                }else{
                                    setFormData({
                                        ...formData,
                                        atacado_minquantidade: value
                                    })
                                }
                            }
                        }}
                        
                    />
                </motion.div>
            </div>
            {/* Switch para ativar ou desativar o atacado */}
            <Switch 
                size="sm"
                defaultSelected={defaultSelected}
                onChange={(e) => {
                    // Atualiza o status do atacado com base no estado do switch
                    if(produto && setProduto && variant === 'edit') setProduto({...produto, atacado: e.target.checked})
                    else if(formData && setFormData && variant === 'add') setFormData({...formData, atacado: e.target.checked})
                }}
                classNames={{
                    wrapper: `bg-light-background-500`
                }}
            />
        </div>
    )
}
