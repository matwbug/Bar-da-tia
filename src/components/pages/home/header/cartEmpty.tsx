import { TbShoppingCartExclamation } from "react-icons/tb"

export const CartEmpty = () => {
    return(
        <div className="w-full flex justify-center items-center flex-col h-[70px] gap-2">
            <TbShoppingCartExclamation size={40} className="text-gray-600" />
            <p className="text-gray-600 font-light">Seu carrinho está vázio</p>
        </div>
    )
}