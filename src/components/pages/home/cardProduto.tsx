"use client"

import { motion, useAnimation } from "framer-motion";
import { Button, Image, Link } from "@nextui-org/react"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { CiDeliveryTruck } from "react-icons/ci"
import { FaArrowDown, FaMinus, FaPlus, FaTruck } from "react-icons/fa"
import { useCart } from "@/contexts/cartContext";

export type produtoProps = {
    id: number
    name: string
    description: string
    slug: string
    preco: number
    image: string
    quantidade: number
    promocao: boolean
    promocao_preco: number | null
    atacado: boolean
    atacado_minquantidade: number | null
    vendas: number
    desativado: boolean
}

export const CardProduto = ({item}: {
    item: produtoProps
}) => {
    const [open, setOpen] = useState(false)
    const { cart, addCart, removeCart } = useCart()

    const [count, setCount] = useState(cart.itens.find(cartItem => cartItem.item.id === item.id)?.quantity ?? 0)


    const controls = useAnimation();

    useEffect(() => {
        if(count === 0){
            setOpen(false)
        }else{
            setOpen(true)
        }

        if (open) {
            controls.start({ x: 0, opacity: 1, display: 'flex' });
        } else {
            controls.start({ x: "100vw", opacity: 0, display: 'none' });
        }
    }, [open, controls, count]);

    const handleAddItemCart = () => {
        addCart({item: item, quantity: 1})
        setCount(count+1)
    }

    const handleRemoveItemCart = () => {
        removeCart({item: item, quantity: count-1})
        setCount(count-1)
    }

    return(
        <div key={`item_${item.name}`} className="relative">
            <Link href={`/item/${item.id}`}>
                <div className="shadow-md flex flex-col gap-4 justify-center items-start dark:bg-[#1e1e1e] bg-light-background-50 rounded-md p-4 w-full min-w-40 max-w-40 h-[280px]">
                    <div className="max-w-[200px]">
                        <Image 
                            src={item.image}
                            width={200}
                            alt={item.name}
                        />
                    </div>
                    <div className="flex flex-col gap-2 justify-center w-full">
                        {
                            item.promocao
                            ? <div className="flex flex-col gap-1 w-full">
                                <span className="text-xl font-bebas text-emerald-500">
                                    {item.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                </span>
                                <div className="flex flex-row justify-start items-center gap-2">
                                    <span className="flex flex-row font-light text-tiny items-center gap-1 text-white bg-emerald-400 rounded-md p-1">
                                        <FaArrowDown className={"text-white"} /> 
                                        -10%
                                    </span>
                                    <span className="text-tiny font-light dark:text-white line-through text-gray-700 ">
                                        {(item.preco - (item.preco * 0.10)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                    </span>
                                </div>
                                
                            </div>
                            : item.atacado 
                                ? <div className="flex flex-col gap-0">
                                    <div className="flex flex-row gap-2">
                                        <span className="text-xl text-black dark:text-white font-bebas line-through">
                                            {(item.preco - (item.preco * 0.10)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                        </span>
                                        <span className="text-emerald-400 text-xl dark:text-white font-bebas">
                                            {(item.preco - (item.preco * 0.05)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                        </span>   
                                    </div>
                                    <span className="text-tiny bg-emerald-400 p-1 rounded font-light text-white">A PARTIR DE 3 UN</span>
                                </div>
                                :<span className="text-xl font-medium text-black dark:text-white font-bebas">
                                    {(item.preco - (item.preco * 0.10)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                </span>
                        }
                        <p className="text-sm font-medium text-gray-600 dark:text-white">
                            {item.name.length > 28 ? `${item.name.substring(0,28)}...` : `${item.name}`}
                        </p>
                    </div>
                </div>
            </Link>
            <div className="shadow-md absolute top-[49%] right-5 translate-y-[-50%] flex flex-row z-50 bg-light-background-50 rounded-md">
                <motion.div
                    className="flex flex-row"
                    initial={{ x: "100vw", opacity: 0, display: 'none' }}
                    animate={controls}
                    transition={{ type: "tween", stiffness: 120, duration: 0.02 }}
                >
                    <Button className="bg-transparent " isIconOnly onClick={handleRemoveItemCart}><FaMinus className="text-red-600"/></Button>
                    <div className="bg-transparent w-10 flex justify-center items-center"><span className="font-bebas ">{count}</span></div>
                </motion.div>
                <Button className="bg-transparent" isIconOnly onClick={handleAddItemCart}><FaPlus className="text-red-600"/></Button>
            </div>
        </div>
    )
}