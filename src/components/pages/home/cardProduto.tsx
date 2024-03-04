'use client'

import { motion, useAnimation } from "framer-motion"; // Importa os componentes necessários do Framer Motion para animações
import { Button, Image, Link } from "@nextui-org/react"; // Importa os componentes necessários do NextUI
import { useEffect, useState } from "react"; // Importa o hook useState do React para gerenciamento de estado
import { FaArrowDown, FaMinus, FaPlus } from "react-icons/fa"; // Importa os ícones necessários da biblioteca React Icons
import { useCart } from "@/contexts/cartContext"; // Importa o contexto de carrinho
import { MdAddShoppingCart } from "react-icons/md"; // Importa o ícone de adicionar ao carrinho

// Define o tipo para as propriedades dos produtos
export type produtoProps = {
    id: number
    name: string
    description: string
    slug: string
    preco: number
    image: string
    quantidade: number
    promocao: boolean
    promocao_preco: number
    atacado: boolean
    atacado_minquantidade: number
    vendas: number
    status: string
}

// Componente para renderizar um card de produto
export const CardProduto = ({item}: {
    item: produtoProps
}) => {
    const [open, setOpen] = useState(false); // Estado para controlar a visibilidade do botão de adicionar ao carrinho
    const { cart, addCart, removeCart } = useCart(); // Usa o contexto do carrinho
    const [count, setCount] = useState(cart.itens.find(cartItem => cartItem.item.id === item.id)?.quantity ?? 0); // Estado para contar a quantidade de itens no carrinho

    const controls = useAnimation(); // Controle para animações

    useEffect(() => {
        // Atualiza a visibilidade do botão de adicionar ao carrinho com base na quantidade de itens no carrinho
        if(count === 0){
            setOpen(false)
        }else{
            setOpen(true)
        }

        // Controla as animações de exibição do botão de adicionar ao carrinho
        if (open) {
            controls.start({ opacity: 1, height: 'unset', display: 'flex'  });
        } else {
            controls.start({ opacity: 0, height: 0, display: 'none'  });
        }
    }, [open, controls, count]);

    // Função para lidar com a adição de um item ao carrinho
    const handleAddItemCart = () => {
        addCart({item: item, quantity: 1})
        setCount(count+1)
    }

    // Função para lidar com a remoção de um item do carrinho
    const handleRemoveItemCart = () => {
        removeCart({item: item, quantity: count-1})
        setCount(count-1)
    }

    // Função para calcular o desconto percentual
    function calcularDesconto(valorOriginal: number, valorComDesconto: number) {
        let diferenca = valorOriginal - valorComDesconto; // Calcula a diferença entre os valores
        let porcentagemDesconto = (diferenca / valorOriginal) * 100; // Calcula a porcentagem de desconto
        return porcentagemDesconto.toFixed(0);
    }

    return(
        <div key={`item_${item.name}`} className="bg-light-background-50 hover:bg-light-background-100 shadow-md">
            <Link 
                href={`/item/${item.id}`}
            >
                {/* Componente com animações do Framer Motion */}
                <motion.div className="duration-200 ease-in-out
                    flex flex-col gap-4 justify-center items-center rounded-md p-4 w-40 h-64 
                    max-lg:w-[200px]"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.1, velocity: .5 }}     
                >
                    <div className="w-[100%] h-[50%] flex items-center justify-center">
                        <Image 
                            src={item.image}
                            alt={item.name}
                            className="object-cover w-full h-full"
                            classNames={{
                                wrapper: 'w-full h-full'
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2 justify-center w-full">
                        { 
                            item.promocao && item.promocao_preco // Verifica se há promoção
                            ? <div className="flex flex-col gap-1 w-full">
                                <div className="flex flex-row gap-2">
                                    <span className="text-xl font-bebas text-emerald-500">
                                        {item.promocao_preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                    </span>
                                    <span className="flex flex-row font-light text-tiny items-center gap-1 text-white bg-emerald-400 rounded-md p-1">
                                        <FaArrowDown className={"text-white"} /> 
                                        -{calcularDesconto(item.preco, item.promocao_preco)}%
                                    </span>
                                </div>
                                
                                <div className="flex flex-row justify-start items-center gap-2">
                                    
                                    <span className="text-tiny font-light dark:text-white line-through text-gray-700 ">
                                        {(item.preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                    </span>
                                </div>
                               
                            </div>
                            :  <div className="">
                                <span className="text-xl font-medium text-black dark:text-white font-bebas">
                                    {(item.preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                </span>
                            </div>
                        }
                        <p className="text-gray-900 dark:text-white">
                            {item.name.length >= 20 ? `${item.name.substring(0,20)}...` : `${item.name}`}
                        </p>
                    </div>
                </motion.div>
            </Link>
            {/* Botão de adicionar ao carrinho */}
            <div className={`shadow-md ${count !== 0 && `justify-center`} min-h-10 items-end flex flex-row z-50 bg-light-background-50 rounded-md w-full`}>
                {/* Animações do Framer Motion */}
                <motion.div
                    className="flex flex-row duration-200 ease-in-out"
                    initial={{ opacity: 0, height: 0, display: 'none' }}
                    animate={controls}
                    transition={{ type: "tween", stiffness: 120, duration: 0.02 }}
                >
                    <Button className="bg-transparent " isIconOnly onClick={handleRemoveItemCart}><FaMinus className="text-red-600"/></Button>
                    <div className="bg-transparent w-10 flex justify-center items-center"><span className="font-bebas ">{count}</span></div>
                    <Button className={`bg-transparent`} isIconOnly onClick={handleAddItemCart}><FaPlus className="text-red-600"/></Button>
                </motion.div>
                {/* Botão de adicionar ao carrinho visível apenas quando o contador de itens é zero */}
                <Button 
                    fullWidth 
                    w-full 
                    className={`bg-transparent w-full ${count > 0 && `hidden`}`} 
                    isIconOnly 
                    onClick={handleAddItemCart}
                >
                    <MdAddShoppingCart size={20} className="text-red-600"/>
                </Button>
            </div>
        </div>
    )
}
