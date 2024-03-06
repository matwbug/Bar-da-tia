import { produtoProps } from "@/components/pages/home/cardProduto"; // Importa a interface de props do produto
import { readFile, writeFile } from "fs/promises"; // Importa funções de leitura e escrita de arquivos
import { NextRequest, NextResponse } from "next/server"; // Importa tipos de solicitação e resposta do Next.js
import sqlite3 from 'sqlite3';

interface FormDataValues {
    [key: string]: string; // Define um tipo para os valores do formulário
}

// Interface para os valores do formulário de edição do produto
interface Dataprops {
    id: number,
    name?: string;
    description?: string;
    preco?: string;
    quantidade?: string;
    atacado?: string;
    atacado_minquantidade?: string;
    promocao?: string;
    promocao_preco?: string;
    image?: string
}

// Função para editar um item de produto
const editarItem = async (values: Dataprops) => {
    try {
        const { id, ...valores } = values;

        // Montar a parte da consulta SQL que define quais campos serão atualizados
        let camposParaAtualizar = '';
        const campos: string[] = [];

        Object.entries(valores).forEach(([campo, valor], index) => {
            if (valor !== undefined && valor !== null) {
                campos.push(`${campo} = ?`);
            }
        });
        camposParaAtualizar = campos.join(', ');

        // Montar a consulta SQL de UPDATE
        const sql = `
            UPDATE produtos
            SET ${camposParaAtualizar}
            WHERE id = ?
        `;

        // Criar um array com os valores dos campos a serem atualizados
        const valoresParaAtualizar: (string | undefined)[] = [];

        Object.entries(valores).forEach(([campo, valor]) => {
            if (valor !== undefined) {
                valoresParaAtualizar.push(valor);
            }
        });
        
        valoresParaAtualizar.push(values.id.toString());

        const db = new sqlite3.Database('db.sqlite');

        db.serialize(() => {
            db.run(sql, valoresParaAtualizar);
        });
    } catch (error) {
        console.error('Erro ao alterar o arquivo:', error); // Exibe um erro se ocorrer algum problema na edição do arquivo
        throw error;
    }
}

// Função para lidar com a solicitação POST
export async function POST(req: NextRequest){
    try{
        const data = await req.formData(); // Obtém os dados do formulário
        const valores: FormDataValues = {} as FormDataValues; // Inicializa um objeto para armazenar os valores do formulário

        // Percorre os dados do formulário e os armazena no objeto de valores
        data.forEach((valor, chave: string) => {
            if (typeof chave === 'string' && typeof valor === 'string') {
                valores[chave] = valor;
            }
        });

        await editarItem({
            id: parseInt(valores.id),
            image: valores.image,
            name: valores.name, 
            atacado: valores.atacado, 
            atacado_minquantidade: valores.atacado_minquantidade,
            description: valores.description,
            preco: valores.preco,
            promocao: valores.promocao,
            promocao_preco: valores.promocao_preco,
            quantidade: valores.quantidade
        });

        return NextResponse.json({success: true}); // Retorna true para indicar que a operação foi concluída com sucesso
    }catch(error){
        console.log(`Aconteceu algum erro \n Erro: ${error}`); // Exibe um erro se ocorrer um problema durante o processamento da solicitação
        return NextResponse.json({success: false}); // Retorna false se ocorrer um erro
    }
}
