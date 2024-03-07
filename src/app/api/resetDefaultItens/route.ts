
import produtos from '@/config/produtos.json'

import { gerarSlug } from "@/lib/functions"; // Importa a função gerarSlug do diretório específico
import { ProdutoStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server"; // Importa os tipos NextRequest e NextResponse do módulo next/server

import prisma from '@/lib/prisma'

// Função para lidar com a requisição POST
export async function POST(req: NextRequest){
    try{
        await prisma.produtos.deleteMany({})

        const data = await Promise.all(produtos.map(async(item) => {
            return await prisma.produtos.create({
                data: {
                    name: item.name,
                    description: item.description,
                    preco: item.preco,
                    imageUrl: item.image,
                    quantidade: item.quantidade,
                    promocao: item.promocao,
                    atacado: item.atacado,
                    atacado_minquantidade: item.atacado_minquantidade,
                    promocao_preco: item.promocao_preco,
                    slug: item.slug,
                    status: ['ATIVO', 'DESATIVADO'].includes(item.status) ? item.status as ProdutoStatus : 'ATIVO',
                    vendas: item.vendas,
                },
                select: {
                    id: true,
                    name: true
                }
            })
        }))

        return new NextResponse(JSON.stringify({success: true, data }), {
            status: 200 // Define o status da resposta para 200 (OK)
        });
    }
    catch(error){
        console.log(`Aconteceu algum erro \n Erro: ${error}`)
        return new NextResponse(JSON.stringify({ success: false, error: error }), {
            status: 500 // Define o status da resposta para 500 (Erro interno do servidor)
        });
    }
}
