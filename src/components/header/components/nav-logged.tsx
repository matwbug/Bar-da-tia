import { Button } from "@nextui-org/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { LayoutDashboard, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

// Componente de navegação para usuários logados
export const NavLogged = () => {
    // Obtém os dados da sessão do usuário
    const { data } = useSession();

    return (
        <Popover>
            <PopoverTrigger className="cursor-pointer">
                <Image src={data?.user?.image || ''} alt="" />
            </PopoverTrigger>
            <PopoverContent className="p-2 dark:bg-dark-background-950 bg-light-background-100 w-[120px] gap-1 hover:bg-light-background-100/hover">
                {data?.user?.name === 'admin' &&
                    <div className="w-full flex-row justify-center items-center">
                        <Button as={Link} href="/painel" className="flex-row justify-start items-center" variant="light" fullWidth>
                            <LayoutDashboard />
                            Painel
                        </Button>
                    </div>
                }
                {/* Botão de logout */}
                <div className="w-full flex-row justify-center items-center">
                    <Button onClick={() => signOut()} className="flex-row justify-start items-center" variant="light" fullWidth>
                        <LogOut />
                        Sair
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};
