import { Button } from "@nextui-org/button";
import { NavbarItem } from "@nextui-org/navbar";
import { LogIn } from "lucide-react";
import Link from "next/link";

export const NavNotLogged = () => {
    return( 
        <NavbarItem className="lg:flex"> {/* Define um item de navegação para usuários não logados */}
            <Button as={Link} href="/login" className="bg-transparent" isIconOnly> {/* Renderiza um botão como um link para a página de login */}
                <LogIn size={20} className="text-black" /> {/* Renderiza o ícone de login */}
            </Button>
        </NavbarItem>
    )
}
