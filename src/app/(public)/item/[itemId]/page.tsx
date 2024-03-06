'use client'

import { produtoProps } from "@/components/pages/home/cardProduto";
import { ProdutoNotExists } from "@/components/pages/item/produtoNotExists" // Importa o componente ProdutoNotExists do diretório específico
import { ProdutoView } from "@/components/pages/item/produtoView" // Importa o componente ProdutoView do diretório específico
import { getItem } from "@/services/itens";
import { useEffect, useState } from "react";

// Define a função do componente ItemIndex
export default function ItemIndex({params}: {
  params: {
    itemId: string,
  },
}){
    const [produto, setProduto] = useState<produtoProps | null>()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
      async function fetchData() {
        try {
          const data = (await getItem(parseInt(params.itemId)));
          if(data) setProduto(data);
          else setProduto(null)
  
        } catch (error) {
          console.error('Erro ao carregar os produtos:', error);
        }
        finally{
          setLoading(false)
        }
      }
      fetchData();
    }, [params.itemId]);

    // Verifica se o produto existe
    if(produto === null)  return <ProdutoNotExists /> // Renderiza o componente ProdutoNotExists se o produto não existir

    return <ProdutoView produto={produto} isLoading={isLoading} /> // Renderiza o componente ProdutoView com as informações do produto
    
}
