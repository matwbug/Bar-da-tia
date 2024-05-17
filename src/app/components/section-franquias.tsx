'use client'

import { motion } from 'framer-motion'; // Importa o componente motion do Framer Motion
import { Star } from 'lucide-react';
import Image from 'next/image';

// Define o tipo para as propriedades das franquias
interface FranquiaProps{
    name: string,
    rate: number
    tipo: 'Lanches' | 'Vegetariana' | 'Mexicana' | 'Porções' | 'Árabe' | 'Chinesa' | 'Pizza' | 'Brasileira' | 'Doces & Bolos'
    valorEntrega: 'grátis' | number
    tempoPreparo: '20-30 min' | '30-40 min' | '40-50 min'
    imageUrl: string
    distancia: string
}

// Lista de franquias
const FranquiasList: FranquiaProps[] = [
    // Franquia 1
    {
        name: `Mcdonald's `,
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/logosgde/fc1f8c64-876d-41e8-9af4-613bbd2bf42a/202104061939_hhID_i.png?imwidth=128',
        rate: 4.3,
        tempoPreparo: '20-30 min',
        tipo: 'Lanches',
        valorEntrega: 'grátis',
        distancia: '4.7 km'
    },
    // Franquia 2
    {
        name: `Burguer King`,
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/logosgde/f88701dd-ae22-4417-bd13-3cd624533099/202310201943_SJI2.png?imwidth=128',
        rate: 4.9,
        tempoPreparo: '40-50 min',
        tipo: 'Lanches',
        valorEntrega: 'grátis',
        distancia: '2.8 km'
    },
    // Franquia 3
    {
        name: 'Tacomex - Mexican Food',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/logosgde/2c1ed6b1-b80d-4bd1-a833-65a3f6bbe25a/202201181657_UrSo_i.png?imwidth=128',
        rate: 4.9,
        tempoPreparo: '40-50 min',
        tipo: 'Mexicana',
        valorEntrega: 8.99,
        distancia: '2.7 km'
    },
    // Franquia 4
    {
        name: 'China in Box',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/logosgde/b79cdf4c-b622-4e26-8a34-2034aa1db04e/202311131547_CJRJ.png?imwidth=128',
        rate: 4.9,
        tempoPreparo: '40-50 min',
        tipo: 'Mexicana',
        valorEntrega: 12.99,
        distancia: '2.5 km'
    },
    // Franquia 5
    {
        name: 'Fome Comedoria',
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/logosgde/9610206b-bf62-4fd0-a2aa-e37ec25a1ab2/202302152233_Jujq_i.jpg?imwidth=128',
        rate: 4.7,
        tempoPreparo: '30-40 min',
        tipo: 'Brasileira',
        valorEntrega: 'grátis',
        distancia: '4.7 km'
    },
    // Franquia 6
    {
        name: `Domino's Pizza`,
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/logosgde/709c388e-f456-404e-a468-cae74ef15bc3/202211041742_cS8z_i.jpg?imwidth=128',
        rate: 4.8,
        tempoPreparo: '40-50 min',
        tipo: 'Pizza',
        valorEntrega: 11.99,
        distancia: '3.2 km'
    },
    // Franquia 7
    {
        name: `Pizza Hut`,
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/logosgde/cea2d37d-57df-4820-a11b-702fcbdafe20/202304281829_SVN6.png?imwidth=128',
        rate: 4.8,
        tempoPreparo: '40-50 min',
        tipo: 'Pizza',
        valorEntrega: 8.99,
        distancia: '2.7 km'
    },
    // Franquia 8
    {
        name: `Doce Morada`,
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/logosgde/e99898b0-4ac6-4c65-a2b1-d400ad457044/202401091242_KuS5_i.jpg?imwidth=128',
        rate: 4.9,
        tempoPreparo: '40-50 min',
        tipo: 'Doces & Bolos',
        valorEntrega: 9.99,
        distancia: '5.7 km'
    },
    // Franquia 9
    {
        name: `Cookie Mania`,
        imageUrl: 'https://static.ifood-static.com.br/image/upload/t_medium/logosgde/7fb50d73-6468-4a05-a9a2-2ba7eef93690/202402111742_XuH4_i.jpg?imwidth=128',
        rate: 4.8,
        tempoPreparo: '40-50 min',
        tipo: 'Doces & Bolos',
        valorEntrega: 19.99,
        distancia: '5.7 km'
    },
]

// Componente para renderizar a seção de franquias
export const FranquiasSection = () => {
    return(
        <section className="flex flex-col gap-4 mt-6 w-full">
            <h1 className="font-bold text-zinc-800">Lojas afiliadas</h1>
            <div className="flex flex-row gap-2 justify-start items-center flex-wrap w-full">
            {
                // Mapeia as franquias e renderiza cada uma delas
                FranquiasList.map(item => {
                    return(
                        <motion.div 
                            key={item.name}
                            className="
                                flex flex-row justify-center items-center gap-3 
                                bg-light-background-50 p-4 rounded-md shadow-md 
                                cursor-pointer max-md:w-[100%] max-lg:w-[48%] w-[32.2%] h-34
                                hover:bg-light-background-50/hover duration-300
                            "
                            whileHover={{ scale: 1.02 }} // Animação ao passar o mouse sobre a franquia
                            transition={{ duration: 0.1, velocity: .5 }} // Configuração da animação
                        >
                            <Image 
                                src={item.imageUrl}
                                alt={item.name}
                                width={100}
                                className="rounded-md max-md:rounded-full"
                            />
                            <div className="flex flex-col gap-1">
                                <p className="text-black text-small">{item.name}</p>
                                <div className="flex gap-2 flex-row items-center justify-start text-tiny">
                                    <span className="text-yellow-500 flex flex-row gap-1 items-center font-bold"><Star />{item.rate}</span>
                                    <span className="text-gray-700 font-light">{item.tipo}</span>
                                    <span className="text-gray-700 font-light ">{`${item.distancia}`}</span>
                                </div>
                                <div className="flex gap-2 flex-row items-center justify-start text-sm">
                                    <span className="text-gray-700 font-light">{item.tempoPreparo}</span>
                                    {item.valorEntrega === 'grátis' 
                                    ? <span className="text-emerald-500 font-normal">GRÁTIS</span>
                                    : <span className="text-gray-700 font-light">{item.valorEntrega.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>}
                                </div>
                            </div>
                        </motion.div>
                    )
                })
            }
            </div>
        </section>
    )
}
