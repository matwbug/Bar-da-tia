import Providers from "@/app/(public)/providers"
import { Metadata } from "next"
import { Bebas_Neue, Oswald, Roboto } from "next/font/google"


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

import "@/components/style/global.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" className={`${FontBebasNeue.variable} ${FontRoboto.variable} ${FontOswald.variable}`}>
          <body className="flex flex-col font-sans">
              <Providers>
                  <main className="h-full w-full flex flex-row">
                    <div className={"w-full bg-light-background-200/100"} style={{width: "calc(100%-400px)"}}>
                      {children}
                    </div>
                  </main>
              </Providers>
          </body>
      </html>
  )
}
