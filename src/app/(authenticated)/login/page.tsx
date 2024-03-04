'use client' // Define que este arquivo deve ser executado apenas no lado do cliente

// Importa o componente PaginaLogin do diretório específico
import { PaginaLogin } from "@/components/pages/login/paginaLogin"

// Define a função do componente LoginIndex
export default function LoginIndex(){
    return <PaginaLogin /> // Renderiza o componente PaginaLogin
}
