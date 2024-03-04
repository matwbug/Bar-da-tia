'use client'

import { Button, Divider, Image } from "@nextui-org/react"; // Importa componentes do Next UI
import { CardProduto, produtoProps } from "../home/cardProduto"; // Importa o componente CardProduto e o tipo produtoProps
import { CiDiscount1 } from "react-icons/ci"; // Importa o ícone CiDiscount1
import { FaCartShopping } from "react-icons/fa6"; // Importa o ícone FaCartShopping
import { RelatedProdutos } from "./relatedProdutos"; // Importa o componente RelatedProdutos
import { useCart } from "@/contexts/cartContext"; // Importa o hook useCart do contexto do carrinho
import { MdBlock, MdOutlineAppBlocking } from "react-icons/md"; // Importa os ícones MdBlock e MdOutlineAppBlocking

// Componente para visualização de um produto específico
export const ProdutoView = ({produto}: {
    produto: produtoProps // Propriedade do tipo produtoProps, representando um produto
}) => {
   
    const { addCart } = useCart(); // Usa o hook useCart para acessar funcionalidades do carrinho

    return(
        <main className="flex flex-col container items-center gap-8"> {/* Contêiner principal */}
            <div className="relative bg-light-background-200/50 w-full rounded-md flex p-6 items-center justify-center flex-col gap-1 lg:flex-row"> {/* Div para exibir informações do produto */}
                {
                    produto.status === 'DESATIVADO' // Verifica se o status do produto é DESATIVADO
                    && <div className="z-50 absolute top-0 left-0 w-full h-full bg-light-background-200/[0.7] flex flex-col justify-center items-center gap-4"> {/* Div para exibir mensagem de item desativado */}
                        <MdOutlineAppBlocking size={100} /> {/* Ícone de item desativado */}
                        <p className="text-2xl font-bold">ITEM DESATIVADO</p> {/* Mensagem de item desativado */}
                    </div>
                }
                <div className="min-w-300px p-5 "> {/* Div para exibir imagem do produto */}
                    <Image 
                        src={produto.image} // URL da imagem do produto
                        alt={produto.name} // Texto alternativo da imagem
                        width={300} // Largura da imagem
                    />
                </div>
                <div className="flex flex-col gap-5 max-w-[700px]"> {/* Div para exibir detalhes do produto */}
                    <div className="flex flex-col justify-start gap-3"> {/* Div para exibir nome e descrição do produto */}
                        <p className="font-normal font-bebas text-2xl">{produto.name}</p> {/* Nome do produto */}
                        <span className="font-light text-gray-800">{produto.description}</span> {/* Descrição do produto */}
                    </div>
                    <div className="flex flex-row gap-6 items-center justify-start "> {/* Div para exibir preço do produto */}
                        {produto.atacado && // Verifica se o produto está em atacado
                            <div className="flex flex-col gap-1 justify-start"> {/* Div para exibir preço no atacado */}
                                <span className="text-emerald-400 font-medium text-xl">{(produto.preco - (produto.preco * 0.05)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span> {/* Preço no atacado */}
                                <span className="text-tiny bg-emerald-400 p-1 rounded font-light text-white">A PARTIR DE {produto.atacado_minquantidade} UN</span> {/* Quantidade mínima para atacado */}
                            </div>}
                        <div className="flex flex-col gap-1 justify-start"> {/* Div para exibir preço unitário */}
                            <span className="font-medium text-xl">{(produto.preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span> {/* Preço unitário do produto */}
                            <span className="text-tiny py-1 rounded text-gray-600 font-light">PREÇO UNITÁRIO</span> {/* Texto indicando preço unitário */}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3"> {/* Div para exibir desconto e botão de adicionar ao carrinho */}
                        <span className="flex flex-row gap-1 text-gray-800 items-center justify-start"> <CiDiscount1 size={20}/> Desconto aplicado no momento da compra no carrinho</span> {/* Texto indicando desconto aplicado */}
                        <Button disabled={produto.status === 'DESATIVADO'} variant="flat" color="primary" className="max-w-96" fullWidth onClick={() => addCart({item: produto, quantity: 1})}><FaCartShopping /> Adicionar</Button> {/* Botão de adicionar ao carrinho */}
                    </div>
                </div>
            </div>
            <RelatedProdutos produto={produto} /> {/* Renderiza produtos relacionados */}
        </main>
    )
}
