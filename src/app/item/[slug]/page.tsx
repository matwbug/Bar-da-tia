import Image from "next/image";
import { PercentCircle } from "lucide-react";
import { RelatedItens } from "./components/related-itens";
import { api } from "@/lib/api";
import { Item } from "@prisma/client";
import { Metadata } from "next";
import { ProdutoNotExists } from "./components/item-not-exists";
import prisma from "@/lib/prisma";

async function getItem(slug: string): Promise<Item> {
  const response = await api(`/item/${slug}`, {
    next: {
      revalidate: 60
    }
  })

  const item = await response.json()

  return item
  
}

export async function generateStaticParams() {
  const itens = await prisma.item.findMany({ take: 5 })

  return itens.map(item => {
    return { slug: item.slug }
  })
}

export async function generateMetadata({params}: {
  params: {
    slug: string
  }
}): Promise<Metadata> {

  const item = await getItem(params.slug)

  return {
    title: item.name,
    description: item.description,
    openGraph: {
      images: item.images[0]
    }
  }
}


// Define a função do componente ItemIndex
export default async function ItemIndex({params}: {
  params: {
    slug: string,
  },
}){

  const item = await getItem(params.slug)

  // Verifica se o produto existe
  if(!item)  return <ProdutoNotExists /> // Renderiza o componente ProdutoNotExists se o produto não existir

  return (
    <main className="flex flex-col container items-center gap-8">
      <div className="relative bg-light-background-200/50 w-full rounded-md flex p-6 items-center justify-center flex-col gap-5 lg:flex-row h-96 max-lg:h-fit">
        <div className="w-80 h-80 p-5 flex justify-center items-center">
            <Image
              src={item.images[0]}
              alt={item.name}
              className="object-cover w-full h-full"
            />
        </div>
        <div className="flex flex-col gap-5 max-w-[700px]">
            <div className="flex flex-col justify-start gap-3">
                <p className="font-normal font-bebas text-2xl">{item.name}</p>
                <span className="font-light text-gray-800">{item.description}</span>
            </div>
            <div className="flex flex-row gap-6 items-center justify-start ">
                {item.atacado &&
                    <div className="flex flex-col gap-1 justify-start">
                        <span className="text-emerald-400 font-medium text-xl">{(item.preco - (item.preco * 0.05)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        <span className="text-tiny bg-emerald-400 p-1 rounded font-light text-white">A PARTIR DE {item.atacadoMinQuantidade} UN</span>
                    </div>}
                <div className="flex flex-col gap-1 justify-start">
                    <span className="font-medium text-xl">{(item.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    <span className="text-tiny py-1 rounded text-gray-600 font-light">PREÇO UNITÁRIO</span>
                </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="flex flex-row gap-1 text-gray-800 items-center justify-start"> <PercentCircle size={20} /> Desconto aplicado no momento da compra no carrinho</span>
            </div>
        </div>
      </div>
      <RelatedItens />
    </main>
  )
    
}
