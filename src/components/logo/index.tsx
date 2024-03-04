import { Button, Image, Link } from "@nextui-org/react"; // Importa os componentes Button, Image e Link do NextUI

// Componente funcional Logo que exibe o logotipo do "Bar da Tia"
export const Logo = ({variant = "normal", href = '/'}: {
    variant?: "normal" | "withName" // Define o tipo de variante do logotipo
    href?: string // Define o link de destino do logotipo
}) =>{
    return(
        <Link href={href}> {/* Componente de link que envolve o logotipo */}
            <div className="flex flex-row space-x-1 cursor-pointer justify-center items-end"> {/* Container flexível para o logotipo */}
                <Image 
                    src="/logo.png" // Define a origem da imagem como o arquivo "logo.png"
                    alt="Logo Bar da Tia" // Define o texto alternativo para a imagem
                    width={35} // Define a largura da imagem como 35 pixels
                    style={{objectFit: "cover"}} // Aplica um estilo para o ajuste da imagem
                />
                {/* Condicionalmente renderiza o nome do bar se a variante for "withName" */}
                {variant === "withName" && <p className="font-bold text-black dark:text-white font-bebas text-xl">BAR DA TIA</p>}
            </div>
        </Link>
    )
}
