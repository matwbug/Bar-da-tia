'use client'

import { NextUIProvider } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"
import { CartProvider } from "../../contexts/cartContext"
import NextAuthSessionProvider from "@/providers/sessionProvider"
import AlertAuthor from "@/providers/alertAuthor"

export default function Providers({children}: {children: ReactNode}){
    const router = useRouter()

    return(
        <NextUIProvider navigate={router.push}>
            <AlertAuthor>
                <NextAuthSessionProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </NextAuthSessionProvider>
            </AlertAuthor>
        </NextUIProvider>
    )
}