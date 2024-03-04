import { Avatar, Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { MdOutlineSpaceDashboard } from "react-icons/md"
import { VscSignOut } from "react-icons/vsc"

/**
 * NavbarPainel é o componente de barra de navegação para um painel.
 * Utiliza a biblioteca NextAuth para obter informações de sessão.
*/

export const NavbarPainel = () => {
    const { data } = useSession()

    return(
        <Popover>
            {/* PopoverTrigger define o ponto de gatilho para o popover */}
            <PopoverTrigger className="cursor-pointer">
                {/* Avatar exibe a imagem do usuário e a primeira letra do nome */}
                <Avatar src={data?.user?.image ?? undefined} name={data?.user?.name?.substring(0,1).toLocaleUpperCase() ?? ''} />
            </PopoverTrigger>
            {/* PopoverContent contém o conteúdo do popover exibido quando acionado */}
            <PopoverContent className="p-2 dark:bg-dark-background-950 bg-light-background-100 w-[120px] gap-1 hover:bg-light-background-100/hover">
                {/* Verifica se o usuário é um admin para exibir um link para o Painel */}
                {
                    data?.user?.name === 'admin' &&
                    <div className="w-full flex-row justify-center items-center">
                        {/* Button como Link para navegar até a página do Painel */}
                        <Button as={Link} href="/painel" className="flex-row justify-start items-center" variant="light" fullWidth> 
                            <MdOutlineSpaceDashboard />
                            Painel
                        </Button>
                    </div>
                }
                {/* Botão para realizar o logout do usuário */}
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
