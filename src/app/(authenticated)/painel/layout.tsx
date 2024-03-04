import { Metadata } from "next"; // Importa o tipo Metadata do Next.js
import { Roboto, Bebas_Neue, Oswald } from 'next/font/google' // Importa as fontes do Google Fonts
import Providers from "@/app/(public)/providers"; // Importa o componente Providers de um diretório específico
import HeaderPainel from "@/components/pages/painel/layout/header"; // Importa o componente HeaderPainel de um diretório específico
import SidebarPainel from "@/components/pages/painel/layout/sidebar"; // Importa o componente SidebarPainel de um diretório específico
import { getServerSession } from "next-auth"; // Importa a função getServerSession do NextAuth.js
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"; // Importa as opções de autenticação do NextAuth.js
import { redirect } from "next/navigation"; // Importa a função redirect do Next.js

import "@/components/style/global.css" // Importa o arquivo CSS global

// Define metadados para a página
export const metadata: Metadata = {
  title: 'Bar da Tia',
  description: 'Sistema `Bar da Tia` feito para portfolio para qualificação da vaga em Oak tecnologia',
  authors: {
    name: 'matwbug',
    url: 'https://github.com/matwbug'
  }
}

// Define as configurações da fonte Roboto
const FontRoboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '500']
})

// Define as configurações da fonte Oswald
const FontOswald = Oswald({
    variable: '--font-oswald',
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700']
})
  
// Define as configurações da fonte BebasNeue
const FontBebasNeue = Bebas_Neue({
  variable: '--font-bebas',
  weight: ['400'],
  subsets: ['latin']
})

// Define o componente RootLayout
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Obtém a sessão do servidor usando as opções de autenticação do NextAuth.js
  const session = await getServerSession(nextAuthOptions)
  if(!session){
    redirect('/login') // Redireciona para a página de login se não houver sessão
  }
  
  return (
      // Estrutura HTML da página
      <html lang="pt-br" className={`${FontBebasNeue.variable} ${FontRoboto.variable} ${FontOswald.variable}`}>
          <body className="font-sans bg-light-background-200/100">
            {/* Renderiza o componente Providers */}
            <Providers>
              {/* Main content da página */}
              <main className="h-screen flex flex-row">
                {/* Renderiza o componente SidebarPainel */}
                <SidebarPainel />
                {/* Conteúdo principal da página */}
                <div className={`flex flex-col flex-1`}>
                  {/* Renderiza o componente HeaderPainel */}
                  <HeaderPainel />
                  {children} {/* Renderiza o conteúdo principal da página */}
                </div>
              </main>
            </Providers>
        </body>
      </html>
  );
}
