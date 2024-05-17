"use client"

import { PackagePlus } from "lucide-react"
import { Button } from "@nextui-org/button"

// Define a função do componente ItensIndexPainel
export default function ItensIndexPainel(){

  return(
    <>
      {/* <ModalAddItem 
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        produtos={produtos}
        setProdutos={setProdutos}
        fetchData={fetchItens}
      />    */}
      <div className={`flex flex-col mx-1 mt-3 h-full gap-1`}>
        <div className="bg-light-background-100 shadow-sm flex-col p-4 gap-3 flex h-full rounded items-start" >
          <Button /* onClick={() => setModalOpen(true)} */ className="text-foreground-50 max-w-96" color="success">
            <PackagePlus /> Adicionar novo produto
          </Button>
          {/* <TableItens  /> */}
        </div>
      </div>
    </>
  )    
}
