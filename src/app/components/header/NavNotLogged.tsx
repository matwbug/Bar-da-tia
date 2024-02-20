import { Avatar, Button, Link, NavbarItem } from "@nextui-org/react"

export const NavNotLogged = () => {
    return<>
        <NavbarItem className="hidden lg:flex">
            <Button as={Link} href="#" variant="light" className="text-white">
            Entrar
            </Button>
        </NavbarItem>
        <NavbarItem>
            <Button as={Link} color="default" href="#" variant="flat" className="text-white">
            Registrar
            </Button>
        </NavbarItem>
    </>
}