import { TbShoppingCartExclamation } from "react-icons/tb"; // Importa o ícone TbShoppingCartExclamation do pacote react-icons/tb

// Componente funcional CartEmpty que exibe uma mensagem quando o carrinho está vazio
export const CartEmpty = () => {
    return(
        <div className="w-full flex justify-center items-center flex-col h-[70px] gap-2"> {/* Container flexível para o conteúdo */}
            <TbShoppingCartExclamation size={40} className="text-gray-900" /> {/* Ícone de carrinho vazio com cor cinza */}
            <p className="text-gray-900 font-light">Seu carrinho está vazio</p> {/* Mensagem indicando que o carrinho está vazio */}
        </div>
    )
}
