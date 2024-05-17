import { useCart } from "@/contexts/cart-context";
import { Button } from "@nextui-org/button";
import { Item } from "@prisma/client";
import { ShoppingCart } from "lucide-react";

export const ButtonAddCart = ({ produto }:{
    produto: Item
}) => {
    const { addCart } = useCart();

    return (
        <Button disabled={produto.status === 'DESATIVADO'} variant="flat" color="primary" className="max-w-96" fullWidth onClick={() => addCart({ item: produto, quantity: 1 })}> <ShoppingCart /> Adicionar</Button>
    )
}
