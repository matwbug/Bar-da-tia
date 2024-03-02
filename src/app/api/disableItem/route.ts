import { produtoProps } from "@/components/pages/home/cardProduto";
import { existsSync } from "fs";
import { readFile, unlink, writeFile } from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const desativarItem = async (produtoInfo: produtoProps) => {
    try {
        const produtos = await readProdutos()

        const newProdutos = produtos.map(item => {
            if(item.id === produtoInfo.id){
                return {
                    ...item,
                    status: produtoInfo.status === 'ATIVO' ? 'DESATIVADO' : 'ATIVO'
                }
            }
            return item
        })

        const novoConteudo = JSON.stringify(newProdutos, null, 2);
        await writeFile('./src/config/produtos.json', novoConteudo);

        
    } catch (error) {
        console.error('Erro ao alterar o arquivo:', error);
    }
}

const readProdutos = async (): Promise<produtoProps[]> => {
    try {
        const data = await readFile('./src/config/produtos.json');
        const produtos: produtoProps[] = JSON.parse(data.toString());
        return produtos; // Retorna os produtos lidos do arquivo JSON
    } catch (error) {
        console.error('Erro ao ler o arquivo de produtos:', error);
        return []; // Retorna um array vazio em caso de erro
    }
}

export async function POST(req: NextRequest){
    const data = await req.formData()
    const produtoId = data.get('produtoId') as unknown as string

    try{
        let produtoInfo = ((await readProdutos()).find(item => item.id === parseInt(produtoId)))
        if(!produtoInfo) return NextResponse.json({success: false});

        await desativarItem(produtoInfo)
        produtoInfo = ((await readProdutos()).find(item => item.id === parseInt(produtoId))) //Atualizando valor
        if(!produtoInfo) return NextResponse.json({success: false}); 

        return NextResponse.json({success: true, status: produtoInfo.status})
    }catch(error){
        console.log(`Aconteceu algum erro \n Erro: ${error}`)
        return NextResponse.json({success: false})
    }
}