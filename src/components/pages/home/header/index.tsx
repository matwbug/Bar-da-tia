'use client'

import { Input, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Logo from "../../../logo";
import { BiSearch } from "react-icons/bi";
import { useAuth } from "../../../../../contexts/authContext";
import { NavNotLogged } from "./navNotLogged";
import { NavLogged } from "./navLogged";
import { CartNavbar } from "./cartNavbar";

export default function Header(){
    const {isAuthenticated} = useAuth()

    return(
        <Navbar maxWidth="full" className="container w-screen align-middle text-black dark:text-white bg-dark">
          <NavbarBrand className="flex-row space-x-2">
            <Logo variant="withName"/>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex" justify="center">
            <NavbarItem className="w-fit">
              <Input
                classNames={{
                  base: "max-w-full w-96 h-10",
                  mainWrapper: "h-full",
                  input: "text-small",
                  inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 hover:bg-default-500/20",
                }}
                fullWidth
                placeholder="Procure por itens"
                size="sm"
                startContent={<BiSearch size={18} />}
                type="search"
              />
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end" className="flex flex-row gap-5">
            <NavbarItem>
              <CartNavbar />
            </NavbarItem>
            {
              !isAuthenticated 
              ? <NavNotLogged />
              : <NavLogged />
            }
          </NavbarContent>
        </Navbar>
    )
}