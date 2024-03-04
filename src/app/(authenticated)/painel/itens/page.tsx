// Define que este arquivo deve ser executado apenas no lado do cliente
'use client'

import { TableItens } from "@/components/pages/painel/itens/TableItens"
import { ModalAddItem } from "@/components/pages/painel/itens/modalAddItem"
import { Button } from "@nextui-org/react"
import { useState } from "react"
import { IoAddCircle } from "react-icons/io5"
import produtosLista from '@/config/produtos.json'
import { produtoProps } from "@/components/pages/home/cardProduto"

// Define a função do componente ItensIndexPainel
export default function ItensIndexPainel(){
  // Define os estados para controlar a abertura do modal e a lista de produtos
  const [modalOpen, setModalOpen] = useState(false)
  const [produtos, setProdutos] = useState<produtoProps[]>(produtosLista.sort((a, b) => b.id - a.id));

  return(
    <>
      {/* Modal para adicionar um novo item */}
      <ModalAddItem 
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        produtos={produtos}
        setProdutos={setProdutos}
      />   
      {/* Estrutura principal da página */}
      <div className={`flex flex-col mx-1 mt-3 h-full gap-1`}>
        {/* Conteúdo do painel */}
        <div className="bg-light-background-100 shadow-sm flex-col p-4 gap-3 flex h-full rounded items-start" >
          {/* Botão para adicionar um novo produto */}
          <Button onClick={() => setModalOpen(true)} className="text-foreground-50 max-w-96" color="success">
            <IoAddCircle /> Adicionar novo produto
          </Button>
          {/* Tabela de itens */}
          <TableItens produtos={produtos} />
        </div>
      </div>
    </>
  )    
}
