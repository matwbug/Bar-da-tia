import { produtoProps } from "@/components/pages/home/cardProduto"
import { Button, CircularProgress, Image } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { FaBoxArchive } from "react-icons/fa6"
import { MdImage } from "react-icons/md"
import { FormDataProduto } from "../modalAddItem"

export const InputAddImage = ({item, setItem}: {
    item: FormDataProduto
    setItem: (item: FormDataProduto) => void
}) => {
    const [uploading, setUploading] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | undefined>()

    // const handleUpload = async () => {
    //     setUploading(true)
    //     try{
    //         if(!selectedFile) return
    //         setSelectedFile(undefined)
    //     }catch(error){
    //         console.log(`Falha ao subir a imagem, erro: ${error}`)
    //     }
    //     finally{
    //         setUploading(false)
    //     }
    // }

    useEffect

    return(
        <div className="relative flex justify-center items-center flex-col gap-2 w-full">
            <label>
                <input 
                    type="file" 
                    hidden 
                    accept="image/jpeg, image/png" 
                    onChange={async({target}) => {
                        if(target.files){
                            const file = target.files[0]
                            setSelectedImage(URL.createObjectURL(file)) // Criando uma imagem de forma temporária no app
                            setItem({...item, image: file})
                        }
                    }}
                />
                <div 
                    className={`
                        relative w-40 h-40 rounded-sm flex items-center
                        justify-center border-2 border-dashed border-light-background-200
                        ${uploading ? `cursor-wait` : `cursor-pointer`}
                        hover:bg-light-background-100 duration-300 ease-in-out
                    `}
                >
                    {
                        uploading 
                        && <div className={`bg-light-background-200/[0.5] w-40 h-40 absolute z-50 flex justify-center items-center`}>
                            <div className={`bg-light-background-200/[0.5] w-40 h-40 absolute z-50 flex justify-center items-center`}>
                                <div className="flex flex-coljustify-center items-center"><CircularProgress aria-label="Loading..." /></div> 
                            </div>
                        </div>
                    }
                    {
                        selectedImage
                        ? <Image 
                            src={selectedImage}
                            alt={item.name}
                            width={150}
                            className="object-cover"
                        />
                        : <div className={`relative flex flex-col justify-end items-center text-center gap-2 w-full h-full text-gray-500`}>
                            <div className="absolute top-1/2 left-1/2 z-40" style={{transform: "translate(-50%,-50%)"}}><MdImage size={100} /></div>
                            <span className="text-sm mb-2 font-medium">Selecione uma imagem</span>
                        </div>
                    }
                </div>
            </label>
        </div>
    )
}