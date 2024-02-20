'use client'

import { ReactNode, createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface AuthContextProps{
    isAuthenticated: boolean
    tokenSession: string
    // signIn: (data: any) => Promise<void>
    // signOut: (data: any) => void
}

interface ProfileUser{
    username: string,
    avatarUrl ?: string,
    role: "USER" | "ADMIN"
}

const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({children}: {
    children: ReactNode
}) => {
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [session, setSession] = useState(generateToken())

    function generateToken(){
        return uuidv4()
    }

    return(
        <AuthContext.Provider value={{ isAuthenticated: isAuthenticated, tokenSession: session }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}