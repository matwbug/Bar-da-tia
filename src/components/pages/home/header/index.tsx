/* eslint-disable react-hooks/exhaustive-deps */ // Desabilita o aviso de dependências exaustivas para o hook useEffect

'use client' // Indica que o código está sendo executado no lado do cliente

import { Input, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"; // Importa os componentes necessários do NextUI para construir o cabeçalho
import { BiSearch } from "react-icons/bi"; // Importa o ícone de pesquisa da biblioteca React Icons
import { NavNotLogged } from "./navNotLogged"; // Importa o componente de navegação para usuários não autenticados
import { CartNavbar } from "./cartNavbar"; // Importa o componente que controla o carrinho
import { Logo } from "@/components/logo"; // Importa o componente do logotipo da aplicação
import { useSession } from "next-auth/react"; // Importa o hook useSession do NextAuth para gerenciar a sessão do usuário
import { NavLogged } from "./navLogged";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Header(){
    const { data } = useSession() // Obtém os dados da sessão do usuário
    const { push } = useRouter()

    const [search, setSearch] = useState('')

    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        push(`/itens/${search}`);
      } 
    }

    return(
        <Navbar maxWidth="full" className="container w-screen align-middle text-black dark:text-white bg-dark"> {/* Define a barra de navegação com largura máxima igual à largura da tela */}
          <NavbarBrand className="flex-row space-x-2">
            <Logo variant="withName"/> {/* Renderiza o logotipo da aplicação com o nome, usando o componente Logo */}
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex" justify="center"> {/* Define o conteúdo da barra de navegação no centro */}
            <NavbarItem className="w-fit">
              <Input
                classNames={{
                  base: "max-w-full w-96 h-10", // Define as classes CSS para o campo de entrada de pesquisa
                  mainWrapper: "h-full",
                  input: "text-small",
                  inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 hover:bg-default-500/20",
                }}
                fullWidth
                placeholder="Procure por itens" // Define o placeholder para o campo de pesquisa
                size="sm"
                startContent={<BiSearch size={18} />} // Adiciona o ícone de pesquisa à esquerda do campo de entrada
                type="search"
                value={search}
                onValueChange={setSearch}
                onKeyUp={handleSearch}
              />
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end" className="flex flex-row gap-5"> {/* Define o conteúdo da barra de navegação no lado direito */}
            <NavbarItem>
              <CartNavbar /> {/* Renderiza o componente que controla o carrinho */}
            </NavbarItem>
            {
              data?.user // Verifica se o usuário está autenticado
              ? <NavLogged /> // Renderiza o componente de navegação para usuários autenticados
              : <NavNotLogged /> // Renderiza o componente de navegação para usuários não autenticados
            }
          </NavbarContent>
        </Navbar>
    )
}
