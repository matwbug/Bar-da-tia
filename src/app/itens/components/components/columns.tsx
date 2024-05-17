import { Item } from "@prisma/client";
import Image from "next/image";
import React, { Key } from "react"; // Importa o React
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'
import { EllipsisVertical } from "lucide-react";
import { Button } from "@nextui-org/button";
import Link from "next/link";


// Definição das colunas da tabela
export const columns = [
  {label: "ID", key: "id", sortable: true},
  {label: "Item", key: "name", sortable: true},
  {label: "Preço", key: "preco", sortable: true},
  {label: "Quantidade", key: "quantidade", sortable: true},
  {label: "Status", key: "status", sortable: false},
  {label: "", key: "actions"},
];

// Função para renderizar as células da tabela
export const RenderCell = (
  produto: Item, 
  columnKey: Key, 
) => {

    // Função para desativar um item
    const handleDisable = async() => {
      try{
        
      }
      catch(error){
        console.error(`Erro ao desativar item, Erro: ${error}`)
      }
    }

    const handleDelete = async() => {
      try{
        
      }
      catch(error){
        console.error(`Erro ao desativar item, Erro: ${error}`)
      }
    }

    // Switch case para renderizar as células com base na chave da coluna
    switch (columnKey) {
        case "id": 
          return(
              <div>
                <span>{produto.id}</span>
              </div>
            )
        case "name":
          return (
            <div className="flex flex-row gap-3 items-center cursor-pointer">
              <Image 
                alt={produto.name}
                className="rounded-md w-12 h-12 object-cover"
                src={produto.images[0]}
              />
              <div className="flex flex-col gap-1">
                <p>{produto.name}</p>
              </div>
            </div>  
          );
        case "preco":
          return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">{produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
              </div>
          );
        case "quantidade":
          return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">{produto.quantidade}</p>
              </div>
          );
        case "status":
          return (
              <span>
                {produto.status}
              </span>
          );
        case "actions":
          return (
            <Dropdown size="sm">
              <DropdownTrigger>
                <Button 
                  isIconOnly 
                  className="bg-transparent"
                >
                  <EllipsisVertical />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Ações">
                <DropdownItem className={'text-black'} as={Link} target="_blank" href={`/item/${produto.id}`}>
                  Abrir item
                </DropdownItem>
                <DropdownItem key="edit">
                  Editar
                </DropdownItem>
                {
                  produto.status === 'ATIVO' 
                  ? <DropdownItem key="disable" className="text-danger-900" color="danger" onClick={handleDisable}>
                    Desativar
                  </DropdownItem>
                  : <DropdownItem className="text-emerald-500" color="success" onClick={handleDisable}>
                  Ativar
                </DropdownItem>
                }
                <DropdownItem key="delete" className="text-danger" color="danger" onClick={handleDelete}>
                  Excluir
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
    }
}
  