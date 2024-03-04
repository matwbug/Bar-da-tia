import { Avatar, Button, Link, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { VscSignOut } from "react-icons/vsc";

// Componente de navegação para usuários logados
export const NavLogged = () => {
    // Obtém os dados da sessão do usuário
    const { data } = useSession();

    return (
        <Popover>
            {/* Disparador de popover com a imagem do usuário */}
            <PopoverTrigger className="cursor-pointer">
                <Avatar src={data?.user?.image ?? undefined} name={data?.user?.name?.substring(0, 1).toLocaleUpperCase() ?? ''} />
            </PopoverTrigger>
            {/* Conteúdo do popover */}
            <PopoverContent className="p-2 dark:bg-dark-background-950 bg-light-background-100 w-[120px] gap-1 hover:bg-light-background-100/hover">
                {/* Verifica se o usuário é um administrador */}
                {data?.user?.name === 'admin' &&
                    <div className="w-full flex-row justify-center items-center">
                        {/* Botão de acesso ao painel administrativo */}
                        <Button as={Link} href="/painel" className="flex-row justify-start items-center" variant="light" fullWidth>
                            <MdOutlineSpaceDashboard />
                            Painel
                        </Button>
                    </div>
                }
                {/* Botão de logout */}
                <div className="w-full flex-row justify-center items-center">
                    <Button onClick={() => signOut()} className="flex-row justify-start items-center" variant="light" fullWidth>
                        <VscSignOut />
                        Sair
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};
