import { Image, Link } from "@nextui-org/react"
import { FaArrowDown, FaTruck } from "react-icons/fa"
import { listaProdutos } from "../home/HeroSection"
import { produtoProps } from "../home/CardProduto"

export const RelatedProdutos = ({produto}: {
    produto: produtoProps
}) => {

    return(
        <div className="flex flex-col justify-center items-start gap-2 mt-10 w-full">
            <p className="font-light text-large text-white text-left">Produtos relacionados</p>
            <div className="flex flex-row gap-2 justify-center items-center flex-wrap">
            {
                listaProdutos
                .filter(item => item !== produto)
                .map(item => {
                    return(
                        <Link key={`item_${item.name}`} href={`/item/${item.id}`}>
                            <div className="flex flex-col justify-center items-center dark:bg-dark-default-950/30 bg-light-background-50 rounded-md p-4 gap-3 w-80 md:w-70 ">
                                <Image 
                                    src={item.image}
                                    width={120}
                                    alt={item.name}
                                />
                                <div className="flex flex-col gap-2 justify-center align-center">
                                    <p className="text-md font-medium text-black dark:text-white">
                                        {item.name.length > 20 ? `${item.name.substring(0,20)}...` : `${item.name}`}
                                    </p>
                                    <div className="flex flex-row gap-2 items-center justify-start">
                                        <span className="text-xl font-medium text-neutral-500 line-through">
                                            {item.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                        </span>
                                        <span className="flex flex-row font-light text-xs items-center gap-1 text-white bg-emerald-400 rounded-md p-1">
                                            <FaArrowDown className={"text-white"} /> 
                                            10%
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-column gap-2 dark:text-white text-black items-end">
                                            <span className="text-xl font-bold">
                                                {(item.preco - (item.preco * 0.10)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
            </div>
        </div>
    )
}