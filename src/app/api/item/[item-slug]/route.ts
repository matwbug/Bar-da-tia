import prisma from "@/lib/prisma";
import { z } from "zod";

export async function GET(_: Request, { params }: {
    params: {
        'item-slug': string
    }
}) {

    const slug = z.string().parse(params["item-slug"])

    const itemData = await prisma.item.findFirst({
        where: { slug: slug }
    })

    if(!itemData){
        return Response.json({ message: 'Item not found!'}, { status: 400 })
    }

    return Response.json(itemData, { status: 200 })

}