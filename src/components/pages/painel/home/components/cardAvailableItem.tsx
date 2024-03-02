import { produtoProps } from '@/components/pages/home/cardProduto'
import { Slider, Switch } from '@nextui-org/react'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { RiShoppingCartFill } from 'react-icons/ri'
import { FormDataProduto } from '../../itens/modalAddItem'

export const CardAvailableItem = ({produto, setProduto}: {
    produto: FormDataProduto,
    setProduto: (produto: FormDataProduto) => void
}) => {

    return(
        <div className="flex flex-row gap-2 items-start w-full  rounded-md p-4">
            <div className="flex flex-col gap-2 w-full">
                <p className="flex flex-row gap-1 items-center">Disponível para venda <RiShoppingCartFill size={20} /></p>
                <span className="text-tiny text-zinc-600">Essa opção ativa a disponibilidade da compra desse produto aos clientes.</span>
            </div>
            <Switch 
                size="sm"
                defaultSelected={produto.status === 'ATIVO' ? true : false}
                onChange={(e) => {
                    setProduto({...produto, status: e.target.checked ? 'ATIVO' : 'DESATIVADO'})
                }}
                classNames={{
                    wrapper: `bg-light-background-500`
                }}
            />
        </div>
    )
}