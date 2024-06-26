import React, { useState } from "react";
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

// Página de login
export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setValid] = useState<'default' | 'error' | 'success'>('default');
    const { push } = useRouter();
    const { data } = useSession();

    // Função para lidar com o envio do formulário de login
    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!/^[a-zA-Z0-9]+(?:[_-]?[a-zA-Z0-9]+)*$/.test(username) && password.length < 3) return null

        // Realiza o login usando as credenciais fornecidas
        const result = await signIn('credentials', {
            username, 
            password,
            redirect: false
        });

        // Verifica se o login foi bem-sucedido
        if(result?.ok){
            setValid('success');  

            // Redireciona para a página adequada com base no tipo de usuário
            if(data?.user?.name === 'admin'){
                push('/painel/');
            } else {
                push('/');
            }
        } else {
            setValid('error');
        }
    };

    return (
        <div className="w-full h-full flex-row flex">
            {/* Div para a área de login com o fundo gradiente */}
            <motion.div 
                className="bg-login-gradient w-1/2 h-screen text-white rounded-sm flex flex-col justify-center items-center max-lg:hidden"
                initial={{ x: "-100vw" }}
                animate={{ x: 0  }}
                transition={{ type: "spring", stiffness: 200, duration: 0.1 }}
            >
                <div className="flex flex-col justify-center items-center gap-3">
                    {/* Título e logo do aplicativo */}
                    <div className="flex flex-row items-end gap-1">
                        <h1 className="font-bebas text-7xl">BAR DA TIA</h1>
                        <Image 
                            src="/logo.png"
                            alt="Logo Bar da Tia"
                            width={100}
                        />
                    </div>
                </div>
            </motion.div>
            {/* Div para o formulário de login */}
            <div className="w-1/2 max-lg:w-full h-screen text-black rounded-sm flex flex-col justify-center items-center px-5 gap-5">
                <div className="flex-row items-end justify-center gap-1 hidden max-lg:flex duration-200 ease-in-out w-full">
                    <h1 className="font-bebas text-7xl">BAR DA TIA</h1>
                    <div className="w-28 h-28 justify-center items-center">
                        <Image 
                            src="/logo.png"
                            alt="Logo Bar da Tia"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div className="w-[450px] py-8 px-5 rounded-md flex justify-center items-center flex-col gap-4 bg-light-background-50">
                    <p className="text-zinc-700 font-oswald text-lg">Informe seus dados para continuar</p>
                    {/* Formulário de login */}
                    <form className="w-full flex flex-col gap-3 justify-center items-center" onSubmit={handleSubmitLogin}>
                        {isValid === 'error' && <span className="text-danger-500 text-tiny">Nome de usuário ou senha inválidos, verifique se está informando os dados corretos</span>}
                        <div className="flex flex-col gap-1 w-full justify-center items-center">
                            {/* Input para o nome de usuário */}
                            <Input 
                                value={username}
                                onValueChange={setUsername}
                                type="text"
                                label="Usuário"
                                variant="bordered"
                                color={'default'}
                                className="max-w-[600px] w-full"
                            />
                            {/* Input para a senha */}
                            <Input 
                                value={password}
                                onValueChange={setPassword}
                                type="password"
                                label="Senha"
                                variant="bordered"
                                color={'default'}
                                className="max-w-[600px] w-full"
                            />
                        </div>
                        {/* Botão de envio do formulário */}
                        <Button fullWidth type="submit" color="primary" className="max-w-[600px]">Prosseguir</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};
