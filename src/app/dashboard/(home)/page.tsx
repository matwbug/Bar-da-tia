import { AreaChart } from "lucide-react"

export default function Home(){
  return(
    <div className={`flex mx-1 mt-3 h-full flex-col gap-2`}>
      <div 
        className="
        bg-light-background-50 shadow-sm h-fit p-6 rounded-md w-full gap-3 flex flex-col
        "
      >
        <p className="flex flex-row gap-2 items-center text-medium lg:justify-start sm:justify-center">Mais vendidos <AreaChart /></p>
        <div className="flex flex-row gap-2 flex-wrap lg:justify-start sm:justify-center">
        {/* {itens.map(item => { // Mapeando os produtos e renderizando cada um deles
            return <CardProdutoPainel key={item.name} item={item}/>
        })} */}
        </div>
      </div>
    </div>
  )
}
