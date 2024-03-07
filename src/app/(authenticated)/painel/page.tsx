'use client' // Define que este arquivo deve ser executado apenas no lado do cliente

// Importa o componente CardProduto do diretório específico
import { CardProduto, produtoProps } from "@/components/pages/home/cardProduto"
import { CardProdutoSkeleton } from "@/components/pages/home/cardProdutoSkeleton";
// Importa o componente CardProdutoPainel do diretório específico
import { CardProdutoPainel } from "@/components/pages/painel/home/cardProdutoPainel"
import { getItens } from "@/services/itens";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
// Importa a lista de produtos do arquivo produtos.json
// Importa o ícone GoGraph do pacote react-icons
import { GoGraph } from "react-icons/go"

// Define a função do componente Home
export default function Home(){
  const [isLoading, setLoading] = useState(true)
  const [itens, setItens] = useState<produtoProps[]>([])

  const rowsperPage = 5

  async function fetchData() {
    try {
      const data = (await getItens(rowsperPage));
      if(data) setItens(data);

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
    // Estrutura principal da página
    <div className={`flex mx-1 mt-3 h-full flex-col gap-2`}>
      <div 
        className="
        bg-light-background-50 shadow-sm h-fit p-6 rounded-md w-full gap-3 flex flex-col
        "
      >
        {/* Título da seção */}
        <p className="flex flex-row gap-2 items-center text-medium lg:justify-start sm:justify-center">Mais vendidos <GoGraph /></p>
        {/* Lista de produtos mais vendidos */}
        <div className="flex flex-row gap-2 flex-wrap lg:justify-start sm:justify-center">
        {isLoading 
            ? <CardProdutoSkeleton length={rowsperPage} />
            : itens.length > 0 
              ? itens
                .sort((a, b) => {return b.vendas - a.vendas}) // Ordena os produtos com base nas vendas (do maior para o menor)
                .map(item => { // Mapeando os produtos e renderizando cada um deles
                    return <CardProdutoPainel key={item.name} item={item} fetchData={fetchData}/>
                })
              : <div className="flex flex-row justify-center items-center gap-4 mt-2">
                  <span>Nenhum item encontrado </span>
                  <Button onClick={() => fetchData()}><BiRefresh /> Atualizar</Button>
                </div>
        }
        </div>
      </div>
    </div>
  )
}
