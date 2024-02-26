import { produtoProps } from '@/components/pages/home/cardProduto'
import { Slider, Switch } from '@nextui-org/react'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { RiShoppingCartFill } from 'react-icons/ri'

export const CardInputAtacado = ({produto, setProduto}: {
    produto: produtoProps,
    setProduto: (produto: produtoProps) => void
}) => {

    const controls = useAnimation();

    useEffect(() => {
        if (produto.atacado) {
            controls.start({ opacity: 1, y: 0, height: 'auto' });
        } else {
            controls.start({ opacity: 0, y: 20, height: 0 });
        }
    }, [produto.atacado, controls]);

    return(
        <div className="flex flex-row gap-2 items-start w-full  rounded-md p-4">
            <div className="flex flex-col gap-2 w-full">
                <p className="flex flex-row gap-1 items-center">Atacado <RiShoppingCartFill size={20} /></p>
                <span className="text-tiny text-zinc-600">Essa opção ativa o preço de atacado, que é oferecido para compras em grandes quantidades a um preço mais baixo.</span>
                <motion.div
                    animate={controls}
                    initial={{ opacity: 0, y: 20, height: '0' }}
                    transition={{ type: "spring", stiffness: 100, duration: 0.2 }}
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
                        defaultValue={produto.atacado_minquantidade ?? 0}
                        onChange={(value) => {
                            console.log(value)
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
                        }}
                        
                    />
                </motion.div>
            </div>
            <Switch 
                size="sm"
                defaultSelected={produto.atacado}
                onChange={(e) => setProduto({...produto, atacado: e.target.checked})}
                classNames={{
                    wrapper: `bg-light-background-500`
                }}
            />
        </div>
    )
}