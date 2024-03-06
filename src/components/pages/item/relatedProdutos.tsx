"use client"

import { getProdutosExceptId } from "@/services/itens";
import { CardProduto, produtoProps } from "../home/cardProduto";
import { useEffect, useState } from "react";
import { CardProdutoSkeleton } from "../home/cardProdutoSkeleton";

// Componente para exibir produtos relacionados ao produto atual
export const RelatedProdutos = ({produtoId, isLoading}: {
    produtoId?: number
    isLoading: boolean
}) => {

    const [produtos, setProdutos] = useState<produtoProps[]>([])
    const [loading, setLoad] = useState(true)

    let limitPerPage = 5

    useEffect(() => {
        async function fetchData() {
          try {
            if(produtoId){
                const data = (await getProdutosExceptId(produtoId, limitPerPage));
                if(data) setProdutos(data);
            }
          } catch (error) {
            console.error('Erro ao carregar os produtos:', error);
          }
          finally{
            setLoad(false)
          }
        }

        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [produtoId]);

    return (
        <div className="flex flex-col justify-center items-start gap-6 w-full max-lg:text-center max-lg:items-center">
            {/* Título indicando que são produtos relacionados */}
            <h1 className="font-bold text-zinc-800">Produtos relacionados</h1>
            <div className="flex flex-row gap-3 justify-start items-center flex-wrap w-full max-lg:justify-center">
                {/* Mapeamento dos produtos relacionados */}
                {isLoading || loading 
                    ? <CardProdutoSkeleton length={limitPerPage} />
                    : produtos
                    .sort((a, b) => {return b.vendas - a.vendas}) // Ordena os produtos com base nas vendas (do maior para o menor)
                    .map(item => { // Mapeando os produtos e renderizando cada um deles
                      return <CardProduto key={item.name} item={item} />
                })}
            </div>
        </div>
    );
};
