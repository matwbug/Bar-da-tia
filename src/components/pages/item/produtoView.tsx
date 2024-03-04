'use client'

import { Button, Divider, Image } from "@nextui-org/react"
import { CardProduto, produtoProps } from "../home/cardProduto"
import { CiDiscount1 } from "react-icons/ci"
import { FaCartShopping } from "react-icons/fa6"
import { RelatedProdutos } from "./relatedProdutos"
import { useCart } from "@/contexts/cartContext"

export const ProdutoView = ({produto}: {
    produto: produtoProps
}) => {
   
    const { addCart } = useCart()

    return(
        <main className="flex flex-col container items-center gap-8">
            <div className="bg-light-background-200/50 w-full rounded-md flex p-6 items-center justify-center flex-col gap-1 lg:flex-row">
                <div className="min-w-300px p-5 ">
                    <Image 
                        src={produto.image}
                        alt={produto.name}
                        width={300}
                    />
                </div>
                <div className="flex flex-col gap-5 max-w-[700px]">
                    <div className="flex flex-col justify-start gap-3">
                        <p className="font-normal font-bebas text-2xl">{produto.name}</p>
                        <span className="font-light text-gray-800">{produto.description}</span>
                    </div>
                    <div className="flex flex-row gap-6 items-center justify-start ">
                        {produto.atacado && 
                            <div className="flex flex-col gap-1 justify-start">
                            <span className="text-emerald-400 font-medium text-xl">
                                {(produto.preco - (produto.preco * 0.05)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                            </span>     
                            <span className="text-tiny bg-emerald-400 p-1 rounded font-light text-white">A PARTIR DE {produto.atacado_minquantidade} UN</span>
                        </div>}
                        <div className="flex flex-col gap-1 justify-start">
                            <span className="font-medium text-xl">
                                {(produto.preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                            </span>
                            <span className="text-tiny py-1 rounded text-gray-600 font-light">PREÇO UNITÁRIO</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="flex flex-row gap-1 text-gray-800 items-center justify-start"> <CiDiscount1 size={20}/> Desconto aplicado no momento da compra no carrinho</span>
                        <Button variant="flat" color="primary" className="max-w-96" fullWidth onClick={() => addCart({item: produto, quantity: 1})}><FaCartShopping /> Adicionar</Button>
                    </div>
                </div>
            </div>
            <RelatedProdutos produto={produto} />
        </main>
    )
}