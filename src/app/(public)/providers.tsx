'use client'

import { NextUIProvider } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"
import { CartProvider } from "../../contexts/cartContext"
import NextAuthSessionProvider from "@/providers/sessionProvider"

export default function Providers({children}: {children: ReactNode}){
    const router = useRouter()

    return(
        <NextUIProvider navigate={router.push}>
            <NextAuthSessionProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </NextAuthSessionProvider>
        </NextUIProvider>
    )
}