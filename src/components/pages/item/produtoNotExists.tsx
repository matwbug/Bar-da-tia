import { Button, Link } from "@nextui-org/react";
import { PiSmileySad } from "react-icons/pi";

// Componente responsável por exibir uma mensagem quando o produto não existe
export const ProdutoNotExists = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 h-[300px]">
            <div className="flex flex-col gap-2 justify-center items-center">
                {/* Ícone de rosto triste */}
                <PiSmileySad size={80}/>
                {/* Título indicando que o produto não existe */}
                <h1 className="font-bold text-zinc-900">Esse produto não existe </h1>
            </div>
            {/* Botão para voltar à página inicial */}
            <Button as={Link} href="/" color="primary" variant="flat" fullWidth className="max-w-64">Voltar</Button>
        </div>
    );
};
