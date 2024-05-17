import { FormDataProduto } from '@/app/itens/components/modal-add-item'
import { Switch } from '@/components/ui/switch'
import { ShoppingCart } from 'lucide-react'

/**
 * Componente CardAvailableItem
 * 
 * @param {object} produto - As informações do produto.
 * @param {function} setProduto - Função para atualizar as informações do produto.
*/

export const CardAvailableItem = ({produto, setProduto}: {
    produto: FormDataProduto,
    setProduto: (produto: FormDataProduto) => void
}) => {

    return(
        // Container principal do cartão
        <div className="flex flex-row gap-2 items-start w-full  rounded-md p-4">
            <div className="flex flex-col gap-2 w-full">
                {/* Título indicando disponibilidade */}
                <p className="flex flex-row gap-1 items-center">Disponível para venda <ShoppingCart size={20} /></p>
                {/* Descrição da opção */}
                <span className="text-tiny text-muted-foreground">Essa opção ativa a disponibilidade da compra desse produto aos clientes.</span>
            </div>
            {/* Switch para controlar a disponibilidade */}
            <Switch 
                // Define o estado do switch com base no status do produto
                defaultChecked={produto.status === 'ATIVO' ? true : false}
                // Função chamada quando o switch é alterado
                onChange={(e) => {
                    // Atualiza o status do produto com base no estado do switch
                    setProduto({...produto, status: e.target ? 'ATIVO' : 'DESATIVADO'})
                }}
                
            />
        </div>
    )
}
