'use server'

import { Produtos } from '@prisma/client'
import prisma from '@/lib/prisma'


export async function getItens(limit?: number): Promise<Produtos[]> {
    try {
        const data = await prisma.produtos.findMany({
            take: limit,
            where: {
                status: 'ATIVO'
            }
        });

        return data;
    } catch (error) {
        console.error('Erro ao buscar dados do banco de dados:', error);
        return []
    }  
    finally{
        await prisma.$disconnect()
    } 
}

export async function getItem(produtoId: number): Promise<Produtos | null> {
    try {
        const data = await prisma.produtos.findUnique({
            where: {
                id: produtoId
            }
        });

        return data;
    } catch (error) {
        console.error('Erro ao buscar dados do banco de dados:', error);
        return null; // Retorna undefined em caso de erro
    }
    finally{
        await prisma.$disconnect()
    }  
}

export async function getProdutosExceptId(excludedId: number, limit: number): Promise<Produtos[]> {
    try {
        const data = await prisma.produtos.findMany({
            take: limit,
            where: {
                NOT: { id: excludedId }
            }
        });

        return data || []; // Retorna uma lista vazia se não houver dados
    } catch (error) {
        console.error('Erro ao buscar dados do banco de dados:', error);
        throw error;
    }
    finally{
        await prisma.$disconnect()
    } 
}

export async function getItensWithSearch(search: string, limit: number): Promise<Produtos[]> {
    try {
        const data = await prisma.produtos.findMany({
            take: limit,
            where: {
                OR: [
                    { name: { contains: search } },
                    { description: { contains: search } }
                ]
            }
        });

        return data;
    } catch (error) {
        console.error('Erro ao buscar dados do banco de dados:', error);
        throw error
    }
    finally{
        await prisma.$disconnect()
    } 
}
