'use client'

import { Popover, PopoverContent, PopoverTrigger, User } from "@nextui-org/react"
import { FaCartShopping } from "react-icons/fa6"
import { useCart } from "../contexts/CartContext"
import { CartCardPopover } from "./CartCardPopover"

export const CartNavbar = () => {
    const { cart } = useCart()

    return(
        <Popover placement="bottom" shadow="sm">
            <PopoverTrigger className="cursor-pointer">
                <div className="flex flex-row">
                    <span className="font-light flex justify-center items-center flex-row gap-2">
                        <FaCartShopping />
                        {cart.itens.length > 0 && cart.itens.length}
                    </span>
                </div>
            </PopoverTrigger>
            <PopoverContent className="p-1 bg-dark-background">
                <div className="w-[250px] min-h-[80px] max-h-[200px] overflow-y-auto flex flex-col justify-start items-start gap-4">
                {cart.itens.map(item => {
                    return(
                        <CartCardPopover key={`item_${item.item.id}`} item={item.item}/>
                    )
                })}
                </div>
            </PopoverContent>
        </Popover>
    )
}