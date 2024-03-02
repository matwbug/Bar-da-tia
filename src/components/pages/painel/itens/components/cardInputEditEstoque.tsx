import { produtoProps } from "@/components/pages/home/cardProduto"
import { Button, Input } from "@nextui-org/react"
import { useAnimation } from "framer-motion"
import { useEffect, useState } from "react"
import { BsBoxArrowInDown } from "react-icons/bs"
import { motion } from 'framer-motion'
import { NumericFormat } from "react-number-format"
import { HiOutlineArchiveBox } from "react-icons/hi2"
import { GiCheckMark } from "react-icons/gi"
import { IoIosCheckmarkCircle } from "react-icons/io"
import { FormDataProduto } from "../modalAddItem"

export const CardInputEditEstoque = ({produto, setProduto}: {
    produto: FormDataProduto
    setProduto: (produto: FormDataProduto) => void
}) => {

    const controls = useAnimation();
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(1)
    const [status, setStatus] = useState(false)

    useEffect(() => {
        if (open) {
            controls.start({ opacity: 1, y: 0, height: 'auto', marginBottom: '5px' });
        } else {
            controls.start({ opacity: 0, y: 20, height: '0', marginBottom: 0 });
        }
    }, [open, controls]);

    const handleAddStock = () => {
        setProduto({
            ...produto,
            quantidade: value
        })
        setStatus(true)
    }

    const EndContent = () => {
        if(status) return <IoIosCheckmarkCircle className="text-emerald-500" />
        else return <></>
    }

    return(
        <div className="flex flex-col gap-2 w-full">
            <Button onClick={() => {setOpen(!open)}} fullWidth color="primary" variant="flat" className="flex flex-row justify-center items-center"><HiOutlineArchiveBox /> Gerenciar estoque</Button>
            <motion.div
                animate={controls}
                initial={{ opacity: 0, y: 20, height: 0, marginBottom: 0 }}
                transition={{ type: "tween", stiffness: 100, duration: 0.2 }}
                className="flex flex-col"
            >
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
                <Button onClick={handleAddStock} className="text-white" color="success">Salvar</Button>
            </motion.div>
        </div>
    )
}