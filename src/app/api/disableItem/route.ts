import { NextRequest, NextResponse } from "next/server";
import sqlite3 from 'sqlite3';

const desativarItem = async (produtoId: number, action: string) => {
    try {
        const db = new sqlite3.Database('/src/data/database.sqlite');


        db.serialize(() => {
            db.run(`
                UPDATE produtos
                SET status = ?
                WHERE id = ?
            `, [action, produtoId],
                function(err) {
                    if (err) {
                        console.error(err.message);
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
        const action = data.get('action') as unknown as string

        if(!produtoId || !action || action !== 'ATIVO' && action !== 'DESATIVADO'){
            throw new Error('Por favor, preencha todos os campos obrigatórios.');
        }

        await desativarItem(parseInt(produtoId), action)

        return NextResponse.json({success: true})
    }catch(error){
        console.log(`Aconteceu algum erro \n Erro: ${error}`)
        return NextResponse.json({success: false})
    }
}