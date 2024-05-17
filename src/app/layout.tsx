import { Metadata } from "next"; // Importa o tipo Metadata do pacote Next.js
import Providers from "./providers";
import { Roboto, Bebas_Neue } from 'next/font/google' 
import Header from "@/components/header/header";
import "@/app/" 

const FontRoboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ["100", "300", '400', '500', "700", "900"]
})

const FontBebasNeue = Bebas_Neue({
  variable: '--font-bebas',
  weight: ['400'],
  subsets: ['latin']
})

// Define os metadados do site
export const metadata: Metadata = {
  title: {
    template: '%s | Bar da Tia',
    default: 'Bar da Tia'
  },
  description: 'Sistema `Bar da Tia` feito para portfolio para qualificação da vaga em Oak tecnologia',
  authors: {
    name: 'matwbug',
    url: 'https://github.com/matwbug'
  }
}

export default async function RootLayout({
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-br" className={`${FontBebasNeue.variable} ${FontRoboto.variable}`}> 
      <body className="flex flex-col font-sans"> 
        <Providers> 
          <Header /> 
          <main className="mt-10 px-6 h-fit"> 
            {children} 
          </main>
        </Providers>
      </body>
    </html>
  );
}
