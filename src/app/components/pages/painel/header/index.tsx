'use client'

import { Avatar, Button, Input, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Logo from "../../../Logo";
import Link from "next/link";
import { PiFacebookLogoBold, PiInstagramLogoBold } from "react-icons/pi";
import { BiSearch } from "react-icons/bi";
import { useAuth } from "../../../contexts/AuthContext";
import { NavNotLogged } from "../../home/header/NavNotLogged";
import { NavLogged } from "../../home/header/NavLogged";

export default function HeaderPainel(){
    const { isAuthenticated } = useAuth()

    return(
        <Navbar maxWidth="full" position="static" className={`${!isAuthenticated && `hidden`} container w-screen align-middle text-black dark:text-white bg-dark`} >
          <NavbarBrand className="flex-row space-x-2">
            <Logo variant="withName"/>
          </NavbarBrand>
          <NavbarContent justify="end" className="flex flex-row gap-5">
            {
              !isAuthenticated 
              ? <NavNotLogged />
              : <NavLogged />
            }
          </NavbarContent>
        </Navbar>
    )
}