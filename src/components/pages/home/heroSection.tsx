import { Image } from "@nextui-org/react"
import { CardProduto, produtoProps } from "./cardProduto"
import listaProdutos from "@/config/produtos.json"

export const HeroSection = () => {
    return(
        <section className="w-full mt-10">
            <div className="container flex flex-col items-start w-full gap-5">
                <div className="flex flex-row gap-2 items-start justify-start flex-wrap sm:justify-center">
                    {listaProdutos
                    // .filter(item => item.promocao) // Filtrando por apenas produtos em promoção
                    .map(item => { // Mapeando os produtos
                        return <CardProduto key={item.name} item={item} />
                    })}
                </div>
            </div>
        </section>
    )
}