import { NextRequest, NextResponse } from "next/server";
import sqlite3 from 'sqlite3';

const excluirItem = async (produtoId: number) => {
    try {
        const db = new sqlite3.Database('/src/data/database.sqlite');


        db.serialize(() => {
            db.run(`
                DELETE FROM produtos
                WHERE id = ?
            `, [produtoId],
                function(err) {
                    if (err) {
                        throw new Error('Não foi possível excluir o item')
                    } 
                }
            )
        })
        
    } catch (error) {
        console.error('Erro ao alterar o arquivo:', error);
    }
}


export async function POST(req: NextRequest){
    try{
        const data = await req.formData()
        const produtoId = data.get('produtoId') as unknown as string

        if(!produtoId){
            throw new Error('Por favor, preencha todos os campos obrigatórios.');
        }

        await excluirItem(parseInt(produtoId))

        return NextResponse.json({success: true})
    }catch(error){
        console.log(`Aconteceu algum erro \n Erro: ${error}`)
        return NextResponse.json({success: false})
    }
}