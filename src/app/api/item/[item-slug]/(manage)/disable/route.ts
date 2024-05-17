import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

export async function POST(
    _: Request, 
    { params }: {
    params: {
        'item-slug': string
    }
}){
    try{

        const session = await auth()

        if(session?.user.role !== 'ADMIN'){
            return Response.json({ message: 'Unauthorized access.' }, { status: 401 })
        }

        const slug = z.string().parse(params["item-slug"])

        const existsItem = await prisma.item.findFirst({ where: { slug }})
        if(!existsItem) return Response.json({ message: 'Item not found!'}, { status: 400 })

        await prisma.item.update({
            where: {slug: slug},
            data: {
                status: existsItem.status === 'ATIVO' ? 'DESATIVADO' : 'ATIVO'
            }
        })

        return Response.json({success: true})
    }catch(error){
        console.log(`Aconteceu algum erro \n Erro: ${error}`)
        return Response.json({success: false})
    }
}