'use client'

import Logo from "@/app/components/Logo"
import { Button, Image, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { motion } from 'framer-motion'
import { GiCheckMark } from "react-icons/gi"
import { CiCircleCheck } from "react-icons/ci"

export const PaginaLogin = () => {
    const [email, setEmail] = React.useState("");
    const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isInvalid = React.useMemo(() => {
        if (email === "") {
            return "default";
        } else if (validateEmail(email)) {
            return "success";
        } else {
            return "danger";
        }
    }, [email]);

    return(
        <div className="w-full h-full flex-row flex">
            <motion.div 
                className="bg-login-gradient w-1/2 h-screen text-white rounded-sm flex flex-col justify-center items-center"
                initial={{ x: "-100vw" }}
                animate={{ x: 0  }}
                transition={{ type: "spring", stiffness: 200, duration: 0.1 }}
            >
                <div className="flex flex-col justify-center items-center gap-3">
                    <div className="flex flex-row items-end gap-1">
                        <h1 className="font-bebas text-7xl">BAR DA TIA</h1>
                        <Image 
                            src="/logo.png"
                            alt="Logo Bar da Tia"
                            width={100}
                            style={{objectFit: "cover"}}                    
                        />
                    </div>
                </div>
            </motion.div>
            <div className="w-1/2 h-screen text-black rounded-sm flex flex-col justify-center items-center px-5">
                <div className="w-[450px] py-8 px-5 rounded-md flex justify-center items-center flex-col gap-4 bg-light-background-50">
                    <p className="text-zinc-700 font-oswald text-lg">Informe o seu e-mail para continuar</p>
                    <div className="flex flex-col gap-3 w-full justify-center items-center">
                        <Input 
                            value={email}
                            type="email"
                            label="Email"
                            variant="bordered"
                            isInvalid={isInvalid === 'danger'}
                            color={email === '' ? "default" : isInvalid ? "danger" : "success"}
                            errorMessage={isInvalid && "Email inválido"}
                            onValueChange={setEmail}
                            className="max-w-[600px] w-full"
                            endContent={isInvalid === 'success' && <CiCircleCheck size={20} className="text-emerald-500  "/>}
                        />
                        <Button fullWidth color="primary" className="max-w-[600px]">Prosseguir</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}