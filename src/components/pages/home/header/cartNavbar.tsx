/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Button, Link, Popover, PopoverContent, PopoverTrigger, Tooltip, User } from "@nextui-org/react"
import { FaCartShopping } from "react-icons/fa6"
import { CartCardPopover } from "./cartCardPopover"
import { CartEmpty } from "./cartEmpty"
import { useCart } from "@/contexts/cartContext"
import { useEffect, useState } from "react"

export const CartNavbar = () => {
    const { cart } = useCart()
    const [ isOpen, setOpen ] = useState(false)
    const [ firstRender, setFirstRender ] = useState(true)

    useEffect(() => {
        if(firstRender){
            return setFirstRender(false) // Não aparecer o carrinho quando for renderizado a tela pela primeira vez
        }

        setOpen(true)
        setTimeout(() => {
            setOpen(false)
        }, 1000); 
    }, [cart])

    const [valorEconomizado, setValorEconomizado] = useState(0)  

    useEffect(() => {
        let newValue = cart.itens
        .filter(cart => cart.item.atacado)
        .map(item => {
            if (item.quantity >= item.item.atacado_minquantidade) {
                let realPrice = item.item.preco * item.quantity;
                let atacadoPrice = (item.item.preco - (item.item.preco * 0.25)) * item.quantity;
                return realPrice - atacadoPrice;
            } else {
                return 0; // Ou outro valor padrão se não houver economia
            }
        })
    
        .reduce((total, valor) => total + valor, 0);

        setValorEconomizado(newValue)
        console.log(newValue)
        
    }, [cart])

    return(
        <Popover placement="bottom" shadow="md" isOpen={isOpen} >
            <PopoverTrigger className="cursor-pointer" onClick={() => setOpen(!isOpen)}>
                <div className="flex justify-center items-center flex-row relative">
                    <FaCartShopping className="text-light-primary-500" size={20}/>
                    {
                        cart.itens.length > 0 && 
                            <span className="font-bold bg-light-primary-500 w-[20px] h-[20px] flex justify-center items-center rounded-full text-white absolute" style={{right: "-0.8rem", top: "-0.3rem"}}>
                                {cart.itens.length}
                            </span>
                    }
                </div>
            </PopoverTrigger>
            <PopoverContent className="p-1 dark:bg-dark-background-950 bg-light-background-100 w-[350px] gap-1">
                <div className="w-full py-2 dark:bg-dark-background-950/100 bg-light-background-50/10 rounded-t-sm">
                    <span className="text-xl font-bebas font-semilbold flex flex-row justify-center items-center gap-2">
                        SEU CARRINHO
                    </span>
                </div>
                {
                    cart.itens.length > 0 
                    ? <div className="min-h-[80px] w-full max-h-[220px] overflow-y-auto flex flex-col justify-start items-start gap-4 py-2">
                    {
                        cart.itens.map(item => {
                            return(
                                <CartCardPopover 
                                    key={`item_${item.item.id}`} 
                                    item={item.item} 
                                    quantity={item.quantity}
                                />
                            )
                        })
                    }
                    </div>
                    : <CartEmpty />
                }
                <div className="flex flex-col justify-between items-center gap-2 w-full px-3 mt-2 bg-light-background-100 rounded-b-sm">
                    <div className="flex flex-row justify-between items-end w-full">
                        <span className="font-normal">
                            Total
                        </span>
                        <span className="font-light font-bebas text-2xl text-right">
                            {cart.total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                        </span>
                    </div>
                    {
                        valorEconomizado > 0
                        && <Tooltip showArrow color={'foreground'} content={<span>Preço de atacado ativado</span>}>
                            <div className="flex gap-1 justify-center items-center w-full bg-emerald-500 p-1 rounded text-white">
                                <span className="text-left font-light">Você está economizando</span>
                                <span className="font-medium">{valorEconomizado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
                            </div>
                        </Tooltip>
                    }
                    <Button variant="flat" fullWidth color="primary">Finalizar compra</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}