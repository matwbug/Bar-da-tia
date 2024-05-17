import { Logo } from "@/components/logo";
import { NavbarPainel } from "./navbar-dashboard";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";

export default function HeaderPainel() {
    return (
        <Navbar maxWidth="full" position="static" className={`align-middle text-black bg-light-background-100 shadow-md`}>
          {/* Elemento para exibir o logotipo e o nome da seção do painel */}
          <NavbarBrand className="flex-row space-x-2 gap-2">
            <Logo variant="withName" href="/painel"/>
          </NavbarBrand>
          {/* Elemento de conteúdo da barra de navegação para exibir componentes à direita, como o menu do usuário */}
          <NavbarContent justify="end" className="flex flex-row gap-5">
            <NavbarPainel />
          </NavbarContent>
        </Navbar>
    );
}
