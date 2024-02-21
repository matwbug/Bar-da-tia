'use client'

import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

export default function Home(){

    const { isAuthenticated } = useAuth()
    const { push } = useRouter()

    if(!isAuthenticated){
        return push('/login')
    }

    return(
       <>penis</>
    )
    
}