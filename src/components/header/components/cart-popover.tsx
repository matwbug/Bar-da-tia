import { Item } from "@prisma/client";
import Image from "next/image";

// Componente funcional CartCardPopover que exibe detalhes de um item no carrinho dentro de um popover
export const CartCardPopover = ({ item, quantity }: {
    item: Item // Propriedade item do tipo produtoProps que representa o item no carrinho
    quantity: number // Propriedade quantity que representa a quantidade do item no carrinho
}) => {
    return(
        <div className="flex flex-row justify-between items-center gap-1 w-full pr-2"> {/* Container flexível para os detalhes do item */}
            <div className="w-[50px] `bg-light-background-50 rounded-md"> {/* Container para a imagem do item */}
                <Image 
                    src={item.images[0]} // Define a origem da imagem como a propriedade image do item
                    alt={item.name} // Define o texto alternativo para a imagem como o nome do item
                    width={50}
                    height={50}
                />
            </div>
            <span className="font-light text-sm">
                {item.name.length > 20 ? `${item.name.substring(0,20)}...` : item.name} {/* Renderiza o nome do item limitado a 20 caracteres */}
            </span>
            <span className="font-light text-sm">{quantity}x</span> {/* Renderiza a quantidade do item */}
            {/* Condicionalmente renderiza o preço do item com desconto se atender às condições */}
            {(item.atacado && item.atacadoMinQuantidade && quantity >= item.atacadoMinQuantidade 
                ? <span className="font-medium text-emerald-500">{((item.preco - (item.preco * 0.25)) * quantity).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
                : <span className="font-medium">
                    {(item.preco * quantity).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} {/* Renderiza o preço total do item */}
                </span>
            )}
        </div>
    )
}
