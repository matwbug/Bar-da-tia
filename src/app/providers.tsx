'use client' // Indica que este arquivo deve ser executado apenas no lado do cliente

import { ReactNode } from "react" // Importa o tipo ReactNode do React
import { CartProvider } from "../contexts/cart-context" // Importa o provedor de carrinho do diretório específico
import NextAuthSessionProvider from "@/providers/session-provider" // Importa o provedor de sessão do diretório específico
import AlertAuthor from "@/providers/alert-author" // Importa o provedor de alerta de autor do diretório específico

export default function Providers({children}: {children: ReactNode}){

    return(
        <AlertAuthor> {/* Fornece o provedor de alerta do autor */}
            <NextAuthSessionProvider> {/* Fornece o provedor de sessão do NextAuth */}
                <CartProvider> {/* Fornece o provedor de carrinho */}
                    {children} {/* Renderiza os componentes filhos */}
                </CartProvider>
            </NextAuthSessionProvider>
        </AlertAuthor>
    )
}