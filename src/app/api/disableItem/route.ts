import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from "next/server";

const desativarItem = async (produtoId: number, action: 'DESATIVAR' | 'ATIVAR') => {
    try {
       await prisma.produtos.update({
        where: {id: produtoId},
        data: {
            status: action === 'ATIVAR' ? 'ATIVO' : 'DESATIVADO'
        }
       })
        
    } catch (error) {
        console.error('Erro ao alterar o arquivo:', error);
    }
}


export async function POST(req: NextRequest){
    try{
        const data = await req.formData()
        const produtoId = data.get('produtoId') as unknown as string
        const action = data.get('action') as unknown as string

        if (!produtoId || !action || !['ATIVAR', 'DESATIVAR'].includes(action as string)) {
            throw new Error('Por favor, preencha todos os campos obrigatórios.');
        }

        await desativarItem(parseInt(produtoId), action as 'DESATIVAR' | 'ATIVAR');

        return NextResponse.json({success: true})
    }catch(error){
        console.log(`Aconteceu algum erro \n Erro: ${error}`)
        return NextResponse.json({success: false})
    }
}