
import { CategoriasSection } from "@/components/pages/home/categoriasSection"; // Importa o componente CategoriasSection do diretório específico
import { FranquiasSection } from "@/components/pages/home/franquiasSection"; // Importa o componente FranquiasSection do diretório específico
import { HeroSection } from "@/components/pages/home/heroSection"; // Importa o componente HeroSection do diretório específico


// Define o componente Home
export default function Home(){
    return (
        <div className="container flex flex-col flex-1 gap-4 items-center"> {/* Define o container principal */}
            <CategoriasSection /> {/* Renderiza o componente CategoriasSection para exibir as categorias */}
            <HeroSection /> {/* Renderiza o componente HeroSection para exibir a seção de herói */}
            <FranquiasSection /> {/* Renderiza o componente FranquiasSection para exibir as franquias */}
        </div>
    )
}
