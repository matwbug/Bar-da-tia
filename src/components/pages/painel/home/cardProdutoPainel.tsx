import Link from "next/link"
import { produtoProps } from "../../home/cardProduto"
import { Button, Image, Input, Modal, ModalBody, ModalContent, ModalHeader, Textarea } from "@nextui-org/react"
import { FaArrowDown } from "react-icons/fa"
import { MdDelete, MdEdit } from "react-icons/md"
import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { InputUploadImage } from "./components/inputUploadImage"
import { ModalEditProduto } from "./modalEditProduto"

export const CardProdutoPainel = ({item}: {
    item: produtoProps
}) => {

    const [modalOpen, setModalOpen] = useState(false)
    const [produto, setProduto] = useState<produtoProps>(item)

    return(<>
        <ModalEditProduto 
            produto={produto}
            setProduto={setProduto}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
        />
            <div 
                onClick={() => setModalOpen(true)}
                key={`item_${item.name}`}
                className="
                    relative cursor-pointer
                    shadow-md flex flex-col gap-4 
                    justify-center items-start dark:bg-[#1e1e1e]
                    bg-light-background-50 rounded-md p-4 w-full 
                    min-w-40 max-w-40 h-[280px]
                    hover:bg-light-background-200/hover
                    ease-in-out duration-300
                "
            >
                <div className="max-w-[200px]">
                    <Image 
                        src={item.image}
                        width={150}
                        alt={item.name}
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col gap-2 justify-center w-full">
                    {
                        item.promocao
                        ? <div className="flex flex-col gap-1 w-full">
                            <span className="text-xl font-bebas text-emerald-500">
                                {item.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                            </span>
                            <div className="flex flex-row justify-start items-center gap-2">
                                <span className="flex flex-row font-light text-tiny items-center gap-1 text-white bg-emerald-400 rounded-md p-1">
                                    <FaArrowDown className={"text-white"} /> 
                                    -10%
                                </span>
                                <span className="text-tiny font-light dark:text-white line-through text-gray-700 ">
                                    {(item.preco - (item.preco * 0.10)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                </span>
                            </div>
                            
                        </div>
                        : item.atacado 
                            ? <div className="flex flex-col gap-0">
                                <div className="flex flex-row gap-2">
                                    <span className="text-xl text-black dark:text-white font-bebas line-through">
                                        {(item.preco - (item.preco * 0.10)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                    </span>
                                    <span className="text-emerald-400 text-xl dark:text-white font-bebas">
                                        {(item.preco - (item.preco * 0.05)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                    </span>   
                                </div>
                                <span className="text-tiny bg-emerald-400 p-1 rounded font-light text-white">A PARTIR DE 3 UN</span>
                            </div>
                            :<span className="text-xl font-medium text-black dark:text-white font-bebas">
                                {(item.preco - (item.preco * 0.10)).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                            </span>
                    }
                    <p className="text-sm font-medium text-gray-600 dark:text-white">
                        {item.name.length > 28 ? `${item.name.substring(0,28)}...` : `${item.name}`}
                    </p>
                </div>
            </div>
        </>)
}