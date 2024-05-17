
import { SectionCategorias } from "./components/section-categorias";
import { SectionFeaturedItens } from "./components/section-featured-itens";
import { FranquiasSection } from "./components/section-franquias";

export default function Home(){
    return (
        <div className="container flex flex-col flex-1 gap-4 items-center"> {/* Define o container principal */}
            <SectionCategorias /> 
            <SectionFeaturedItens /> {/* Renderiza o componente HeroSection para exibir a seção de herói */}
            <FranquiasSection /> {/* Renderiza o componente FranquiasSection para exibir as franquias */}
        </div>
    )
}
