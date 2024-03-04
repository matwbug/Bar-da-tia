import { CategoriasSection } from "@/components/pages/home/categoriasSection";
import { FranquiasSection } from "@/components/pages/home/franquiasSection";
import { HeroSection } from "@/components/pages/home/heroSection";

/* eslint-disable react/no-unescaped-entities */
export default function Home(){
    return (
        <div className="container flex flex-col flex-1 gap-4 items-center">
            <CategoriasSection />
            <HeroSection />
            <FranquiasSection />
        </div>
    )
}