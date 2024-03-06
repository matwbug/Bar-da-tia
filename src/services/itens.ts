'use server'

import { produtoProps } from '@/components/pages/home/cardProduto';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('/src/data/database.sqlite');

export async function getItens(limit?: number): Promise<produtoProps[]> {
    try {
        

        // Array para armazenar os produtos
        const data: produtoProps[] = [];

        // Consulta SQL para selecionar todos os produtos
        const sql = `SELECT * FROM produtos ${limit && `LIMIT ${limit}`}`;

        // Executar a consulta SQL

        db.serialize(async() => {
            db.each(sql, (err, row) => {
                if (err) {
                  throw err; // Se houver um erro, lançamos uma exceção
                }
                // Adicionar cada produto retornado pela consulta ao array 'data'
                data.push(row as produtoProps);
            })
        })
        

        return data

    } catch (error) {
        console.error('Erro ao buscar dados do banco de dados:', error);
        return []
    }  
}

export async function getItem(produtoId: number): Promise<produtoProps | undefined> {
    try {

        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM produtos WHERE id = ?`;

            db.get(sql, produtoId, (err, row) => {
                if (err) {
                    reject(err); // Rejeita a promessa se houver um erro
                } else {
                    resolve(row as produtoProps); // Resolve a promessa com os dados obtidos
                }
            });
        });
    } catch (error) {
        console.error('Erro ao buscar dados do banco de dados:', error);
        return undefined; // Retorna undefined em caso de erro
    }  
}

export async function getProdutosExceptId(excludedId: number, limit: number): Promise<produtoProps[]> {
    try {
        const db = new sqlite3.Database('/src/data/database.sqlite');

        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM produtos WHERE id != ? LIMIT ${limit}`;

            db.all(sql, excludedId, (err, rows) => {
                if (err) {
                    reject(err); // Rejeita a promessa se houver um erro
                } else {
                    resolve(rows as produtoProps[]); // Resolve a promessa com os dados obtidos
                }
            });
        });
    } catch (error) {
        console.error('Erro ao buscar dados do banco de dados:', error);
        throw error; // Lança o erro novamente para que ele possa ser tratado pelo chamador
    }  
}

export async function getItensWithSearch(search: string, limit: number): Promise<produtoProps[]> {
    try {

        return new Promise((resolve, reject) => {
            const sql = `
                SELECT * FROM produtos 
                WHERE name LIKE '%' || ? || '%' OR description LIKE '%' || ? || '%'
                LIMIT ?
            `;

            db.all(sql, [search, search, limit], (err, rows) => {
                if (err) {
                    reject(err); // Rejeita a promessa se houver um erro
                } else {
                    resolve(rows as produtoProps[]); // Resolve a promessa com os dados obtidos
                }
            });

        });
    } catch (error) {
        console.error('Erro ao buscar dados do banco de dados:', error);
        throw error; // Lança o erro novamente para que ele possa ser tratado pelo chamador
    }  
}
