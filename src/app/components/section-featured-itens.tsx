"use client"

import { useState } from "react";
import { ItemCard } from "./item-card";
import { Item } from "@prisma/client";


export function SectionFeaturedItens () {
  const [produtos, setProdutos] = useState<Item[]>([])

  return(
    <section className="w-full mt-4">
      <div className="flex flex-col items-start w-full gap-5 max-sm:items-center">
        <h1 className="font-bold text-zinc-800">Mais vendidos</h1>
        <div className="flex flex-row gap-2 items-center justify-start flex-wrap max-sm:justify-center w-full">
          {produtos.length > 0 
          ? produtos.map(item => { 
                return <ItemCard key={item.name} item={item} />
            })
          : <div className="flex flex-row justify-center items-center gap-4 mt-2">
            <span>Nenhum item encontrado </span>
          </div>} 
        </div>
      </div>
    </section>
    )
}
