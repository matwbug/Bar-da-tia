'use client'

import { CardProduto } from "@/components/pages/home/cardProduto"
import { CardProdutoPainel } from "@/components/pages/painel/home/cardProdutoPainel"
import listaProdutos from "@/config/produtos.json"
import { GoGraph } from "react-icons/go"

export default function Home(){

  return(
    <div className={`flex mx-1 mt-3 h-full flex-col gap-2`}>
      <div 
        className="
        bg-light-background-50 shadow-sm h-fit p-6 rounded-md w-full gap-3 flex flex-col
        "
      >
        <p className="flex flex-row gap-2 items-center text-medium lg:justify-start sm:justify-center">Mais vendidos <GoGraph /></p>
        <div className="flex flex-row gap-2 flex-wrap lg:justify-start sm:justify-center">
        {
          listaProdutos
          .sort((a, b) => {
            return b.vendas - a.vendas // Ordenando por número vendas
          })
          .map((item, index) => {
            if(index > 4) return null
            return(
              <CardProdutoPainel
                item={item}
                key={`item_${item.name}`}
              />
            )
          })
        }
        </div>
      </div>
    </div>
  )
}
