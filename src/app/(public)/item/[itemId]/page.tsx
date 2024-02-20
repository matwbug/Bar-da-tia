import { listaProdutos } from "@/app/components/pages/home/HeroSection"
import { ProdutoNotExists } from "@/app/components/pages/item/ProdutoNotExists"
import { ProdutoView } from "@/app/components/pages/item/ProdutoView"

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