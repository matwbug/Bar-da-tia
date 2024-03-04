import { Image, Tooltip } from "@nextui-org/react"
import { produtoProps } from "../cardProduto"

export const CartCardPopover = ({item, quantity}: {
    item: produtoProps
    quantity: number
}) => {
    return(
        <div className="flex flex-row justify-between items-center gap-1 w-full pr-2">
            <div className="w-[50px]">
                <Image 
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full"
                    classNames={{
                        wrapper: `bg-light-background-50 rounded-md`
                    }}
                />
            </div>
            <span className="font-light text-sm">
                {item.name.length > 20 ? `${item.name.substring(0,20)}...` : item.name}
            </span>
            <span className="font-light text-sm">{quantity}x</span>
            {(item.atacado && item.atacado_minquantidade && quantity >= item.atacado_minquantidade 
                ? <span className="font-medium text-emerald-500">{((item.preco - (item.preco * 0.25)) * quantity).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
                : <span className="font-medium">
                    {(item.preco * quantity).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                </span>
            )}
        </div>
    )
}