import { ProdutoNotExists } from "@/components/pages/item/produtoNotExists" // Importa o componente ProdutoNotExists do diretório específico
import { ProdutoView } from "@/components/pages/item/produtoView" // Importa o componente ProdutoView do diretório específico
import listaProdutos from '@/config/produtos.json' // Importa a lista de produtos do arquivo produtos.json

// Define a função do componente ItemIndex
export default function ItemIndex({params}: {
    params: {
        itemId: string,
    },
}){
    // Encontra o produto na lista de produtos com base no ID passado nos parâmetros
    const produtoInfo = listaProdutos.find(item => item.id === parseInt(params.itemId))

    // Verifica se o produto existe
    if(produtoInfo)
        return <ProdutoView produto={produtoInfo} /> // Renderiza o componente ProdutoView com as informações do produto
    else
        return <ProdutoNotExists /> // Renderiza o componente ProdutoNotExists se o produto não existir
}
