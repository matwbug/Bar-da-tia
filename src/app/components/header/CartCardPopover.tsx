import { Image } from "@nextui-org/react"
import { produtoProps } from "../pages/home/CardProduto"

export const CartCardPopover = ({item}: {
    item: produtoProps
}) => {
    return(
        <div className="flex flex-row justify-center items-center">
            <Image 
                src={item.image}
                alt={item.name}
                width={30}
            />
            <span className="font-light text-tiny ">{item.name}</span>
        </div>
    )
}