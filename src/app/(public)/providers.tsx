'use client' // Indica que este arquivo deve ser executado apenas no lado do cliente

import { NextUIProvider } from "@nextui-org/react" // Importa o provedor de UI do NextUI
import { useRouter } from "next/navigation" // Importa o hook useRouter do Next.js para navegação
import { ReactNode } from "react" // Importa o tipo ReactNode do React
import { CartProvider } from "../../contexts/cartContext" // Importa o provedor de carrinho do diretório específico
import NextAuthSessionProvider from "@/providers/sessionProvider" // Importa o provedor de sessão do diretório específico
import AlertAuthor from "@/providers/alertAuthor" // Importa o provedor de alerta de autor do diretório específico

// Define o componente Providers
export default function Providers({children}: {children: ReactNode}){
    const router = useRouter() // Inicializa o hook useRouter para obtenção do objeto de roteamento

    return(
        <NextUIProvider navigate={router.push}> {/* Fornece o provedor de UI do NextUI com a função de navegação */}
            <AlertAuthor> {/* Fornece o provedor de alerta de autor */}
                <NextAuthSessionProvider> {/* Fornece o provedor de sessão do NextAuth */}
                    <CartProvider> {/* Fornece o provedor de carrinho */}
                        {children} {/* Renderiza os componentes filhos */}
                    </CartProvider>
                </NextAuthSessionProvider>
            </AlertAuthor>
        </NextUIProvider>
    )
}