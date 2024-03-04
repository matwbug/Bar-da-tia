import { produtoProps } from "../../home/cardProduto"
import { Image } from "@nextui-org/react"
import { FaArrowDown } from "react-icons/fa"
import { useEffect, useState } from "react"
import { ModalEditProduto } from "./modalEditProduto"

/**
 * Componente CardProdutoPainel
 * 
 * @param {object} item - As informações do produto.
 */
export const CardProdutoPainel = ({item}: {
    item: produtoProps
}) => {

    // Estado para controlar a abertura do modal de edição do produto
    const [modalOpen, setModalOpen] = useState(false)

    // Estado para armazenar as informações do produto
    const [produto, setProduto] = useState<produtoProps>(item)

    return(<>
        {/* Modal de edição do produto */}
        <ModalEditProduto 
            produto={produto}
            setProduto={setProduto}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
        />
        {/* Card do produto */}
        <div 
            onClick={() => setModalOpen(true)}
            key={`item_${item.name}`}
            className="
                relative cursor-pointer
                shadow-md flex flex-col gap-4 
                justify-center items-start dark:bg-[#1e1e1e]
                bg-light-background-50 rounded-md p-4 w-full 
                min-w-40 max-w-40 h-[280px]
                hover:bg-light-background-200/hover
                ease-in-out duration-300
            "
        >
            {/* Imagem do produto */}
            <div className="max-w-[200px]">
                <Image 
                    src={item.image}
                    width={150}
                    alt={item.name}
                    className="object-cover"
                />
            </div>
            {/* Informações do preço e promoção */}
            <div className="flex flex-col gap-2 justify-center w-full">
                {
                    item.promocao
                    ? <div className="flex flex-col gap-1 w-full">
                        {/* Preço com desconto */}
                        <span className="text-xl font-bebas text-emerald-500">
                            {item.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                        </span>
                        {/* Preço anterior com desconto */}
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
                    // Se o produto estiver em atacado
                    : item.atacado 
                        ? <div className="flex flex-col gap-0">
                            <div className="flex flex-row gap-2">
                                {/* Preço anterior no atacado */}
                                <span className="text-xl text-black dark:text-white font-bebas line-through">
                                    {(item.preco - (item.preco * 0.10)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                </span>
                                {/* Novo preço no atacado */}
                                <span className="text-emerald-400 text-xl dark:text-white font-bebas">
                                    {(item.preco - (item.preco * 0.05)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                </span>   
                            </div>
                            {/* Informação sobre compra no atacado */}
                            <span className="text-tiny bg-emerald-400 p-1 rounded font-light text-white">A PARTIR DE 3 UN</span>
                        </div>
                        // Se o produto não estiver em promoção ou atacado
                        :<span className="text-xl font-medium text-black dark:text-white font-bebas">
                            {(item.preco - (item.preco * 0.10)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                        </span>
                }
                {/* Nome do produto */}
                <p className="text-sm font-medium text-gray-600 dark:text-white">
                    {item.name.length > 28 ? `${item.name.substring(0,28)}...` : `${item.name}`}
                </p>
            </div>
        </div>
    </>)    
}
