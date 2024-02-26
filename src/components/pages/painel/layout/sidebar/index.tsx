'use client'

import { Avatar, Button, Link } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { motion, useAnimation } from 'framer-motion'
import { VscSignOut } from "react-icons/vsc";
import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CiHome } from "react-icons/ci";
import { HiOutlineArchiveBox } from "react-icons/hi2";

export default function SidebarPainel(){
    const { data } = useSession()
    

    const navList: {
        name: string, url: string, icon: ReactNode}[] 
        = [
        {
            name: 'Home',
            url: '/painel',
            icon: <CiHome size={20} />
        },
        {
            name: 'Itens',
            url: '/painel/itens',
            icon: <HiOutlineArchiveBox size={20} />
        },
    ]

    const pathname = usePathname()


    return(
        <aside 
            className="w-[300px] bg-light-background-100/80 flex flex-col shadow-lg p-6"
        >
            <div className="w-full h-30 justify-center flex flex-col items-center gap-2">
                <Avatar 
                    src={data?.user?.image ?? undefined}
                    name={data?.user?.name?.substring(0,1).toLocaleUpperCase() ?? ''}
                    size="lg"
                />
                <div className="flex flex-row gap-1 items-center justify-center">
                    <span>{data?.user?.name}</span>
                    <Button size="sm" isIconOnly onClick={() => signOut()} variant="light" fullWidth>  
                        <VscSignOut size={14}/> 
                    </Button>
                </div>
                <div className="w-full flex flex-col">
                {
                    navList.map(item => {
                        return(
                            <Link key={`nav_${item.name}`} href={item.url}>
                                <div 
                                    className={`${pathname === item.url ? 'bg-light-background-200' : 'bg-transparent'} flex flex-row text-black justify-start items-center w-full p-3 gap-4 0 mx-1 rounded-md`}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </div>
                            </Link>
                        )
                    })
                }
                </div>
            </div>
            
        </aside>
    )
}   