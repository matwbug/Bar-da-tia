import { ItemStatus } from "@prisma/client";
import itensData from '@/config/produtos.json'
import { gerarSlug } from "@/lib/utils";
import prisma from "@/lib/prisma";

async function seed(){
    await prisma.item.deleteMany()
    await prisma.user.deleteMany()

    await prisma.item.createMany({
        data: itensData.map(item => ({
            name: item.name,
            description: item.description,
            slug: gerarSlug(item.name),
            images: [...item.image],
            atacado: item.atacado,
            atacadoMinQuantidade: item.atacado_minquantidade,
            promocao: item.promocao,
            promocaoPreco: item.promocao_preco,
            preco: item.preco,
            quantidade: item.quantidade,
            status: item.status as ItemStatus,
            vendas: item.vendas,
        }))
    })
}

seed().then(() => {
    console.log(`Database seeded! 🌱`)
})