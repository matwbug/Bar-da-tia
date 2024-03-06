import { produtoProps } from "../../home/cardProduto"
import { Image } from "@nextui-org/react"
import { FaArrowDown } from "react-icons/fa"
import { useEffect, useState } from "react"
import { ModalEditProduto } from "./modalEditProduto"
import { motion } from 'framer-motion'
 
/**
 * Componente CardProdutoPainel
 * 
 * @param {object} item - As informações do produto.
 */
export const CardProdutoPainel = ({item}: {
    item: produtoProps
}) => {

    // Função para calcular o desconto percentual
    function calcularDesconto(valorOriginal: number, valorComDesconto: number) {
        let diferenca = valorOriginal - valorComDesconto; // Calcula a diferença entre os valores
        let porcentagemDesconto = (diferenca / valorOriginal) * 100; // Calcula a porcentagem de desconto
        return porcentagemDesconto.toFixed(0);
    }
    
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
        <div key={`item_${item.name}`} className="bg-light-background-50 hover:bg-light-background-100 shadow-md w-[19%] max-lg:w-[30%] min-w-[200px] h-80 flex justify-center items-center">
            {/* Componente com animações do Framer Motion */}
            <motion.div className="duration-200 ease-in-out cursor-pointer
                flex flex-col gap-4 justify-center items-center rounded-md p-4 w-full h-64"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.1, velocity: .5 }}    
                onClick={() => setModalOpen(true)}
            >
                <div className="w-[100%] h-[50%] flex items-center justify-center">
                    <Image 
                        src={item.imageUrl}
                        alt={item.name}
                        className="object-cover w-full h-full"
                        classNames={{
                            wrapper: 'w-full h-full'
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2 justify-center w-full">
                    { 
                        item.promocao && item.promocao_preco // Verifica se há promoção
                        ? <div className="flex flex-col gap-1 w-full">
                            <div className="flex flex-row gap-2">
                                <span className="text-xl font-bebas text-emerald-500">
                                    {item.promocao_preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                </span>
                                <span className="flex flex-row font-light text-tiny items-center gap-1 text-white bg-emerald-400 rounded-md p-1">
                                    <FaArrowDown className={"text-white"} /> 
                                    -{calcularDesconto(item.preco, item.promocao_preco)}%
                                </span>
                            </div>
                            <div className="flex flex-row justify-start items-center gap-2">
                                
                                <span className="text-tiny font-light dark:text-white line-through text-gray-700 ">
                                    {(item.preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                </span>
                            </div>
                            
                        </div>
                        :  <div className="">
                            <span className="text-xl font-medium text-black dark:text-white font-bebas">
                                {(item.preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                            </span>
                        </div>
                    }
                    <p className="text-gray-900 dark:text-white">
                        {item.name.length >= 20 ? `${item.name.substring(0,20)}...` : `${item.name}`}
                    </p>
                </div>
            </motion.div>
        </div>
    </>)    
}
