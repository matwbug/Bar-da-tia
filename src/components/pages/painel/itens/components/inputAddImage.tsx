import { Image } from "@nextui-org/react"
import { useState } from "react"
import { MdImage } from "react-icons/md"
import { FormDataProduto } from "../modalAddItem"

// Componente para adicionar uma imagem com preview
export const InputAddImage = ({item, setItem}: {
    item: FormDataProduto // Propriedade que representa os dados do produto
    setItem: (item: FormDataProduto) => void // Função para atualizar os dados do produto
}) => {
    const [selectedImage, setSelectedImage] = useState<string | undefined>() // Estado para armazenar a URL da imagem selecionada

    return(
        <div className="relative flex justify-center items-center flex-col gap-2 w-full">
            <label>
                <input 
                    type="file" 
                    hidden 
                    accept="image/jpeg, image/png" 
                    onChange={async({target}) => {
                        if(target.files){
                            const file = target.files[0] // Obtém o arquivo de imagem selecionado
                            setSelectedImage(URL.createObjectURL(file)) // Cria uma URL temporária para exibir a imagem
                            setItem({...item, image: file}) // Atualiza os dados do produto com a imagem selecionada
                        }
                    }}
                />
                <div 
                    className={`
                        relative w-40 h-40 rounded-sm flex items-center
                        justify-center border-2 border-dashed border-light-background-200
                       
                        hover:bg-light-background-100 duration-300 ease-in-out
                    `}
                >
                    {
                        selectedImage
                        ? <Image 
                            src={selectedImage} // Define a URL da imagem
                            alt={item.name} // Define o texto alternativo da imagem
                            width={150} // Define a largura da imagem
                            className="object-cover" // Define o estilo da imagem
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



