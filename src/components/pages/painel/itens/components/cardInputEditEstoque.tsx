import { Button, Input } from "@nextui-org/react"
import { useAnimation } from "framer-motion"
import { useEffect, useState } from "react"
import { motion } from 'framer-motion'
import { NumericFormat } from "react-number-format"
import { HiOutlineArchiveBox } from "react-icons/hi2"
import { IoIosCheckmarkCircle } from "react-icons/io"
import { FormDataProduto } from "../modalAddItem"

// Componente CardInputEditEstoque
export const CardInputEditEstoque = ({produto, setProduto}: {
    produto: FormDataProduto
    setProduto: (produto: FormDataProduto) => void
}) => {
    // Estado e controle de animação para o componente
    const controls = useAnimation();
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(1)  // Estado para armazenar o valor do estoque
    const [status, setStatus] = useState(false)  // Estado para controlar o status de salvamento

    // Efeito para animar o componente quando o estado de abertura for alterado
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
            quantidade: value
        })
        setStatus(true)
    }

    // Componente de ícone de finalização
    const EndContent = () => {
        if(status) return <IoIosCheckmarkCircle className="text-emerald-500" />
        else return <></>
    }

    // Retorno do componente
    return(
        <div className="flex flex-col gap-2 w-full">
            {/* Botão para gerenciar estoque */}
            <Button onClick={() => {setOpen(!open)}} fullWidth color="primary" variant="flat" className="flex flex-row justify-center items-center"><HiOutlineArchiveBox /> Gerenciar estoque</Button>
            {/* Conteúdo animado para gerenciamento de estoque */}
            <motion.div
                animate={controls}
                initial={{ opacity: 0, y: 20, height: 0, marginBottom: 0 }}
                transition={{ type: "tween", stiffness: 100, duration: 0.2 }}
                className="flex flex-col"
            >
                {/* Input para inserir o estoque */}
                <NumericFormat 
                    customInput={Input}
                    label="Estoque atual"
                    type="tel"
                    value={value}
                    isAllowed={({floatValue}) => {
                        if(floatValue) setValue(floatValue)
                        return true
                    }}
                    endContent={<EndContent />}
                />
                {/* Botão para salvar alterações no estoque */}
                <Button onClick={handleAddStock} className="text-white" color="success">Salvar</Button>
            </motion.div>
        </div>
    )
}

