import { produtoProps } from "@/components/pages/home/cardProduto";
import { readFile, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

interface FormDataValues {
    [key: string]: string;
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

interface Dataprops {
    name: string;
    description: string;
    preco: string;
    quantidade: string;
    atacado: string;
    atacado_minquantidade: string;
    promocao: string;
    promocao_preco: string;
}



const editarItem = async (produtoInfo: produtoProps, valores: Dataprops) => {
    try {
        const produtos = await readProdutos()

        const newProdutos = produtos.map(item => {
            if(item.id === produtoInfo.id){
                return {
                    ...item,
                    name: valores.name,
                    description: valores.description,
                    preco: parseFloat(valores.preco),
                    quantidade: parseInt(valores.quantidade),
                    atacado: valores.atacado === 'sim' ? true : false,
                    atacado_minquantidade: parseInt(valores.atacado_minquantidade),
                    promocao: valores.promocao === 'sim' ? true : false,
                    promocao_preco: parseFloat(valores.promocao_preco)
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

export async function POST(req: NextRequest){
    try{
        const data = await req.formData()
        const valores: FormDataValues = {} as FormDataValues;

        data.forEach((valor, chave: string) => {
            if (typeof chave === 'string' && typeof valor === 'string') {
                valores[chave] = valor;
            }
        });

        let produtoInfo = ((await readProdutos()).find(item => item.id === parseInt(valores.id)))
        if(!produtoInfo) return NextResponse.json({success: false});

        await editarItem(produtoInfo, {
            name: valores.name, 
            atacado: valores.atacado, 
            atacado_minquantidade: valores.atacado_minquantidade,
            description: valores.description,
            preco: valores.preco,
            promocao: valores.promocao,
            promocao_preco: valores.promocao_preco,
            quantidade: valores.quantidade
        })

        return NextResponse.json({success: true, })
    }catch(error){
        console.log(`Aconteceu algum erro \n Erro: ${error}`)
        return NextResponse.json({success: false})
    }
}