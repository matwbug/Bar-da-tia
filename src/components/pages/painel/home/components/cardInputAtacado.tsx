import { produtoProps } from '@/components/pages/home/cardProduto'
import { Slider, Switch } from '@nextui-org/react'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { RiShoppingCartFill } from 'react-icons/ri'
import { FormDataProduto } from '../../itens/modalAddItem'

export const CardInputAtacado = ({produto, setProduto, variant, formData, setFormData}: {
    produto?: produtoProps,
    setProduto?: (produto: produtoProps) => void
    formData?: FormDataProduto
    setFormData?: (formData: FormDataProduto) => void
    variant: 'edit' | 'add'
}) => {

    const controls = useAnimation();

    useEffect(() => {
        if (formData?.atacado || produto?.atacado) {
            controls.start({ opacity: 1, y: 0, height: 'auto' });
        } else {
            controls.start({ opacity: 0, y: 1000, height: 0 });
        }
    }, [produto?.atacado, formData?.atacado, controls]);

    const defaultValue = variant === 'add' ? (formData?.atacado_minquantidade ? formData?.atacado_minquantidade : 0) : variant === 'edit' ? (produto?.atacado_minquantidade ? produto?.atacado_minquantidade : 0) : 0
    const defaultSelected = variant === 'add' ? (formData?.atacado ? formData?.atacado : false) : variant === 'edit' ? (produto?.atacado ? produto?.atacado : false) : false


    return(
        <div className="flex flex-row gap-2 items-start w-full  rounded-md p-4">
            <div className="flex flex-col gap-2 w-full">
                <p className="flex flex-row gap-1 items-center">Atacado <RiShoppingCartFill size={20} /></p>
                <span className="text-tiny text-zinc-600">Essa opção ativa o preço de atacado, que é oferecido para compras em grandes quantidades a um preço mais baixo.</span>
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
            <Switch 
                size="sm"
                defaultSelected={defaultSelected}
                onChange={(e) => {
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