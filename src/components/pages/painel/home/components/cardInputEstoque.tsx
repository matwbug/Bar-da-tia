import { produtoProps } from "@/components/pages/home/cardProduto"
import { Button, Input } from "@nextui-org/react"
import { useAnimation } from "framer-motion"
import { useEffect, useState } from "react"
import { BsBoxArrowInDown } from "react-icons/bs"
import { motion } from 'framer-motion'
import { NumericFormat } from "react-number-format"

/**
 * Componente CardInputEstoque
 * 
 * @param {object} produto - As informações do produto.
 * @param {function} setProduto - Função para atualizar as informações do produto.
 */
export const CardInputEstoque = ({produto, setProduto}: {
    produto: produtoProps,
    setProduto: (produto: produtoProps) => void
}) => {
    // Controles para animação do componente
    const controls = useAnimation();
    // Estado para controlar a abertura e fechamento do componente
    const [open, setOpen] = useState(false)
    // Estado para armazenar o valor a ser adicionado ao estoque
    const [value, setValue] = useState(1)

    // Efeito para animar a abertura e fechamento do componente
    useEffect(() => {
        if (open) {
            controls.start({ opacity: 1, y: 0, height: 'auto', marginBottom: '5px' });
        } else {
            controls.start({ opacity: 0, y: 20, height: '0', marginBottom: 0 });
        }
    }, [open, controls]);

    // Função para adicionar estoque ao produto
    const handleAddStock = () => {
        setProduto({
            ...produto,
            quantidade: (value + produto.quantidade)
        })
        setValue(1)
        setOpen(false)
    }

    return(
        // Container principal do componente
        <div className="flex flex-col gap-2 w-full">
            {/* Botão para abrir ou fechar o componente */}
            <Button onClick={() => {setOpen(!open)}} fullWidth color="primary" variant="flat" className="flex flex-row justify-center"><BsBoxArrowInDown /> Adicionar estoque</Button>
            {/* Componente para adicionar estoque */}
            <motion.div
                animate={controls}
                initial={{ opacity: 0, y: 20, height: 0, marginBottom: 0 }}
                transition={{ type: "tween", stiffness: 100, duration: 0.2 }}
                className="flex flex-col"
            >
                {/* Input para inserir a quantidade de estoque a ser adicionada */}
                <NumericFormat 
                    customInput={Input}
                    label="Quantidade a ser adicionada"
                    type="tel"
                    value={value}
                    isAllowed={({floatValue}) => {
                        if(floatValue) setValue(floatValue)
                        return true
                    }}
                />
                {/* Botão para confirmar a adição de estoque */}
                <Button onClick={handleAddStock} className="text-white" color="success">Adicionar</Button>
            </motion.div>
        </div>
    )
}
