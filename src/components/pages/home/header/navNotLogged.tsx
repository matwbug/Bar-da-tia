import { Avatar, Button, Link, NavbarItem } from "@nextui-org/react"
import { CiLogin } from "react-icons/ci"

export const NavNotLogged = () => {
    return<>
        <NavbarItem className="lg:flex">
            <Button as={Link} href="/login" className="bg-transparent" isIconOnly>
                <CiLogin size={20} className="text-black" />
            </Button>
        </NavbarItem>
    </>
}