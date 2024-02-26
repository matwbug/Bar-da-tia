import { Button, CircularProgress, Image, Input } from "@nextui-org/react"
import { ReactNode, useState } from "react"
import { MdEdit, MdImage } from "react-icons/md"
import { produtoProps } from "../../../home/cardProduto"
import { IoCloudUploadOutline } from "react-icons/io5"

export const InputUploadImage = ({item}: {
    item: produtoProps
}) => {
    const [uploading, setUploading] = useState(false)
    const [selectedImage, setSelectedImage] = useState(item.image)
    const [selectedFile, setSelectedFile] = useState<File>()
    const [hover, setHover] = useState(false)

    const handleUpload = async () => {
        setUploading(true)
        try{
            if(!selectedFile) return
            const formData = new FormData()
            formData.append('image', selectedFile)
            formData.append('itemId', item.id.toString())
            const res = await fetch('/api/upload', {
                method: 'POST', 
                body: formData
            })
            setSelectedFile(undefined)
            console.log(res)
        }catch(error){
            console.log(`Falha ao subir a imagem, erro: ${error}`)
        }
        finally{
            setUploading(false)
        }
    }
    return(
        <div className="relative w-fit h-fit flex justify-center items-center flex-col gap-2">
            <label 
                onMouseEnter={() => setHover(true)} 
                onMouseLeave={() => setHover(false)}
            >
                <input 
                    type="file" 
                    hidden 
                    accept="image/jpeg, image/png" 
                    onChange={async({target}) => {
                        if(target.files){
                            const file = target.files[0]
                            setSelectedImage(URL.createObjectURL(file)) // Criando uma imagem de forma temporária no app
                            setSelectedFile(file)
                        }
                    }}
                />
                
                <div 
                    className={`
                        relative w-40 h-40 rounded-sm flex items-center
                        justify-center border-2 border-dashed border-light-background-200
                        ${uploading ? `cursor-wait` : `cursor-pointer`}
                    `}
                >
                    {
                        uploading 
                        ? <div className={`bg-light-background-200/[0.5] w-40 h-40 absolute z-50 flex justify-center items-center`}>
                            <div className={`bg-light-background-200/[0.5] w-40 h-40 absolute z-50 flex justify-center items-center`}>
                                <div className="flex flex-coljustify-center items-center"><CircularProgress aria-label="Loading..." /></div> 
                            </div>
                        </div>
                        : <div className={`
                            ${hover ? `opacity-100` : `opacity-0`} bg-light-background-200/[0.7] w-40 h-40 absolute z-50 flex justify-center items-center ease-in-out duration-300`
                        }>
                            <div className={` text-zind-900 flex flex-col justify-center items-center gap-1`}>
                                <MdImage size={25} className=""/>
                                <span className="text-small font-light">Alterar imagem</span>
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
                        : <div className={`${hover ? `hidden` : `flex`} justify-center items-center text-center`}><span className="font-light">Selecione uma imagem</span></div>
                    }
                </div>
            </label>
            <Button 
                disabled={uploading}
                style={{ opacity: uploading ? ".5" : '1'}}
                className={`z-50 cursor-pointer text-white ${selectedFile ? `block` : `hidden`}`}
                onClick={handleUpload}
                color="success"
            >
                Confirmar
            </Button>
        </div>
        
    )
}