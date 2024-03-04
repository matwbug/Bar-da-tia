import { Switch } from '@nextui-org/react'
import { RiShoppingCartFill } from 'react-icons/ri'
import { FormDataProduto } from '../../itens/modalAddItem'

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
                <p className="flex flex-row gap-1 items-center">Disponível para venda <RiShoppingCartFill size={20} /></p>
                {/* Descrição da opção */}
                <span className="text-tiny text-zinc-600">Essa opção ativa a disponibilidade da compra desse produto aos clientes.</span>
            </div>
            {/* Switch para controlar a disponibilidade */}
            <Switch 
                size="sm"
                // Define o estado do switch com base no status do produto
                defaultSelected={produto.status === 'ATIVO' ? true : false}
                // Função chamada quando o switch é alterado
                onChange={(e) => {
                    // Atualiza o status do produto com base no estado do switch
                    setProduto({...produto, status: e.target.checked ? 'ATIVO' : 'DESATIVADO'})
                }}
                // Estilos customizados para o switch
                classNames={{
                    wrapper: `bg-light-background-500`
                }}
            />
        </div>
    )
}
