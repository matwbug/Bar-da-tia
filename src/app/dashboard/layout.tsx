import { Metadata } from "next"; // Importa o tipo Metadata do Next.js
import { Roboto, Bebas_Neue, Oswald } from 'next/font/google' // Importa as fontes do Google Fonts
import Providers from "@/app/providers"; // Importa o componente Providers de um diretório específico
import { redirect } from "next/navigation"; // Importa a função redirect do Next.js

import "@/components/style/global.css" // Importa o arquivo CSS global
import { auth } from "@/auth";
import SidebarPainel from "./components/sidebar";
import HeaderPainel from "./components/header-dashboard";

// Define metadados para a página
export const metadata: Metadata = {
  title: 'Dashboard',
}

// Define o componente RootLayout
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()

  if(!session?.user){
    redirect('/login') // Redireciona para a página de login se não houver sessão
  }
  
  return (
    <div className={`flex flex-col flex-1`}>
      {/* Renderiza o componente HeaderPainel */}
      <HeaderPainel />
      {children} {/* Renderiza o conteúdo principal da página */}
    </div>
  );
}
