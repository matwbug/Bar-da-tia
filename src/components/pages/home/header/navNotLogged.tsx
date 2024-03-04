import { Avatar, Button, Link, NavbarItem } from "@nextui-org/react"; // Importa os componentes necessários do NextUI
import { CiLogin } from "react-icons/ci"; // Importa o ícone de login da biblioteca React Icons

export const NavNotLogged = () => {
    return( 
        <NavbarItem className="lg:flex"> {/* Define um item de navegação para usuários não logados */}
            <Button as={Link} href="/login" className="bg-transparent" isIconOnly> {/* Renderiza um botão como um link para a página de login */}
                <CiLogin size={20} className="text-black" /> {/* Renderiza o ícone de login */}
            </Button>
        </NavbarItem>
    )
}
