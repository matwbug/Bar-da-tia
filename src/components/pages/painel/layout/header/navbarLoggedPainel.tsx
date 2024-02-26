import { Avatar, Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { MdOutlineSpaceDashboard } from "react-icons/md"
import { VscSignOut } from "react-icons/vsc"

export const NavbarPainel = () => {
    const { data } = useSession()

    return(
        <Popover>
            <PopoverTrigger className="cursor-pointer">
                <Avatar src={data?.user?.image ?? undefined} name={data?.user?.name?.substring(0,1).toLocaleUpperCase() ?? ''} />
            </PopoverTrigger>
            <PopoverContent className="p-2 dark:bg-dark-background-950 bg-light-background-100 w-[120px] gap-1 hover:bg-light-background-100/hover">
                {
                    data?.user?.name === 'admin' &&
                    <div className="w-full flex-row justify-center items-center">
                        <Button as={Link} href="/painel" className="flex-row justify-start items-center" variant="light" fullWidth> 
                            <MdOutlineSpaceDashboard />
                            Painel
                        </Button>
                    </div>
                }
                <div className="w-full flex-row justify-center items-center">
                    <Button onClick={() => signOut()} className="flex-row justify-start items-center" variant="light" fullWidth>  
                        <VscSignOut /> 
                        Sair
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}