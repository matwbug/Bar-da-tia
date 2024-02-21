import { Image } from "@nextui-org/react"
import { produtoProps } from "../CardProduto"

export const CartCardPopover = ({item, quantity}: {
    item: produtoProps
    quantity: number
}) => {
    return(
        <div className="flex flex-row justify-between items-center gap-1 w-full pr-2">
            <Image 
                src={item.image}
                alt={item.name}
                width={50}
            />
            <span className="font-thin text-sm">
                {item.name.length > 20 ? `${item.name.substring(0,20)}...` : item.name}
            </span>
            <span>{quantity}x</span>
            <span className="text-md font-semibold">{(item.preco * quantity).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
        </div>
    )
}