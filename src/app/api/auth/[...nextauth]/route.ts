import { validUsers } from "@/config/users"; // Importa a lista de usuários válidos do diretório específico
import NextAuth from "next-auth/next"; // Importa o NextAuth
import GithubProvider from "next-auth/providers/github"; // Importa o provedor de autenticação do GitHub
import CredentialsProvider from  "next-auth/providers/credentials"; // Importa o provedor de autenticação de credenciais
import { AuthOptions, NextAuthOptions } from "next-auth"; // Importa os tipos AuthOptions e NextAuthOptions do next-auth

// Define as opções de autenticação do NextAuth
export const nextAuthOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET ?? "", // Define a chave secreta para NextAuth
    providers: [
        CredentialsProvider({ // Configuração do provedor de autenticação de credenciais
            name: "Credentials", // Nome do provedor
            credentials: { // Configuração das credenciais necessárias
              username: { label: "Usuário", type: "text" }, // Campo de entrada de nome de usuário
              password: { label: "Senha", type: "password" } // Campo de entrada de senha
            },
            async authorize(credentials, req) { // Função de autorização para verificar as credenciais

                const isValidCredentials = validUsers.find(validUser => validUser.username.toLowerCase() === credentials?.username.toLowerCase() && validUser.password === credentials.password); // Verifica se as credenciais são válidas
                if(isValidCredentials){ // Se as credenciais forem válidas
                    return { // Retorna os dados do usuário autenticado
                        id: isValidCredentials.id.toString(),
                        name: isValidCredentials.username
                    }
                }
                return null; // Retorna nulo se as credenciais não forem válidas
            }
        })
    ],
    pages: {
        signIn: '/login', // Define a página de login
    },

}

const handler = NextAuth(nextAuthOptions); // Cria o manipulador de autenticação NextAuth

export { handler as GET, handler as POST }; // Exporta o manipulador de autenticação para as rotas GET e POST
