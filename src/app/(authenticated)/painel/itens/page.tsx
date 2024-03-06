"use client"

import { TableItens } from "@/components/pages/painel/itens/TableItens"
import { ModalAddItem } from "@/components/pages/painel/itens/modalAddItem"
import { Button } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { IoAddCircle } from "react-icons/io5"
import { produtoProps } from "@/components/pages/home/cardProduto"
import { GetServerSideProps } from "next"
import { getItens } from "@/services/itens"

// Define a função do componente ItensIndexPainel
export default function ItensIndexPainel(){
  // Define os estados para controlar a abertura do modal e a lista de produtos
  const [modalOpen, setModalOpen] = useState(false)
  const [produtos, setProdutos] = useState<produtoProps[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = (await getItens()).sort((a, b) => b.vendas - a.vendas);
        if(data) setProdutos(data);

      } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
      }
    }

    fetchData();
  }, []); 

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
