// Importações dos componentes e recursos necessários
import { Button, CircularProgress, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Slider, Switch, Textarea, Tooltip } from "@nextui-org/react"
import { produtoProps } from "../../home/cardProduto"
import { InputUploadImage } from "./components/inputUploadImage"
import { ProdutoPriceInput } from "./components/produtoPriceInput";
import { CiCircleCheck, CiDiscount1 } from "react-icons/ci";
import { CardInputAtacado } from "./components/cardInputAtacado";
import { BsBoxArrowInDown } from "react-icons/bs";
import { CardInputPromocao } from "./components/cardInputPromocao";
import { GrDisabledOutline } from "react-icons/gr";
import { useEffect, useState } from "react";
import { VscVmActive } from "react-icons/vsc";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { CardInputEstoque } from "./components/cardInputEstoque";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { IoLayers } from "react-icons/io5";
import { fetchData } from "next-auth/client/_utils";

/**
 * Componente ModalEditProduto
 * 
 * Este componente representa um modal para edição de produtos.
 * 
 * @param {boolean} modalOpen - Estado que indica se o modal está aberto.
 * @param {function} setModalOpen - Função para alterar o estado do modal.
 * @param {object} produto - O objeto do produto a ser editado.
 * @param {function} setProduto - Função para atualizar as informações do produto.
 * @param {array} itens - Lista de itens.
 * @param {function} setItens - Função para atualizar a lista de itens.
 */
export const ModalEditProduto = ({modalOpen, setModalOpen, produto, setProduto, itens, setItens, fetchData}: {
    modalOpen: boolean,
    setModalOpen: (val: boolean) => void
    produto: produtoProps
    setProduto: (produto: produtoProps) => void
    itens?: produtoProps[]
    setItens?: (itens: produtoProps[]) => void
    fetchData: () => void
}) => {
    // Estado para controlar o carregamento
    const [loading, setLoading] = useState(false);
    // Estado para armazenar o produto atual
    const [cachedProduto, setCachedProduto] = useState(produto);

    // Função para alternar o status do item entre ativo e desativado
    const handleSwitchDisabledItem = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('produtoId', produto.id.toString());
            
            const result: {success: boolean, status: 'ATIVO' | 'DESATIVADO'} = await fetch('/api/disableItem', {
                method: 'POST', 
                body: formData
            }).then(async(result) => {return await result.json()});

            if(result.success){
                fetchData()
            }
        } catch(error) {
            console.error(`Erro ao desativar item. Erro: ${error}`);
        } finally {
            setLoading(false);
        }
    }

    // Função para salvar as alterações do produto
    const handleSaveChanges = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('id', produto.id.toString());
            formData.append('name', produto.name);
            formData.append('description', produto.description);
            formData.append('preco', produto.preco.toString());
            formData.append('quantidade', produto.quantidade.toString());
            formData.append('atacado', produto.atacado ? 'sim' : 'nao');
            formData.append('atacado_minquantidade', produto.atacado_minquantidade?.toString() ?? '0');
            formData.append('promocao', produto.promocao ? 'sim' : 'nao');
            formData.append('promocao_preco', produto.promocao_preco?.toString() ?? '0');
            formData.append('image', produto.imageUrl);

            const result = await fetch('/api/editItem', {
                method: 'POST',
                body: formData
            }).then(async(res) => {return await res.json()});

            if(result.success){
                fetchData()
            }
        } catch(error) {
            console.log('Não foi possível salvar as alterações. Erro:', error);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <Modal
            isOpen={modalOpen}
            onOpenChange={setModalOpen}
            backdrop="opaque"
            radius="lg"
            size="lg"
        >
            <ModalContent>
                {/* Exibe o indicador de carregamento se loading for verdadeiro */}
                {loading && 
                    <div className="absolute w-full h-full bg-light-background-200/[0.5] flex justify-center items-center" style={{zIndex: 100}}>
                        <CircularProgress aria-label="Carregando..." size="lg"/>
                    </div>
                }
                {/* Cabeçalho do modal */}
                <ModalHeader className="py-2 flex gap-3 flex-row justify-center items-center">
                    <p>{produto.name.substring(0,40)}</p>
                    {/* Exibe o status do produto */}
                    {produto.status === 'DESATIVADO' 
                        ? <div className="border-1 border-red-500 bg-red-600/[0.3] text-red-500 p-1 rounded-lg">
                            <span className="font-tiny text-sm flex flex-row gap-1 items-center justify-center"><IoIosCloseCircle /> DESATIVADO</span>
                        </div>
                        : <div className="border-1 border-emerald-500 bg-emerald-500/[0.3] text-emerald-500 p-1 rounded-lg">
                            <span className="font-tiny text-sm flex flex-row gap-1 items-center justify-center"><FaCheckCircle /> ATIVO</span>
                        </div>
                    }
                    {/* Exibe uma mensagem se houver alterações não salvas */}
                    {cachedProduto !== produto && <span className="text-tiny font-thin text-gray-500 italic">*alterações não salvas</span>}
                </ModalHeader>
                {/* Corpo do modal */}
                <ModalBody className="flex flex-col gap-3 py-5 relative">
                    <div className="flex flex-row gap-3 justify-between">  
                        {/* Seção de detalhes do produto */}
                        <div className="flex flex-col gap-2">
                            <InputUploadImage item={produto} setProduto={setProduto} />
                            <div className="flex flex-row gap-3 justify-center">
                                <span className="text-sm flex flex-col gap-1 items-center">Vendas <HiMiniShoppingCart /> <b>{produto.vendas}</b></span>
                                <span className="text-sm flex flex-col gap-1 items-center">Estoque <IoLayers /> <b>{produto.quantidade}</b></span>
                            </div>
                        </div> 
                        {/* Formulário de edição do produto */}
                        <div className="w-full justify-start flex flex-col gap-1">
                            <Input 
                                fullWidth
                                type="text"
                                label="Nome do produto"
                                value={produto.name}
                                onChange={(e) => setProduto({...produto, name: e.target.value})}
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
                                value={produto.description}
                                onChange={(e) => setProduto({...produto, description: e.target.value})}
                                color="default"
                                classNames={{
                                    inputWrapper: `bg-light-background-200 border-1 border-zinc-200`
                                }}
                            />
                            <ProdutoPriceInput produto={produto} setProduto={setProduto} variant="edit"/>
                        </div>
                    </div>
                    <Divider />
                    {/* Componentes para edição de estoque e promoção */}
                    <div className="flex flex-col gap-1">
                        <CardInputEstoque produto={produto} setProduto={setProduto} />
                        <CardInputPromocao produto={produto} setProduto={setProduto} variant="edit" />
                    </div>
                    {/* Componente para edição de atacado */}
                    <CardInputAtacado produto={produto} setProduto={setProduto} variant="edit" />
                    {/* Botão para alternar o status do item */}
                    {produto.status === 'ATIVO' 
                        ? <Button onClick={handleSwitchDisabledItem} color="danger" variant="flat" className="flex flex-row gap-1">
                            <GrDisabledOutline /> Desativar item
                          </Button>
                        : <Button onClick={handleSwitchDisabledItem} color="success" variant="flat" className="flex flex-row gap-1">
                            <GrDisabledOutline /> Ativar item
                          </Button>
                    }
                </ModalBody>
                {/* Rodapé do modal com botão de salvar alterações */}
                <ModalFooter>
                    <Button onClick={handleSaveChanges} color="success" className="text-white"> Salvar <CiCircleCheck size={20} /></Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
