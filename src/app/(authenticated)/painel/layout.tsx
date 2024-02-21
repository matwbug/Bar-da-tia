import { Metadata } from "next";

import { Roboto, Bebas_Neue, Roboto_Condensed, Oswald } from 'next/font/google'

import "@/app/global.css"
import Providers from "@/app/(public)/providers";
import HeaderPainel from "@/app/components/pages/painel/header";

export const metadata: Metadata = {
  title: 'Bar da Tia',
  description: 'Sistema `Bar da Tia` feito para portfolio para qualificação da vaga em Oak tecnologia',
  authors: {
    name: 'matwbug',
    url: 'https://github.com/matwbug'
  }
}

const FontRoboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '500']
})

const FontOswald = Oswald({
    variable: '--font-oswald',
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700']
})
  

const FontBebasNeue = Bebas_Neue({
  variable: '--font-bebas',
  weight: ['400'],
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br" className={`${FontBebasNeue.variable} ${FontRoboto.variable} ${FontOswald.variable}`}>
            <body className="flex flex-col font-sans">
                <Providers>
                    <HeaderPainel />
                    <main className="h-full w-full">
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}