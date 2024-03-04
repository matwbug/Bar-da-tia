import { Metadata } from "next"; // Importa o tipo Metadata do pacote Next.js
import Providers from "./providers"; // Importa o componente Providers do diretório específico

import { Roboto, Bebas_Neue } from 'next/font/google' // Importa as fontes Roboto e Bebas Neue do Google Fonts

import "@/components/style/global.css" // Importa o arquivo de estilos globais CSS
import Header from "@/components/pages/home/header"; // Importa o componente Header do diretório específico

// Define os metadados do site
export const metadata: Metadata = {
  title: 'Bar da Tia',
  description: 'Sistema `Bar da Tia` feito para portfolio para qualificação da vaga em Oak tecnologia',
  authors: {
    name: 'matwbug',
    url: 'https://github.com/matwbug'
  }
}

// Define a fonte Roboto com suas configurações
const FontRoboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ["100", "300", '400', '500', "700", "900"]
})

// Define a fonte Bebas Neue com suas configurações
const FontBebasNeue = Bebas_Neue({
  variable: '--font-bebas',
  weight: ['400'],
  subsets: ['latin']
})

// Define o layout principal da aplicação
export default async function RootLayout({
  children, // Componentes filhos
}: Readonly<{
  children: React.ReactNode; // Tipo de propriedade para os filhos, que é um nó React
}>) {

  return (
      <html lang="pt-br" className={`${FontBebasNeue.variable} ${FontRoboto.variable}`}> {/* Define o idioma do documento HTML e aplica as fontes definidas */}
        <body className="flex flex-col font-sans"> {/* Define o corpo do documento HTML com uma fonte padrão sans-serif */}
          <Providers> {/* Renderiza o componente Providers para prover contexto para os componentes filhos */}
            <Header /> {/* Renderiza o componente Header para o cabeçalho da página */}
            <main className="mt-10 px-6 h-fit"> {/* Define o conteúdo principal da página */}
              {children} {/* Renderiza os componentes filhos dentro do conteúdo principal */}
            </main>
          </Providers>
        </body>
      </html>
  );
}
