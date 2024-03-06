"use client"

import { useState } from "react"
import { produtoProps } from "../../../home/cardProduto"
import { UploadButton } from "@/lib/uploadthing"

import "@uploadthing/react/styles.css";
import { Image } from "@nextui-org/react";

/**
 * Componente InputUploadImage
 * 
 * @param {object} item - As informações do produto.
 */
export const InputUploadImage = ({item}: {
    item: produtoProps
}) => {
    const [selectedImage, setSelectedImage] = useState<string>(item.image)

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
