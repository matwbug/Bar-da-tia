import { produtoProps } from "@/components/pages/home/cardProduto"; // Importa o tipo de propriedade do produto
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image, Link, User as Item } from "@nextui-org/react"; // Importa componentes do Next UI
import React from "react"; // Importa o React
import { BsThreeDotsVertical } from "react-icons/bs"; // Importa ícone do React

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
export const renderCell = (
  produto: produtoProps, 
  columnKey: React.Key, 
  setProduto: (item: produtoProps) => void, 
  setModalOpen: (vis: boolean) => void,
  setLoading: (loading: boolean) => void
) => {
    const cellValue = produto[columnKey as keyof produtoProps]

    // Função para lidar com a edição de um item
    const handleEdit = () => {
      setProduto(produto)
      setModalOpen(true)
    }

    // Função para desativar um item
    const handleDisable = async() => {
      try{
        setLoading(true)
        const formData = new FormData()
        formData.append('produtoId', produto.id.toString())
        
        const result: {success: boolean, status: 'ATIVO' | 'DESATIVADO'} = await fetch('/api/disableItem', {
          method: 'POST', 
          body: formData
        }).then(result => {return result.json()})

        if(result.success){
          setProduto({...produto, status: result.status})
        }
      }
      catch(error){
        console.error(`Erro ao desativar item, Erro: ${error}`)
      }
      finally{
        setLoading(false)
      }
    }

    // Switch case para renderizar as células com base na chave da coluna
    switch (columnKey) {
        case "id": 
            return(
              <div>
                <span>{cellValue}</span>
              </div>
            )
        case "name":
          return (<>
            <div onClick={handleEdit} className="flex flex-row gap-3 items-center cursor-pointer">
              <Image 
                alt={produto.name}
                className="rounded-md w-12 h-12 object-cover"
                src={produto.image}
                classNames={{wrapper: `bg-gray-500 w-12 w-12 min-w-12 rounded-md`}}
              />
              <div className="flex flex-col gap-1">
                <p>{produto.name}</p>
              </div>
            </div>  
          </>);
        case "preco":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
          );
        case "quantidade":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case "status":
          return (
            <Chip className="capitalize" color={produto.status === 'ATIVO' ? 'success' : 'danger'} size="sm" variant="flat">
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <Dropdown size="sm">
              <DropdownTrigger>
                <Button 
                  isIconOnly 
                  className="bg-transparent"
                >
                  <BsThreeDotsVertical />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Ações">
                <DropdownItem className={'text-black'} as={Link} target="_blank" href={`/item/${produto.id}`}>
                  Abrir item
                </DropdownItem>
                <DropdownItem key="edit" onClick={handleEdit}>
                  Editar
                </DropdownItem>
                {
                  produto.status === 'ATIVO' 
                  ? <DropdownItem key="delete" className="text-danger" color="danger" onClick={handleDisable}>
                    Desativar
                  </DropdownItem>
                  : <DropdownItem className="text-emerald-500" color="success" onClick={handleDisable}>
                  Ativar
                </DropdownItem>
                }
              </DropdownMenu>
            </Dropdown>
          );
        default:
          return cellValue;
    }
}
  