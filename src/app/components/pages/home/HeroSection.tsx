import { Image } from "@nextui-org/react"
import { CardProduto, produtoProps } from "./CardProduto"


export const listaProdutos: produtoProps[] = [
    {
        id: 1,
        name: "Cerveja Original 269ml",
        description: "A Cerveja Original 269ml é uma pilsen brasileira, com sabor refrescante.",
        image: "/cerveja-original.png",
        preco: 1.81,
        quantidade: 2,
        promocao_relampago: true,
        preco_atacado: false
    },
    {
        id: 2,
        name: "Cerveja Heineken 600ml",
        description: "A Heineken 600ml é uma cerveja lager premium originária da Holanda. Conhecida pelo seu sabor equilibrado, levemente amargo, e teor alcoólico em torno de 5%. Uma escolha popular para quem aprecia cervejas de qualidade.",
        image: "/cerveja-heineken.png",
        preco: 2.69,
        quantidade: 5,
        promocao_relampago: true,
        preco_atacado: true
    },
    {
        id: 3,
        name: "Salgadinho Fandangos 45g",
        description: "Salgadinho Fandangos de presunto (45g), snack crocante e salgado, é uma opção popular de petisco para acompanhar momentos de lazer.",
        image: "/salgadinho-fandangos.png",
        preco: 5,
        quantidade: 1,
        promocao_relampago: true,
        preco_atacado: false
    },
    {
        id: 4,
        name: "Refrigerante Coca Cola 350ml",
        description: "O refrigerante Coca-Cola 350ml é uma bebida refrescante e popular, conhecida por seu sabor único e distintivo. Embalada em uma garrafa de 350ml, oferece uma experiência de consumo refrescante e satisfatória.",
        image: "/cocacola-lata.png",
        preco: 3.69,
        quantidade: 1,
        promocao_relampago: true,
        preco_atacado: false
    },
]

export const HeroSection = () => {
    return(
        <section className="w-full mt-10">
            <div className="container flex flex-col items-start w-full gap-5">
                <h1 className="text-2xl text-pretty">Produtos em promoção 🔥</h1>
                <div className="flex flex-row gap-2 items-center justify-start flex-wrap sm:justify-center">
                    {listaProdutos
                    .filter(item => item.promocao_relampago) // Filtrando por apenas produtos em promoção
                    .map(item => { // Mapeando os produtos
                        return <CardProduto key={item.name} item={item} />
                    })}
                </div>
            </div>
            
        </section>
    )
}