import { Metadata } from "next";
import { Roboto, Bebas_Neue, Oswald } from 'next/font/google'
import Providers from "@/app/(public)/providers";
import HeaderPainel from "@/components/pages/painel/layout/header";
import SidebarPainel from "@/components/pages/painel/layout/sidebar";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import "@/components/style/global.css"


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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(nextAuthOptions)
  if(!session){
    redirect('/login')
  }
  
  return (
      <html lang="pt-br" className={`${FontBebasNeue.variable} ${FontRoboto.variable} ${FontOswald.variable}`}>
          <body className="font-sans bg-light-background-200/100">
            <Providers>
              <main className="h-screen flex flex-row">
                <SidebarPainel />
                <div className={`flex flex-col flex-1`}>
                  <HeaderPainel />
                  {children}
                </div>
              </main>
            </Providers>
        </body>
      </html>
  );
}