"use client"

import { CardProduto, produtoProps } from "@/components/pages/home/cardProduto";
import { CardProdutoSkeleton } from "@/components/pages/home/cardProdutoSkeleton";
import { CardProdutoWithSearch } from "@/components/pages/itens/cardProdutosWithSearch";
import { getItens } from "@/services/itens";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { BsBack } from "react-icons/bs";
import { IoArrowBackOutline } from "react-icons/io5";

export default function ItensWithSearchPage({params}: {
    params: {
      search: string,
    },
}){

    const { push } = useRouter()

    return(
        <div className="container flex flex-col gap-4 mt-8">
            <div className="flex flex-col gap-6 items-center justify-start w-full">
                <div className="flex flex-row gap-2 items-center justify-start w-full"> 
                    <Button onClick={() => push('/')} className="bg-transparent" isIconOnly><IoArrowBackOutline /></Button>
                    <p>Resultados encontrados com sua busca  <b>{params.search}</b></p>
                </div>
                <CardProdutoWithSearch search={params.search} />
            </div>
        </div>
    )
}