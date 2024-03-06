import { Image } from "@nextui-org/react"
import { useState } from "react"
import { MdImage } from "react-icons/md"
import { FormDataProduto } from "../modalAddItem"
import { UploadButton } from "@/lib/uploadthing"

// Componente para adicionar uma imagem com preview
export const InputAddImage = ({item, setItem}: {
    item: FormDataProduto // Propriedade que representa os dados do produto
    setItem: (item: FormDataProduto) => void // Função para atualizar os dados do produto
}) => {
    const [selectedImage, setSelectedImage] = useState<string | undefined>() // Estado para armazenar a URL da imagem selecionada

    return(
        <div className="relative flex justify-center items-center flex-col gap-2 w-full">
            {
                selectedImage &&
                <Image 
                    src={selectedImage}
                    alt={item.name}
                    width={150}
                    className="object-cover"
                />
            }
            <UploadButton 
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {  
                    setSelectedImage(res[0].url)
                }}
                  
                appearance={{
                    button({ ready, isUploading }) {
                      return {
                        ...(!ready && { cursor: "blocked" }),
                        ...(isUploading && { color: "#d1d5db" }),
                      };
                    },
                  }}
                content={{
                    button({ ready, isUploading, uploadProgress }) {
                        if (ready) return <span className="text-center">Alterar imagem</span>;
                        return "Carregando...";
                    },
                    allowedContent({ ready, fileTypes, isUploading, uploadProgress }) {
                      if (isUploading) return `${uploadProgress}%`;
                      return ''
                    },
                }}
            />
        </div>
    )
}



