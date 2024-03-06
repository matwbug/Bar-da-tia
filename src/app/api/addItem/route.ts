import { produtoProps } from "@/components/pages/home/cardProduto"; // Importa o tipo produtoProps do diretório específico
import { gerarSlug } from "@/lib/functions"; // Importa a função gerarSlug do diretório específico
import { readFile, writeFile } from "fs/promises"; // Importa as funções readFile e writeFile do módulo fs/promises
import { NextRequest, NextResponse } from "next/server"; // Importa os tipos NextRequest e NextResponse do módulo next/server
import sqlite3 from 'sqlite3';

// Interface para definir os tipos dos valores do formulário
interface FormDataValues{
    name: string
    description: string
    preco: string
    image: string
    quantidade: string
    promocao: string
    promocao_preco: string
    atacado: string
    atacado_minquantidade: string
    vendas: string
    status: string 
}


// Função para adicionar um novo item ao arquivo de produtos
const adicionarItem = async (values: FormDataValues) => {
    try {
        const db = new sqlite3.Database('/src/data/database.sqlite');


        db.serialize(() => {
            db.run(`
                    INSERT INTO produtos (name, description, slug, preco, image, quantidade, promocao, promocao_preco, atacado, atacado_minquantidade, vendas, status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `, [values.name, values.description, gerarSlug(values.name), values.preco, values.image, values.quantidade, values.promocao === 'sim' ? true : false, values.promocao_preco, values.atacado === 'sim' ? true : false, values.atacado_minquantidade, values.vendas, values.status], 
                    function(err) {
                        if (err) {
                            console.error(err.message);
                        } 
                    }
            ); 
        })
    } 
    catch (error) {
        console.error('Erro ao alterar o arquivo:', error);
    }
}

// Função para lidar com a requisição POST
export async function POST(req: NextRequest){
    try{
        const data = await req.formData() // Obtém os dados do formulário
        const valores: FormDataValues = {} as FormDataValues;

        // Verifica se todos os campos obrigatórios foram preenchidos
        const camposObrigatorios = ['name', 'description', 'preco', 'image', 'quantidade', 'promocao', 'promocao_preco', 'atacado', 'atacado_minquantidade', 'status'];
        for (const campo of camposObrigatorios) {
            if (!data.has(campo)) {
                throw new Error(`Campo '${campo}' é obrigatório.`);
            }
        }

        data.forEach((valor, chave: string) => {
            if (typeof chave === 'string' && typeof valor === 'string') {
                (valores as any)[chave] = valor; // Preenche os valores do formulário
            }
        });

        await adicionarItem(valores) // Adiciona o novo item

        return new NextResponse(JSON.stringify({success: true}), {
            status: 200 // Define o status da resposta para 200 (OK)
        });
    }
    catch(error){
        console.log(`Aconteceu algum erro \n Erro: ${error}`)
        return new NextResponse(JSON.stringify({ success: false, error: error }), {
            status: 500 // Define o status da resposta para 500 (Erro interno do servidor)
        });
    }
}
