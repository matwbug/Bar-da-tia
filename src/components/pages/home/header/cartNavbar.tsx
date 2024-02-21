'use client'

import { Button, Link, Popover, PopoverContent, PopoverTrigger, User } from "@nextui-org/react"
import { FaCartShopping } from "react-icons/fa6"
import { useCart } from "../../../../../contexts/cartContext"
import { CartCardPopover } from "./cartCardPopover"
import { CartEmpty } from "./cartEmpty"

export const CartNavbar = () => {
    const { cart } = useCart()

    return(
        <Popover placement="bottom" shadow="md">
            <PopoverTrigger className="cursor-pointer">
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
            <PopoverContent className="p-1 dark:bg-dark-background-950 bg-light-background-100 w-[350px] gap-1 ">
                <div className="w-full py-2 dark:bg-dark-background-950/100 bg-light-background-50/10 rounded-t-sm">
                    <span className="text-xl font-bebas font-semilbold flex flex-row justify-center items-center gap-2">
                        SEU CARRINHO
                    </span>
                </div>
                <div className="min-h-[80px] w-full max-h-[200px] overflow-y-auto flex flex-col justify-start items-start gap-4 py-2">
                {
                    cart.itens.length > 0 
                    ? cart.itens.map(item => {
                        return(
                            <CartCardPopover 
                                key={`item_${item.item.id}`} 
                                item={item.item} 
                                quantity={item.quantity}
                            />
                        )
                    })
                    : <CartEmpty />
                }
                </div>
                <div className="flex flex-col justify-between items-center gap-2 w-full px-3 mt-2 dark:bg-dark-background-950 bg-light-background-100 rounded-b-sm">
                    <div className="flex flex-row justify-between items-end w-full">
                        <span className="font-normal">
                            Total
                        </span>
                        <span className="font-light font-bebas text-2xl text-right">
                            {cart.total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                        </span>
                    </div>
                    <Button variant="flat" fullWidth color="primary" as={Link} href="/carrinho">Finalizar compra</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}