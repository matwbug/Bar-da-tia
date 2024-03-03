import { Image } from "@nextui-org/react"
import { CardProduto, produtoProps } from "./cardProduto"
import listaProdutos from "@/config/produtos.json"

export const HeroSection = () => {
    return(
        <section className="w-full">
            <div className="flex flex-col items-start w-full gap-5">
                <h1 className="font-bold text-zinc-800">Mais vendidos</h1>
                <div className="flex flex-row gap-2 items-start justify-start flex-wrap max-sm:justify-center">
                    {listaProdutos
                    .sort((a, b) => {return b.vendas - a.vendas})
                    .map(item => { // Mapeando os produtos

                        return <CardProduto key={item.name} item={item} />
                    })}
                </div>
            </div>
        </section>
    )
}