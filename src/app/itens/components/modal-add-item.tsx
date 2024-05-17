import { ReactNode, useState } from "react"
import { CardInputEditEstoque } from "./components/card-input-edit-estoque"
import { Item } from "@prisma/client"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal"
import { CircleAlert, Loader2, PackagePlus } from "lucide-react"
import { Input, Textarea } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { InputAddImage } from "./components/input-add-image"
import { ProdutoPriceInput } from "@/app/dashboard/(home)/components/item-price-input"
import { CardInputPromocao } from "@/app/dashboard/(home)/components/card-input-promocao"
import { CardAvailableItem } from "@/app/dashboard/(home)/components/card-available-item"
import { CardInputAtacado } from "@/app/dashboard/(home)/components/card-input-atacado"

// Interface para os dados do produto a serem adicionados
export interface FormDataProduto {
    name?: string
    description?: string
    preco?: number
    image?: string
    quantidade?: number
    promocao?: boolean
    promocao_preco?: number | null
    atacado?: boolean
    atacado_minquantidade?: number | null
    vendas?: number
    status?: string 
}

// Componente ModalAddItem
export const ModalAddItem = ({modalOpen, setModalOpen, setProdutos, produtos, fetchData}: {
    modalOpen: boolean,
    setModalOpen: (val: boolean) => void
    produtos: Item[],
    setProdutos: (produtos: Item[]) => void
    fetchData: () => Promise<void>
}) => {
    // Estados para controle do carregamento, novo item e validação
    const [loading, setLoading] = useState(false)
    const [newItem, setNewItem] = useState<FormDataProduto>({})
    const [valid, setValid] = useState<{valid: boolean, message?: ReactNode}>({valid: true})

    // Função para adicionar um novo item de produto
    const handleAddItem = async () => {
        try {
            // Verifica se todos os campos obrigatórios estão preenchidos
            if (!newItem.image || !newItem.name || !newItem.description || !newItem.preco || !newItem.quantidade) 
                return setValid({valid: false, message: 'Informe todos os campos obrigatórios!'})

            // Limpa as mensagens de validação
            setValid({valid: true})
            setLoading(true)
            const formData = new FormData()
            
            // Adiciona os dados do novo item ao FormData
            formData.append('image', newItem.image)
            formData.append('name', newItem.name)
            formData.append('description', newItem.description)
            formData.append('preco', newItem.preco.toString())
            formData.append('quantidade', newItem.quantidade.toString())
            formData.append('atacado', newItem.atacado ? 'sim' : 'nao') 
            formData.append('atacado_minquantidade', newItem.atacado_minquantidade?.toString() ?? '0') 
            formData.append('promocao', newItem.promocao ? 'sim' : 'nao') 
            formData.append('promocao_preco', newItem.promocao_preco?.toString() ?? '0') 
            formData.append('status', newItem.status ?? 'ATIVO')

            // Envia os dados para a API
            let result = await fetch('/api/addItem', {
                method: 'POST',
                body: formData
            })

            // Verifica se a requisição foi bem-sucedida
            if (result.ok) {
                const data: {newItem: Item} = await result.json()
                try {
                    // Adiciona o novo item à lista de produtos e fecha o modal
                    fetchData()
                    setModalOpen(false) 
                    setNewItem({})
                } catch (error) {
                    console.error('Erro ao analisar os dados JSON:', error);
                }
            } else {
                // A solicitação falhou
                console.error('Falha ao adicionar item:', result.status, result.statusText);
            }
        } catch(error) {
            // Trata erros durante o processo de adição do item
            console.error('Erro ao adicionar o item', error)
        } finally {
            // Finaliza o estado de carregamento
            setLoading(false)
        }
    }

    return (
        // Componente Modal para adicionar um novo item
        <Modal
            isOpen={modalOpen}
            onOpenChange={setModalOpen}
            size="2xl"
            backdrop="opaque"
            radius="lg"
        >
            <ModalContent>
                {/* Indicador de carregamento */}
                {loading && <div
                        className="absolute w-full h-full bg-light-background-200/[0.5] flex justify-center items-center"
                        style={{zIndex: 100}}
                    >
                        <Loader2 className="loading" aria-label="Carregando..." size="lg"/>
                </div>}
                <ModalHeader>Adicionando produto novo</ModalHeader>
                <ModalBody className="flex flex-col gap-3 py-5 relative">
                    {/* Exibe mensagens de validação */}
                    {!valid.valid && 
                        <div className="w-full bg-red-500 text-white py-3 p-6 rounded flex flex-row items-center gap-1">
                            <CircleAlert />
                            <span>{valid.message}</span>
                        </div>
                    }
                    <div className="flex flex-col gap-3 justify-between">
                        <InputAddImage item={newItem} setItem={setNewItem}  />
                        <div className="w-full justify-start flex flex-col gap-1">
                            <Input 
                                fullWidth
                                type="text"
                                label="Nome do produto"
                                value={newItem.name}
                                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                                classNames={{
                                    inputWrapper: [
                                        `hover:bg-red-500`,
                                        `bg-light-background-200 border-1 border-zinc-200`
                                    ],
                                }}
                            />
                            <Textarea 
                                fullWidth
                                type="text"
                                label="Descrição"
                                value={newItem.description}
                                onChange={(e) => setNewItem({...newItem , description: e.target.value})}
                                color="default"
                                classNames={{
                                    inputWrapper: `bg-light-background-200 border-1 border-zinc-200`
                                }}
                            />
                            {/* Componente para inserir o preço do produto */}
                            <ProdutoPriceInput formData={newItem} setFormData={setNewItem} variant="add" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        {/* Componente para inserir o estoque do produto */}
                        <CardInputEditEstoque produto={newItem} setProduto={setNewItem} /> 
                        {/* Componente para inserir informações de promoção */}
                        <CardInputPromocao formData={newItem} setFormData={setNewItem} variant="add" />
                    </div>
                    {/* Componente para inserir informações de atacado */}
                    <CardInputAtacado formData={newItem} setFormData={setNewItem} variant="add" />
                    {/* Componente para verificar a disponibilidade do item */}
                    <CardAvailableItem produto={newItem} setProduto={setNewItem} />
                </ModalBody>
                {/* Rodapé do modal */}
                <ModalFooter>
                    {/* Botão para adicionar o item */}
                    <Button onClick={handleAddItem} fullWidth color="success" className="text-foreground-50"><PackagePlus size={16} /> Adicionar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
