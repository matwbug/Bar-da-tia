import { produtoProps } from "@/components/pages/home/cardProduto"; // Importa a interface de props do produto
import { gerarSlug, prisma } from "@/lib/functions";
import { readFile, writeFile } from "fs/promises"; // Importa funções de leitura e escrita de arquivos
import { NextRequest, NextResponse } from "next/server"; // Importa tipos de solicitação e resposta do Next.js

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
        prisma.produtos.update({
            where: {id: values.id},
            data: {
                name: values.name,
                description: values.description,
                preco: values.preco ? parseFloat(values.preco) : undefined,
                atacado: values.atacado ? values.atacado === 'sim' ? true : false : undefined,
                promocao: values.promocao ? values.promocao === 'sim' ? true : false : undefined,
                atacado_minquantidade: values.atacado_minquantidade ? parseInt(values.atacado_minquantidade) : undefined,
                promocao_preco: values.promocao_preco ? parseFloat(values.promocao_preco) : undefined,
                imageUrl: values.image,
                quantidade: values.quantidade ? parseInt(values.quantidade) : undefined,
                slug: values.name ? gerarSlug(values.name) : undefined,
            }
        })
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
