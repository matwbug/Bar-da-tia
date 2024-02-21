import { validUsers } from "@/config/users";
import { createSession, getSession } from "@/lib/auth";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface AuthContextProps{
    isAuthenticated: boolean
    session?: SessionProps
    signIn: (data: {username: string, password: string}) => Promise<'success' | 'error'>
    signOut: () => void
}

interface ProfileUser{
    username: string,
    role: "USER" | "ADMIN"
}

interface SessionProps{
    token: any
    user?: ProfileUser
}

const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({children}: {
    children: ReactNode
}) => {
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [session, setSession] = useState<SessionProps>()

    function generateToken(){
        return uuidv4() 
    }

    async function signIn({ username, password }: { 
        username: string, password: string 
      }): Promise<'success' | 'error'> {
        const validUser = validUsers.find(item => item.username === username && item.password === password);
      
        if (validUser) {
            setAuthenticated(true);
            createSession({ username });
            'use server'
            setSession({ token: getSession(), user: { username: validUser.username, role: validUser.role } });
        
            return 'success';
        } else {
            return 'error';
        }
    };
      

    const signOut = () => {
        setAuthenticated(false)
        setSession({token: session?.token})
    }
    

    return(
        <AuthContext.Provider value={{ isAuthenticated, session, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}