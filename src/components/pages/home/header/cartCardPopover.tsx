import { Image, Tooltip } from "@nextui-org/react"; // Importa os componentes Image e Tooltip do NextUI
import { produtoProps } from "../cardProduto"; // Importa o tipo produtoProps do arquivo cardProduto

// Componente funcional CartCardPopover que exibe detalhes de um item no carrinho dentro de um popover
export const CartCardPopover = ({item, quantity}: {
    item: produtoProps // Propriedade item do tipo produtoProps que representa o item no carrinho
    quantity: number // Propriedade quantity que representa a quantidade do item no carrinho
}) => {
    return(
        <div className="flex flex-row justify-between items-center gap-1 w-full pr-2"> {/* Container flexível para os detalhes do item */}
            <div className="w-[50px]"> {/* Container para a imagem do item */}
                <Image 
                    src={item.imageUrl} // Define a origem da imagem como a propriedade image do item
                    alt={item.name} // Define o texto alternativo para a imagem como o nome do item
                    className="object-cover w-full h-full" // Aplica estilos para a imagem
                    classNames={{
                        wrapper: `bg-light-background-50 rounded-md` // Aplica classes CSS adicionais para o wrapper da imagem
                    }}
                />
            </div>
            <span className="font-light text-sm">
                {item.name.length > 20 ? `${item.name.substring(0,20)}...` : item.name} {/* Renderiza o nome do item limitado a 20 caracteres */}
            </span>
            <span className="font-light text-sm">{quantity}x</span> {/* Renderiza a quantidade do item */}
            {/* Condicionalmente renderiza o preço do item com desconto se atender às condições */}
            {(item.atacado && item.atacado_minquantidade && quantity >= item.atacado_minquantidade 
                ? <span className="font-medium text-emerald-500">{((item.preco - (item.preco * 0.25)) * quantity).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
                : <span className="font-medium">
                    {(item.preco * quantity).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} {/* Renderiza o preço total do item */}
                </span>
            )}
        </div>
    )
}
