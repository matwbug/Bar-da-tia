import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"; // Importa os tipos NextApiHandler, NextApiRequest e NextApiResponse do Next.js
import { writeFile, readFile, unlink } from 'fs/promises'; // Importa funções assíncronas de escrita, leitura e exclusão de arquivos do sistema de arquivos
import { NextRequest, NextResponse } from "next/server"; // Importa os tipos NextRequest e NextResponse do Next.js
import { produtoProps } from "@/components/pages/home/cardProduto"; // Importa a interface produtoProps do componente cardProduto
import { gerarSlug } from "@/lib/utils"; // Importa a função gerarSlug do utilitário utils
import { existsSync } from "fs"; // Importa a função existsSync para verificar se um arquivo existe no sistema de arquivos

// Função para alterar a imagem de um produto
const alterarImagem = async (produtoInfo: produtoProps, fileName: string) => {
    try {
        // Lê os produtos do arquivo JSON
        const produtos = await readProdutos();

        // Mapeia os produtos e atualiza a imagem do produto específico
        const newProdutos = produtos.map(item => {
            if(item.id === produtoInfo.id){
                return {
                    ...item,
                    image: `/produtos/${fileName}`
                }
            }
            return item
        })

        // Converte os novos produtos para JSON
        const novoConteudo = JSON.stringify(newProdutos, null, 2);
        
        // Escreve os novos produtos no arquivo JSON
        await writeFile('./src/config/produtos.json', novoConteudo);

        // Remove a imagem antiga do produto, se existir
        if (existsSync(`./public/${produtoInfo.image}`)) {
            unlink(`./public/${produtoInfo.image}`)
        }   
        
    } catch (error) {
        console.error('Erro ao alterar o arquivo:', error);
    }
}

// Função para ler os produtos do arquivo JSON
const readProdutos = async (): Promise<produtoProps[]> => {
    try {
        // Lê os dados do arquivo JSON
        const data = await readFile('./src/config/produtos.json');

        // Converte os dados para objeto JavaScript
        const produtos: produtoProps[] = JSON.parse(data.toString());

        return produtos; // Retorna os produtos lidos do arquivo JSON
    } catch (error) {
        console.error('Erro ao ler o arquivo de produtos:', error);
        return []; // Retorna um array vazio em caso de erro
    }
}

// Função de manipulação de rota POST
export async function POST(req: NextRequest){
    try{
        // Obtém os dados do formulário
        const data = await req.formData();
        
        // Obtém o arquivo de imagem e o ID do produto do formulário
        const file: File | null = data.get('image') as unknown as File;
        const produtoId = data.get('itemId') as unknown as string;
     
        // Verifica se o arquivo de imagem existe
        if(!file){
            return NextResponse.json({success: false});
        }
     
        // Converte o arquivo de imagem em bytes e em buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
     
        // Determina a extensão do arquivo de imagem
        const ext = file.type === 'image/jpeg' ? 'jpg' : 'image/png';
        
        // Encontra as informações do produto pelo ID
        const produtoInfo = (await readProdutos()).find(item => item.id === parseInt(produtoId));

        // Retorna falso se as informações do produto não forem encontradas
        if(!produtoInfo) return NextResponse.json({success: false});
     
        // Gera um nome para o arquivo de imagem do produto
        const produtoImageName = `${gerarSlug(produtoInfo.name)}_${Date.now()}.${ext}`;
     
        // Altera a imagem do produto no arquivo JSON
        await alterarImagem(produtoInfo, produtoImageName);
     
        // Define o caminho para salvar o arquivo de imagem
        const path = `./public/produtos/${produtoImageName}`;
        
        // Salva o arquivo de imagem no sistema de arquivos
        await writeFile(path, buffer);
     
        // Retorna sucesso
        return NextResponse.json({success: true}); 
    }catch(error){
        // Retorna falha em caso de erro
        return NextResponse.json({success: false});
    }
}
