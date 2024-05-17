/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { CartCardPopover } from "./cart-popover";
import { CartEmpty } from "./cart-empty";
import { useCart } from "@/contexts/cart-context";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";

// Componente responsável por exibir o carrinho na barra de navegação
export const CartNavbar = () => {
    // Obtém o estado do carrinho do contexto
    const { cart } = useCart();
    const [isOpen, setOpen] = useState(false); // Estado para controlar a abertura do popover
    const [firstRender, setFirstRender] = useState(true); // Estado para controlar a exibição do carrinho no primeiro render
    const [valorEconomizado, setValorEconomizado] = useState(0); // Estado para armazenar o valor economizado com descontos de atacado

    useEffect(() => {
        if (firstRender) {
            return setFirstRender(false); // Não exibe o carrinho quando for renderizado pela primeira vez
        }

        setOpen(true); // Abre o popover do carrinho
        setTimeout(() => {
            setOpen(false); // Fecha o popover após 1 segundo
        }, 1000); 
    }, [cart]);

    // Calcula o valor total economizado com descontos de atacado
    useEffect(() => {
        let newValue = cart.itens
            .filter(cart => cart.item.atacado)
            .map(item => {
                if (item.quantity >= item.item.atacadoMinQuantidade) {
                    let realPrice = item.item.preco * item.quantity;
                    let atacadoPrice = (item.item.preco - (item.item.preco * 0.25)) * item.quantity;
                    return realPrice - atacadoPrice;
                } else {
                    return 0; // Define 0 como valor padrão se não houver economia
                }
            })
            .reduce((total, valor) => total + valor, 0);

        setValorEconomizado(newValue);
    }, [cart]);

    return (
        <Popover placement="bottom" shadow="md" isOpen={isOpen}>
            {/* Disparador do popover do carrinho */}
            <PopoverTrigger className="cursor-pointer" onClick={() => setOpen(!isOpen)}>
                <div className="flex justify-center items-center flex-row relative">
                    <ShoppingCart className="text-light-primary-500" size={20}/>
                    {cart.itens.length > 0 && 
                    <span className="font-bold bg-light-primary-500 w-[20px] h-[20px] flex justify-center items-center rounded-full text-white absolute" style={{right: "-0.8rem", top: "-0.3rem"}}>
                        {cart.itens.length}
                    </span>
                    }
                </div>
            </PopoverTrigger>
            {/* Conteúdo do popover */}
            <PopoverContent className="p-1 dark:bg-dark-background-950 bg-light-background-100 w-[350px] gap-1">
                {/* Cabeçalho do carrinho */}
                <div className="w-full py-2 dark:bg-dark-background-950/100 bg-light-background-50/10 rounded-t-sm">
                    <span className="text-xl font-bebas font-semilbold flex flex-row justify-center items-center gap-2">
                        SEU CARRINHO
                    </span>
                </div>
                {/* Exibe os itens do carrinho ou uma mensagem de carrinho vazio */}
                {cart.itens.length > 0 
                    ? <div className="min-h-[80px] w-full max-h-[220px] overflow-y-auto flex flex-col justify-start items-start gap-4 py-2">
                        {cart.itens.map(item => (
                            <CartCardPopover 
                                key={`item_${item.item.id}`} 
                                item={item.item} 
                                quantity={item.quantity}
                            />
                        ))}
                    </div>
                    : <CartEmpty />
                }
                {/* Rodapé do carrinho */}
                <div className="flex flex-col justify-between items-center gap-2 w-full px-3 mt-2 bg-light-background-100 rounded-b-sm">
                    {/* Exibe o valor total do carrinho */}
                    <div className="flex flex-row justify-between items-end w-full">
                        <span className="font-normal">Total</span>
                        <span className="font-light font-bebas text-2xl text-right">
                            {cart.total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                        </span>
                    </div>
                    {/* Exibe o valor economizado com desconto de atacado se houver */}
                    {valorEconomizado > 0 &&
                        <Tooltip showArrow color={'foreground'} content={<span>Preço de atacado ativado</span>}>
                            <div className="flex gap-1 justify-center items-center w-full bg-emerald-500 p-1 rounded text-white">
                                <span className="text-left font-light">Você está economizando</span>
                                <span className="font-medium">{valorEconomizado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
                            </div>
                        </Tooltip>
                    }
                    {/* Botão para finalizar a compra */}
                    <Button variant="flat" fullWidth color="primary">Finalizar compra</Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};
