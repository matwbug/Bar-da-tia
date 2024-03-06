'use client'

import { motion, useAnimation } from "framer-motion"; // Importa os componentes necessários do Framer Motion para animações
import { Button, Image, Link } from "@nextui-org/react"; // Importa os componentes necessários do NextUI
import { useCallback, useEffect, useState } from "react"; // Importa o hook useState do React para gerenciamento de estado
import { FaArrowDown, FaMinus, FaPlus } from "react-icons/fa"; // Importa os ícones necessários da biblioteca React Icons
import { useCart } from "@/contexts/cartContext"; // Importa o contexto de carrinho
import { MdAddShoppingCart } from "react-icons/md"; // Importa o ícone de adicionar ao carrinho
import { BiRefresh } from "react-icons/bi";
import { CardProdutoSkeleton } from "../home/cardProdutoSkeleton";
import { getItensWithSearch } from "@/services/itens";

// Define o tipo para as propriedades dos produtos
export type produtoProps = {
    id: number
    name: string
    description: string
    slug: string
    preco: number
    image: string
    quantidade: number
    promocao: boolean
    promocao_preco: number
    atacado: boolean
    atacado_minquantidade: number
    vendas: number
    status: string
}

// Componente para renderizar um card de produto
export const CardProdutoWithSearch = ({search}: {
    search: string
}) => {
    const [open, setOpen] = useState(false); // Estado para controlar a visibilidade do botão de adicionar ao carrinho
    const { cart, addCart, removeCart } = useCart(); // Usa o contexto do carrinho

    
    const [isLoading, setLoading] = useState(true)
    const [produtos, setProdutos] = useState<produtoProps[]>([])

    const limitPerPage = 5

    const fetchData = useCallback(async () => {
        try {
            const data = (await getItensWithSearch(search, limitPerPage)).sort((a, b) => b.vendas - a.vendas);
            if (data) setProdutos(data);
        } catch (error) {
            console.error('Erro ao carregar os produtos:', error);
        } finally {
            setLoading(false);
        }
    }, [search, limitPerPage, setProdutos]);
    
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    

    // Função para calcular o desconto percentual
    function calcularDesconto(valorOriginal: number, valorComDesconto: number) {
        let diferenca = valorOriginal - valorComDesconto; // Calcula a diferença entre os valores
        let porcentagemDesconto = (diferenca / valorOriginal) * 100; // Calcula a porcentagem de desconto
        return porcentagemDesconto.toFixed(0);
    }

    return(
        <div className="flex flex-row gap-2 items-center justify-start flex-wrap max-sm:justify-center w-full">
            {isLoading 
            ? <CardProdutoSkeleton length={5} />
            : produtos.length > 0 
            ? produtos
                .sort((a, b) => {return b.vendas - a.vendas}) // Ordena os produtos com base nas vendas (do maior para o menor)
                .map(item => { // Mapeando os produtos e renderizando cada um deles
                    
                    return (
                        <div key={`item_${item.name}`} className="bg-light-background-50 hover:bg-light-background-100 shadow-md w-[19%] max-lg:w-[30%] min-w-[200px]">
                            <Link 
                                href={`/item/${item.id}`}
                                className="w-full"
                            >
                                {/* Componente com animações do Framer Motion */}
                                <motion.div className="duration-200 ease-in-out
                                    flex flex-col gap-4 justify-center items-center rounded-md p-4 w-full h-64 max-lg:"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.1, velocity: .5 }}    
                                >
                                    <div className="w-[100%] h-[50%] flex items-center justify-center">
                                        <Image 
                                            src={item.image}
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
                            </Link>
                            {/* Botão de adicionar ao carrinho */}
                        </div>
                    )
                })
            : <div className="flex flex-row justify-center items-center gap-4 mt-2">
                <span>Nenhum item encontrado </span>
                <Button onClick={() => fetchData()}><BiRefresh /> Atualizar</Button>
            </div>
            }
        </div>
    )
}
