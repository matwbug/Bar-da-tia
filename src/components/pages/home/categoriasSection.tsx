'use client'

import { Image } from '@nextui-org/react'
import { motion } from 'framer-motion'

interface CategoriasProps{
    name: string
    imageUrl: string
}

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

export const CategoriasSection = () => {
    return(
        <section className="flex flex-col gap-4 mt-6">
            <h1 className="font-bold text-zinc-800">Categorias</h1>
            <div className="flex flex-row gap-4 justify-start items-center flex-wrap">
            {
                CategoriasList.map(item => {
                    return(
                        <motion.div
                            key={item.name}
                            className="flex flex-col justify-center items-center gap-1 rounded-sm
                            duration-200 p-4
                            "  
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.1, velocity: .5 }}
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