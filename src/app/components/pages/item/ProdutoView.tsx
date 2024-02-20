import { Button, Image } from "@nextui-org/react"
import { CardProduto, produtoProps } from "../home/CardProduto"
import { CiDiscount1 } from "react-icons/ci"
import { listaProdutos } from "../home/HeroSection"
import { FaCartShopping } from "react-icons/fa6"
import sqlite from 'sqlite3'

export const ProdutoView = ({produto}: {
    produto: produtoProps
}) => {
   
    return(
        <main className="flex flex-col container items-center">
            <div className="w-full rounded flex items-center justify-center md:flex-row flex-col gap-1">
                <div className="min-w-300px p-5">
                    <Image 
                        src={produto.image}
                        alt={produto.name}
                        width={350}
                    />
                </div>
                <div className="flex flex-col gap-5 max-w-[700px]">
                    <div className="flex flex-col justify-start gap-3">
                        <p className="font-normal font-bebas text-2xl">{produto.name}</p>
                        <span className="font-light text-gray-400">{produto.description}</span>
                    </div>
                    <div className="flex flex-row gap-6 items-center justify-start ">
                        <div className="flex flex-col gap-1 justify-start">
                            <span className="text-emerald-400 font-medium text-xl">
                                {(produto.preco - (produto.preco * 0.05)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                            </span>
                            <span className="text-tiny bg-emerald-400 p-1 rounded font-light">A PARTIR DE 3 UN</span>
                        </div>
                        <div className="flex flex-col gap-1 justify-start">
                            <span className="font-medium text-xl">
                                {(produto.preco).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                            </span>
                            <span className="text-tiny py-1 rounded text-gray-400 font-light">PREÇO UNITÁRIO</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="flex flex-row gap-1 text-gray-400 items-center justify-start"> <CiDiscount1 size={20}/> Desconto aplicado no momento da compra no carrinho</span>
                        <Button variant="flat" color="primary" className="max-w-60"><FaCartShopping /> Adicionar</Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-2 mt-10">
                <p className="font-light text-large text-white text-left">Produtos relacionados</p>
                <div className="flex flex-row gap-3 justify-center items-center">
                {
                    listaProdutos
                    .filter(item => item !== produto)
                    .map(item => {
                        return(
                            <CardProduto key={`item_${item.name}`} item={item}/>
                        )
                    })
                }
                </div>
            </div>
        </main>
    )
}