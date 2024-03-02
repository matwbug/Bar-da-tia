'use client'

import { TableItens } from "@/components/pages/painel/itens/TableItens"
import { ModalAddItem } from "@/components/pages/painel/itens/modalAddItem"
import { Button } from "@nextui-org/react"
import { useState } from "react"
import { IoAddCircle } from "react-icons/io5"
import produtosLista from '@/config/produtos.json'
import { produtoProps } from "@/components/pages/home/cardProduto"


export default function ItensIndexPainel(){
  const [modalOpen, setModalOpen] = useState(false)
  const [produtos, setProdutos] = useState<produtoProps[]>(produtosLista.sort((a, b) => b.id - a.id));

  return(<>
    <ModalAddItem 
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      produtos={produtos}
      setProdutos={setProdutos}
    />   
    <div className={`flex flex-col mx-1 mt-3 h-full gap-1`}>
      <div className="bg-light-background-100 shadow-sm flex-col p-4 gap-3 flex h-full rounded">
        <TableItens produtos={produtos} />
        <Button onClick={() => setModalOpen(true)} className="text-foreground-50" color="success"><IoAddCircle /> Adicionar novo produto</Button>
      </div>
    </div>
  </>)    
}