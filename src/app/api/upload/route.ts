import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { writeFile, readFile, unlink } from 'fs/promises'
import { NextRequest, NextResponse } from "next/server";
import { produtoProps } from "@/components/pages/home/cardProduto";
import { gerarSlug } from "@/lib/utils";
import { existsSync } from "fs";

const alterarImagem = async (produtoInfo: produtoProps, fileName: string) => {
    try {
        const produtos = await readProdutos()

        const newProdutos = produtos.map(item => {
            if(item.id === produtoInfo.id){
                return {
                    ...item,
                    image: `/produtos/${fileName}`
                }
            }
            return item
        })

        const novoConteudo = JSON.stringify(newProdutos, null, 2);
        await writeFile('./src/config/produtos.json', novoConteudo);

        if (existsSync(`./public/${produtoInfo.image}`)) {
            unlink(`./public/${produtoInfo.image}`)
        }   
        
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
    try{
        const data = await req.formData()
        const file: File | null = data.get('image') as unknown as File
        const produtoId = data.get('itemId') as unknown as string
     
        if(!file){
            return NextResponse.json({success: false})
        }
     
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
     
        const ext = file.type === 'image/jpeg' ? 'jpg' : 'image/png'  
        const produtoInfo = (await readProdutos()).find(item => item.id === parseInt(produtoId))
        if(!produtoInfo) return NextResponse.json({success: false})
     
        const produtoImageName = `${gerarSlug(produtoInfo.name)}_${Date.now()}.${ext}`
     
        await alterarImagem(produtoInfo, produtoImageName)
     
        const path = `./public/produtos/${produtoImageName}`
        await writeFile(path, buffer)
     
        return NextResponse.json({success: true}) 
    }catch(error){
        return NextResponse.json({success: false})
    }
}
