'use client'

import { NextUIProvider } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"
import { AuthProvider } from "../../contexts/authContext"
import { CartProvider } from "../../contexts/cartContext"

export default function Providers({children}: {children: ReactNode}){
    const router = useRouter()

    return(
        <NextUIProvider navigate={router.push}>
            <AuthProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </AuthProvider>
        </NextUIProvider>
    )
}