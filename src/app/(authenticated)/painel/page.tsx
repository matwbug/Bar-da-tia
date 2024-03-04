'use client' // Define que este arquivo deve ser executado apenas no lado do cliente

// Importa o componente CardProduto do diretório específico
import { CardProduto } from "@/components/pages/home/cardProduto"
// Importa o componente CardProdutoPainel do diretório específico
import { CardProdutoPainel } from "@/components/pages/painel/home/cardProdutoPainel"
// Importa a lista de produtos do arquivo produtos.json
import listaProdutos from "@/config/produtos.json"
// Importa o ícone GoGraph do pacote react-icons
import { GoGraph } from "react-icons/go"

// Define a função do componente Home
export default function Home(){

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
        {
          listaProdutos
          // Ordena os produtos por número de vendas
          .sort((a, b) => {
            return b.vendas - a.vendas // Ordenando por número vendas
          })
          // Mapeia e renderiza os cinco primeiros produtos
          .map((item, index) => {
            if(index > 4) return null // Renderiza apenas os cinco primeiros produtos
            return(
              <CardProdutoPainel
                item={item} // Passa o item como prop para o componente CardProdutoPainel
                key={`item_${item.name}`} // Define a chave única para o componente
              />
            )
          })
        }
        </div>
      </div>
    </div>
  )
}
