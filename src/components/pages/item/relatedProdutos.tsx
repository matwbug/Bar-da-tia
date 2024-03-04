import { Image, Link } from "@nextui-org/react"
import { FaArrowDown, FaTruck } from "react-icons/fa"
import listaProdutos from "@/config/produtos.json"
import { CardProduto, produtoProps } from "../home/cardProduto"

export const RelatedProdutos = ({produto}: {
    produto: produtoProps
}) => {

    return(
        <div className="flex flex-col justify-center items-start gap-6 w-full">
            <h1 className="font-bold text-zinc-800">Produtos relacionados</h1>
            <div className="flex flex-row gap-2 justify-start items-center flex-wrap">
            {
                listaProdutos
                .filter(item => item.id !== produto.id)
                .map((item, index) => {
                    if(index > 5) return null
                    return <CardProduto key={item.name} item={item} />
                })
            }
            </div>
        </div>
    )
}