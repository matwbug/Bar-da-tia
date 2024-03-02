import { Button, CircularProgress, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from "@nextui-org/react"
import { ReactNode, useState } from "react"
import { InputUploadImage } from "../home/components/inputUploadImage"
import { produtoProps } from "../../home/cardProduto"
import { ProdutoPriceInput } from "../home/components/produtoPriceInput"
import { CardInputEstoque } from "../home/components/cardInputEstoque"
import { CardInputPromocao } from "../home/components/cardInputPromocao"
import { CardInputAtacado } from "../home/components/cardInputAtacado"
import { InputAddImage } from "./components/inputAddImage"
import { HiMiniShoppingCart } from "react-icons/hi2"
import { IoLayers } from "react-icons/io5"
import { CardInputEditEstoque } from "./components/cardInputEditEstoque"
import { IoIosAddCircle, IoIosAddCircleOutline } from "react-icons/io"
import { BsExclamation } from "react-icons/bs"
import { FaExclamationCircle } from "react-icons/fa"
import { useRouter } from "next/navigation"
import { CardAvailableItem } from "../home/components/cardAvailableItem"

export interface FormDataProduto{
    name?: string
    description?: string
    preco?: number
    image?: File
    quantidade?: number
    promocao?: boolean
    promocao_preco?: number | null
    atacado?: boolean
    atacado_minquantidade?: number | null
    vendas?: number
    status?: string 
}

export const ModalAddItem = ({modalOpen, setModalOpen, setProdutos, produtos}: {
    modalOpen: boolean,
    setModalOpen: (val: boolean) => void
    produtos: produtoProps[],
    setProdutos: (produtos: produtoProps[]) => void
}) => {
    const [loading, setLoading] = useState(false)
    const [newItem, setNewItem] = useState<FormDataProduto>({})

    const [valid, setValid] = useState<{valid: boolean, message?: ReactNode}>({valid: true})

    const router = useRouter()

    const handleAddItem = async () => {
        try{
            if(!newItem.image || !newItem.name || !newItem.description || !newItem.preco || !newItem.quantidade) return setValid({valid: false, message: 'Informe todos os campos obrigatórios!'})

            setValid({valid: true})
            setLoading(true)
            const formData = new FormData()
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

            let result = await fetch('/api/addItem', {
                method: 'POST',
                body: formData
            })

            if (result.ok) {
                const data: {newItem: produtoProps} = await result.json()
                try {
                    const newProdutos = [...produtos, {...data.newItem}].sort((a, b) => b.id - a.id)
                    setProdutos(newProdutos)
                    setModalOpen(false) 
                    setNewItem({})
                } catch (error) {
                    console.error('Erro ao analisar os dados JSON:', error);
                }
            } else {
                // A solicitação falhou
                console.error('Falha ao adicionar item:', result.status, result.statusText);
            }

        }catch(error){
            console.error('Erro ao adicionar o item', error)
        }finally{
            setLoading(false)
        }
    }

    return(
        <Modal
            isOpen={modalOpen}
            onOpenChange={setModalOpen}
            size="lg"
            backdrop="opaque"
            radius="lg"
        >
            <ModalContent>
                {loading && <div
                        className="absolute w-full h-full bg-light-background-200/[0.5] flex justify-center items-center"
                        style={{zIndex: 100}}
                    >
                        <CircularProgress aria-label="Carregando..." size="lg"/>
                </div>}
                <ModalHeader>Adicionando produto novo</ModalHeader>
                <ModalBody className="flex flex-col gap-3 py-5 relative">
                    {
                        !valid.valid && 
                        <div className="w-full bg-red-500 text-white py-3 p-6 rounded flex flex-row items-center gap-1">
                            <FaExclamationCircle />
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
                            <ProdutoPriceInput formData={newItem} setFormData={setNewItem} variant="add" />
                        </div>
                    </div>
                    <Divider />
                    <div className="flex flex-col gap-1">
                        <CardInputEditEstoque produto={newItem} setProduto={setNewItem} /> 
                        <CardInputPromocao formData={newItem} setFormData={setNewItem} variant="add" />
                    </div>
                    <CardInputAtacado formData={newItem} setFormData={setNewItem} variant="add" />
                    <CardAvailableItem produto={newItem} setProduto={setNewItem} />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleAddItem} fullWidth color="success" className="text-foreground-50"><IoIosAddCircle size={16} /> Adicionar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}