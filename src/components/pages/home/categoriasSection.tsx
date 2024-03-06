'use client'

import { Image } from '@nextui-org/react'; // Importa o componente Image do NextUI
import { motion } from 'framer-motion'; // Importa o componente motion do Framer Motion

// Define o tipo para as propriedades das categorias
interface CategoriasProps{
    name: string
    imageUrl: string
}

// Lista de categorias
const CategoriasList: CategoriasProps[] = [
    {
        name: 'Restaurante',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/discoveries/Restaurantes3_FGY1.png?imwidth=128'
    },
    {
        name: 'Mercado',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/discoveries/Mercados_0kKg.png?imwidth=128'
    },
    {
        name: 'Bebidas',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/discoveries/Bebidas_bkzX.png?imwidth=128'
    }
]

// Componente para renderizar a seção de categorias
export const CategoriasSection = () => {
    return(
        <section className="flex flex-col gap-4 mt-6 w-full max-sm:text-center">
            <h1 className="font-bold text-zinc-800">Categorias</h1>
            <div className="flex flex-row gap-4 justify-start items-center flex-wrap max-sm:justify-center">
            {
                // Mapeia as categorias e renderiza cada uma delas
                CategoriasList.map(item => {
                    return(
                        <motion.div
                            key={item.name}
                            className="flex flex-col justify-center items-center gap-1 rounded-md shadow-md bg-light-background-50
                            duration-200 p-4
                            "  
                            whileHover={{ scale: 1.05 }} // Animação ao passar o mouse sobre a categoria
                            transition={{ duration: 0.1, velocity: .5 }} // Configuração da animação
                        >
                            <Image 
                                src={item.imageUrl}
                                alt={item.name}
                                width={80}
                                className='rounded-md'
                            />
                            <span className='text-small text-gray-800'>{item.name}</span>
                        </motion.div>
                    )
                })
            }
            </div>
        </section>
    )
}
