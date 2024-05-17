import { auth } from '@/auth'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { gerarSlug } from '@/lib/utils'

const schemaNewItem = z.object({
    name: z.string(),
    description: z.string(),
    preco: z.number(),
    images: z.array(z.string()),
    quantidade: z.number(),
    promocao: z.boolean(),
    promocaoPreco: z.number().optional(),
    atacado: z.boolean(),
    atacadoMinQuantidade: z.number().optional(),
    status: z.enum(["ATIVO", "PENDENTE", "DESATIVADO"])
})


// Função para lidar com a requisição POST
export async function POST(
    req: Request, 
    { params }: {
    params: {
        'item-slug': string
    }
}){
    try{
        const resolvedSchema = await schemaNewItem.safeParseAsync(await req.json())
        if(!resolvedSchema.success) return Response.json({ mesage: 'Wrong body' }, { status: 403 })
        
        const session = await auth()
        if(session?.user.role !== 'ADMIN'){
            return Response.json({ message: 'Unauthorized access.' }, { status: 401 })
        }

        const slug = z.string().parse(params["item-slug"])

        const existsItem = await prisma.item.findFirst({ where: { slug }})
        if(!existsItem) return Response.json({ message: 'Item not found.'}, { status: 400 })

        const newData = resolvedSchema.data

        await prisma.item.create({
            data: {
                name: newData.name,
                description: newData.description,
                preco: newData.preco,
                slug: gerarSlug(newData.name),
                promocao: newData.promocao,
                promocaoPreco: newData.promocaoPreco || 0,
                atacado: newData.atacado,
                atacadoMinQuantidade: newData.atacadoMinQuantidade || 0,
                quantidade: newData.quantidade,
                status: newData.status,
                images: newData.images,
                vendas: 0
            }
        })

        
    }
    catch(error){
        console.log(`Aconteceu algum erro`, error); // Exibe um erro se ocorrer um problema durante o processamento da solicitação
        return Response.json({ message: 'Internal server error'}, { status: 500 }); // Retorna false se ocorrer um erro
    }
}
