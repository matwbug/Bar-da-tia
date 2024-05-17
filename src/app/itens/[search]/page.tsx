import { Button } from "@nextui-org/button"
import { ArrowLeft } from "lucide-react"

export default function ItensWithSearchPage({params}: {
    params: {
      search: string,
    },
}){


    return(
        <div className="container flex flex-col gap-4 mt-8">
            <div className="flex flex-col gap-6 items-center justify-start w-full">
                <div className="flex flex-row gap-2 items-center justify-start w-full"> 
                    <Button className="bg-transparent" isIconOnly><ArrowLeft /></Button>
                    <p>Resultados encontrados com sua busca  <b>{params.search}</b></p>
                </div>
                {/* <CardProdutoWithSearch search={params.search} /> */}
            </div>
        </div>
    )
}