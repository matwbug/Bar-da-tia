import prisma from '@/lib/prisma'
import { auth } from "@/auth";
import { z } from "zod";
import { gerarSlug } from '@/lib/utils';

const schemaEditItem = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    preco: z.number().optional(),
    quantidade: z.number().optional(),
    atacado: z.boolean().optional(),
    atacadoMinQuantidade: z.number().optional(),
    promocao: z.boolean().optional(),
    promocaoPreco: z.number().optional(),
    images: z.array(z.string())
})

// Função para lidar com a solicitação POST
export async function POST(
    req: Request, 
    { params }: {
    params: {
        'item-slug': string
    }
}){
    try{

        const resolvedSchema = await schemaEditItem.safeParseAsync(await req.json())
        if(!resolvedSchema.success) return Response.json({ mesage: 'Wrong body' }, { status: 403 })

        const session = await auth()

        if(session?.user.role !== 'ADMIN'){
            return Response.json({ message: 'Unauthorized access.' }, { status: 401 })
        }

        const slug = z.string().parse(params["item-slug"])

        const existsItem = await prisma.item.findFirst({ where: { slug }})
        if(!existsItem) return Response.json({ message: 'Item not found.'}, { status: 400 })

        const newData = resolvedSchema.data

        await prisma.item.update({
            where: { slug },
            data: {
                name: newData.name,
                description: newData.description,
                preco: newData.preco,
                slug: newData.name && gerarSlug(newData.name),
                promocao: newData.promocao,
                promocaoPreco: newData.promocaoPreco,
                atacado: newData.atacado,
                atacadoMinQuantidade: newData.atacadoMinQuantidade,
                images: { set: newData.images },
                quantidade: newData.quantidade,
            }
        })

        return Response.json({success: true}); // Retorna true para indicar que a operação foi concluída com sucesso
    }catch(error){
        console.log(`Aconteceu algum erro`, error); // Exibe um erro se ocorrer um problema durante o processamento da solicitação
        return Response.json({ message: 'Internal server error'}, { status: 500 }); // Retorna false se ocorrer um erro
    }
}
