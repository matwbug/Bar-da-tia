'use client'

import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";

import { useSession } from "next-auth/react";
import { Logo } from "@/components/logo";
import { NavbarPainel } from "./navbarLoggedPainel";

export default function HeaderPainel(){
    return(
        <Navbar maxWidth="full" position="static" className={`align-middle text-black bg-light-background-100 shadow-md`}>
          <NavbarBrand className="flex-row space-x-2 gap-2">
            <Logo variant="withName" href="/painel"/>
          </NavbarBrand>
          <NavbarContent justify="end" className="flex flex-row gap-5">
            <NavbarPainel />
          </NavbarContent>
        </Navbar>
    )
}