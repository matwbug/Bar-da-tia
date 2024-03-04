import { produtoProps } from "@/components/pages/home/cardProduto"; // Importa o tipo produtoProps do diretório específico
import { gerarSlug } from "@/lib/utils"; // Importa a função gerarSlug do diretório específico
import { readFile, writeFile } from "fs/promises"; // Importa as funções readFile e writeFile do módulo fs/promises
import { NextRequest, NextResponse } from "next/server"; // Importa os tipos NextRequest e NextResponse do módulo next/server

// Interface para definir os tipos dos valores do formulário
interface FormDataValues{
    name: string
    description: string
    preco: string
    quantidade: string
    promocao: string
    promocao_preco: string | null
    atacado: string
    atacado_minquantidade: string | null
    vendas: string
    status: string 
}

// Função para ler os produtos do arquivo JSON
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

// Função para adicionar um novo item ao arquivo de produtos
const adicionarItem = async (values: FormDataValues, image: File | null) => {
    try {
        const produtos = await readProdutos()

        if(!image){
            throw Error('No image found.') // Lança um erro se não houver imagem
        }
     
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)
     
        const ext = image.type === 'image/jpeg' ? 'jpg' : 'png'  
     
        const produtoImageName = `${gerarSlug(values.name)}_${Date.now()}.${ext}` // Gera um nome único para a imagem
     
        const path = `./public/produtos/${produtoImageName}`
        await writeFile(path, buffer) // Salva a imagem no diretório especificado

        // Cria um novo objeto de produto com os dados fornecidos
        const newProduto: produtoProps = {
            id: (produtos[produtos.length - 1].id + 1),
            name: values.name,
            description: values.description,
            image: `/produtos/${produtoImageName}`,
            preco: parseFloat(values.preco),
            promocao: values.promocao === 'sim' ? true : false,
            promocao_preco: values.promocao_preco ? parseFloat(values.promocao_preco.toString()) : 0,
            quantidade: parseInt(values.quantidade),
            slug: gerarSlug(values.name),
            status: values.status,
            vendas: 0,
            atacado: values.atacado === 'sim' ? true : false,
            atacado_minquantidade: values.atacado_minquantidade ? parseInt(values.atacado_minquantidade) : 0,
        }

        const novoConteudo = JSON.stringify([...produtos, newProduto], null, 2);
        await writeFile('./src/config/produtos.json', novoConteudo); // Escreve os produtos atualizados no arquivo JSON

        return newProduto // Retorna o novo produto adicionado
        
    } catch (error) {
        console.error('Erro ao alterar o arquivo:', error);
    }
}

// Função para lidar com a requisição POST
export async function POST(req: NextRequest){
    try{
        const data = await req.formData() // Obtém os dados do formulário
        const valores: FormDataValues = {} as FormDataValues;
        const file: File | null = data.get('image') as unknown as File // Obtém a imagem do formulário

        data.forEach((valor, chave: string) => {
            if (typeof chave === 'string' && typeof valor === 'string') {
                (valores as any)[chave] = valor; // Preenche os valores do formulário
            }
        });

        const newItem = await adicionarItem(valores, file) // Adiciona o novo item

        return new NextResponse(JSON.stringify({success: true, newItem: newItem}), {
            status: 200 // Define o status da resposta para 200 (OK)
        });
    }
    catch(error){
        console.log(`Aconteceu algum erro \n Erro: ${error}`)
        return new NextResponse(JSON.stringify({ success: false }), {
            status: 500 // Define o status da resposta para 500 (Erro interno do servidor)
        });
    }
}
