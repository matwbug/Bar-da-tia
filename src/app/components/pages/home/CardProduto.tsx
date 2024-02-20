import { Image, Link } from "@nextui-org/react"
import clsx from "clsx"
import { CiDeliveryTruck } from "react-icons/ci"
import { FaArrowDown, FaTruck } from "react-icons/fa"

export type produtoProps = {
    id: number
    name: string
    description: string
    preco: number
    image: string
    quantidade: number
    promocao_relampago: boolean
    preco_atacado: boolean
}

export const CardProduto = ({item}: {
    item: produtoProps
}) => {
    return(
        <Link key={`item_${item.name}`} href={`/item/${item.id}`} >
            <div className="flex flex-col justify-center items-center dark:bg-[#1e1e1e] rounded-md p-4 w-80 h-70">
                <Image 
                    src={item.image}
                    width={200}
                    alt={item.name}
                />
                <div className="flex flex-col gap-2 justify-center align-center">
                    <p className="text-large text-white font-medium">{item.name}</p>
                    <div className="flex flex-row gap-2 items-center">
                        <span className="text-xl font-medium text-neutral-500 line-through">
                            {item.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                        </span>
                        <span className="flex flex-row font-light text-xs items-center gap-1 dark:text-white text-black bg-emerald-400 rounded-md p-1">
                            <FaArrowDown className={"dark:text-white text-black"} /> 
                            5%
                        </span>
                    </div>
                    <div className="flex flex-column gap-2 dark:text-white text-black items-center">
                        <span className="text-xl font-bold">
                            {(item.preco - (item.preco * 0.05)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                        </span>
                        <span className="font-light text-md">
                            No pix
                        </span>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-1">
                        <FaTruck className="text-emerald-400" size={20}/>
                        <span className="text-sm text-emerald-400"> Entrega ainda hoje </span>
                    </div>
                </div>
            
            </div>
        </Link>
    )
}