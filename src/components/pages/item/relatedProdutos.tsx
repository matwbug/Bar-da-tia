import { Image, Link } from "@nextui-org/react";
import { FaArrowDown, FaTruck } from "react-icons/fa";
import listaProdutos from "@/config/produtos.json";
import { CardProduto, produtoProps } from "../home/cardProduto";

// Componente para exibir produtos relacionados ao produto atual
export const RelatedProdutos = ({produto}: {
    produto: produtoProps
}) => {
    return (
        <div className="flex flex-col justify-center items-start gap-6 w-full">
            {/* Título indicando que são produtos relacionados */}
            <h1 className="font-bold text-zinc-800">Produtos relacionados</h1>
            <div className="flex flex-row gap-2 justify-start items-center flex-wrap">
                {/* Mapeamento dos produtos relacionados */}
                {listaProdutos
                    // Filtragem para excluir o produto atual da lista de relacionados
                    .filter(item => item.id !== produto.id)
                    .map((item, index) => {
                        // Limitando o número de produtos relacionados a serem exibidos
                        if(index > 5) return null;
                        // Renderização de cada produto relacionado usando o componente CardProduto
                        return <CardProduto key={item.name} item={item} />;
                    })}
            </div>
        </div>
    );
};
