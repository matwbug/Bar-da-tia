import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Produtos } from '@prisma/client'
import prisma from '@/lib/prisma'

const excluirItem = async (produtoId: number) => {
    try {
        await prisma.produtos.delete({
            where: {id: produtoId}
        })
        
        

    } catch (error) {
        console.error('Não foi possível excluir o item', error);
        throw Error('Não foi possível excluir o item')
    }
}


export async function POST(req: NextRequest){
    try{
        const data = await req.formData()
        const produtoId = data.get('produtoId') as unknown as string

        if(!produtoId){
            throw new Error('Por favor, preencha todos os campos obrigatórios.');
        }

        await excluirItem(parseInt(produtoId))

        return NextResponse.json({success: true})
    }
    catch(error){
        console.log(`Aconteceu algum erro \n Erro: ${error}`)
        return NextResponse.json({success: false})
    }
    finally{
        await prisma.$disconnect()
    } 
}