"use client"

import { Button, Image } from "@nextui-org/react";
import { CardProduto, produtoProps } from "./cardProduto"; // Importa o componente CardProduto e o tipo produtoProps
import { useEffect, useState } from "react";
import { CardProdutoSkeleton } from "./cardProdutoSkeleton";
import { BiRefresh } from "react-icons/bi";
import prisma from '@/lib/prisma'
import { getItens } from "@/services/itens";

// Componente para renderizar a seção de produtos mais vendidos

export const HeroSection = () => {
    const [isLoading, setLoading] = useState(true)
    const [produtos, setProdutos] = useState<produtoProps[]>([])

    const limitPerPage = 5

    async function fetchData() {
      try {
        const data = (await getItens(limitPerPage)).sort((a, b) => b.vendas - a.vendas);
        if(data) setProdutos(data);

      } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
      }
      finally{
        setLoading(false)
      }
    }

    useEffect(() => {
      fetchData();
    }, []);

    return(
        <section className="w-full mt-4">
          <div className="flex flex-col items-start w-full gap-5 max-sm:items-center">
              <h1 className="font-bold text-zinc-800">Mais vendidos</h1>
              <div className="flex flex-row gap-2 items-center justify-start flex-wrap max-sm:justify-center w-full">
                  {isLoading 
                  ? <CardProdutoSkeleton length={5} />
                  : produtos.length > 0 
                    ? produtos
                      .sort((a, b) => {return b.vendas - a.vendas}) // Ordena os produtos com base nas vendas (do maior para o menor)
                      .map(item => { // Mapeando os produtos e renderizando cada um deles
                          return <CardProduto key={item.name} item={item} />
                      })
                    : <div className="flex flex-row justify-center items-center gap-4 mt-2">
                        <span>Nenhum item encontrado </span>
                        <Button onClick={() => fetchData()}><BiRefresh /> Atualizar</Button>
                      </div>
                  }
              </div>
          </div>
        </section>
    )
}
