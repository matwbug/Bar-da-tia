import Providers from "@/app/(public)/providers" // Importa o componente Providers de um diretório específico
import { Metadata } from "next" // Importa o tipo Metadata de next

// Importa as fontes Bebas_Neue, Oswald e Roboto do Google Fonts
import { Bebas_Neue, Oswald, Roboto } from "next/font/google"

// Define metadados para a página
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
  weight: ['400', '500']
})

// Define a fonte Oswald com suas configurações
const FontOswald = Oswald({
    variable: '--font-oswald',
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700']
})
  
// Define a fonte BebasNeue com suas configurações
const FontBebasNeue = Bebas_Neue({
  variable: '--font-bebas',
  weight: ['400'],
  subsets: ['latin']
})

// Importa o arquivo CSS global
import "@/components/style/global.css"

// Define o componente RootLayout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Estrutura HTML da página
    <html lang="pt-br" className={`${FontBebasNeue.variable} ${FontRoboto.variable} ${FontOswald.variable}`}>
          <body className="flex flex-col font-sans">
              {/* Renderiza o componente Providers */}
              <Providers>
                  {/* Main content da página */}
                  <main className="h-full w-full flex flex-row">
                    <div className={"w-full bg-light-background-200/100"} style={{width: "calc(100%-400px)"}}>
                      {children} {/* Renderiza o conteúdo principal da página */}
                    </div>
                  </main>
              </Providers>
          </body>
      </html>
  )
}
