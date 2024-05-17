import { ItemCard } from "@/app/components/item-card";
import { Item } from "@prisma/client";

export const RelatedItens = () => {
  const produtos: Item[] = []

  return (
      <div className="flex flex-col justify-center items-start gap-6 w-full max-lg:text-center max-lg:items-center">
          {/* Título indicando que são produtos relacionados */}
          <h1 className="font-bold text-zinc-800">Produtos relacionados</h1>
          <div className="flex flex-row gap-3 justify-start items-center flex-wrap w-full max-lg:justify-center">
          {produtos.map(item => { // Mapeando os produtos e renderizando cada um deles
              return <ItemCard key={item.name} item={item} />
          })}
          </div>
      </div>
  );
};
