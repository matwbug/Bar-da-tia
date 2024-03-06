import { gerarSlug, prisma } from "@/lib/functions"; // Importa a função gerarSlug do diretório específico
import { ProdutoStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server"; // Importa os tipos NextRequest e NextResponse do módulo next/server

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
        return await prisma.produtos.create({
            data: {
                name: values.name,
                description: values.description,
                preco: parseFloat(values.preco),
                imageUrl: values.image,
                quantidade: parseInt(values.quantidade),
                promocao: values.promocao === 'sim' ? true : false,
                atacado: values.atacado === 'sim' ? true : false,
                atacado_minquantidade: parseInt(values.atacado_minquantidade),
                promocao_preco: parseFloat(values.promocao_preco),
                slug: gerarSlug(values.name),
                status: ['ATIVO', 'DESATIVADO'].includes(values.status) ? values.status as ProdutoStatus : 'ATIVO',
                vendas: Math.floor((Math.random() * 100) * 100) / 100,
            }
        })

    } 
    catch (error) {
        console.error(`Erro ao criar novo item ${values.name.toLocaleUpperCase()}:`, error);
        throw Error(`Erro ao criar novo item ${values.name.toLocaleUpperCase()}:`)
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

        return new NextResponse(JSON.stringify({success: true }), {
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
