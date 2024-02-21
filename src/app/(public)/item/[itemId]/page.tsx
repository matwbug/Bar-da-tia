import { listaProdutos } from "@/components/pages/home/heroSection"
import { ProdutoNotExists } from "@/components/pages/item/produtoNotExists"
import { ProdutoView } from "@/components/pages/item/produtoView"

export default function ItemIndex({params}: {
    params: {
        itemId: string,
    },
}){
    const produtoInfo = listaProdutos.find(item => item.id === parseInt(params.itemId))

    if(produtoInfo)
        return <ProdutoView produto={produtoInfo} />
    else
        return <ProdutoNotExists />
}