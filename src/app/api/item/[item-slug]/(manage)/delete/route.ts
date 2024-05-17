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
            return Response.json({ message: 'Unauthorized' }, { status: 401 })
        }

        const slug = z.string().parse(params["item-slug"])

        const existsItem = await prisma.item.findFirst({ where: { slug }})
        if(!existsItem) return Response.json({ message: 'Item not found!'}, { status: 400 })

        await prisma.item.delete({
            where: {slug }
        })

        return Response.json({ message: 'Item deleted with success!'}, { status: 200 })
    }
    catch(error){
        console.log(`Erro ao deletar o item`, error)
        return Response.json({ message: 'Internal server error'}, { status: 500 })
    }
}