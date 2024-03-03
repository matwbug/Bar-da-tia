import { Image } from "@nextui-org/react"
import { produtoProps } from "../cardProduto"

export const CartCardPopover = ({item, quantity}: {
    item: produtoProps
    quantity: number
}) => {
    return(
        <div className="flex flex-row justify-between items-center gap-1 w-full pr-2">
            <div>
                <Image 
                    src={item.image}
                    alt={item.name}
                    width={50}
                    className="object-cover"
                    classNames={{
                        wrapper: `bg-light-background-50 rounded-md`
                    }}
                />
            </div>
            <span className="font-light text-sm">
                {item.name.length > 20 ? `${item.name.substring(0,20)}...` : item.name}
            </span>
            <span className="font-light text-sm">{quantity}x</span>
            <span className="font-medium">{(item.preco * quantity).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
        </div>
    )
}