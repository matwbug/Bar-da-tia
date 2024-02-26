import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NextUIProvider } from "@nextui-org/react";
import Link from "next/link";
import { PiFacebookLogoBold, PiInstagramLogoBold } from "react-icons/pi";
import { Metadata } from "next";
import Providers from "./providers";

import { Roboto, Bebas_Neue } from 'next/font/google'

import "@/components/style/global.css"
import Header from "@/components/pages/home/header";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

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
