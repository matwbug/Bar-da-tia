"use client"

import { useState } from "react"
import { UploadButton } from "@/lib/uploadthing"

import "@uploadthing/react/styles.css";
import Image from "next/image";
import { Item } from "@prisma/client";

/**
 * Componente InputUploadImage
 * 
 * @param {object} item - As informações do produto.
*/
export const InputUploadImage = ({item, setProduto}: {
    item: Item
    setProduto: (item: Item) => void
}) => {
    const [selectedImage, setSelectedImage] = useState<string>(item.images[0])

    return(
        <div className="relative w-fit h-fit flex justify-center items-center flex-col gap-2">
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
                    setProduto({...item, images: [...item.images, res[0].url]})
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
                    button({ ready }) {
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
