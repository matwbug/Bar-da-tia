import { produtoProps } from "@/components/pages/home/cardProduto"; // Importa a interface de props do produto
import { readFile, writeFile } from "fs/promises"; // Importa funções de leitura e escrita de arquivos
import { NextRequest, NextResponse } from "next/server"; // Importa tipos de solicitação e resposta do Next.js

interface FormDataValues {
    [key: string]: string; // Define um tipo para os valores do formulário
}

// Função para ler os produtos do arquivo JSON
const readProdutos = async (): Promise<produtoProps[]> => {
    try {
        const data = await readFile('./src/config/produtos.json'); // Lê os dados do arquivo
        const produtos: produtoProps[] = JSON.parse(data.toString()); // Converte os dados em formato JSON
        return produtos; // Retorna os produtos lidos do arquivo JSON
    } catch (error) {
        console.error('Erro ao ler o arquivo de produtos:', error); // Exibe um erro se ocorrer algum problema na leitura do arquivo
        return []; // Retorna um array vazio em caso de erro
    }
}

// Interface para os valores do formulário de edição do produto
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

// Função para editar um item de produto
const editarItem = async (produtoInfo: produtoProps, valores: Dataprops) => {
    try {
        const produtos = await readProdutos(); // Lê os produtos do arquivo JSON

        // Mapeia os produtos e atualiza o produto desejado com os novos valores
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
            return item;
        });

        const novoConteudo = JSON.stringify(newProdutos, null, 2); // Converte os produtos atualizados de volta para JSON
        await writeFile('./src/config/produtos.json', novoConteudo); // Escreve os produtos atualizados no arquivo
    } catch (error) {
        console.error('Erro ao alterar o arquivo:', error); // Exibe um erro se ocorrer algum problema na edição do arquivo
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

        // Encontra o produto com base no ID fornecido nos valores do formulário
        let produtoInfo = ((await readProdutos()).find(item => item.id === parseInt(valores.id)))
        if(!produtoInfo) return NextResponse.json({success: false}); // Retorna false se o produto não for encontrado

        // Chama a função para editar o item do produto com os novos valores
        await editarItem(produtoInfo, {
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
