'use client'

import { ReactNode, createContext, useContext, useState } from "react";
import { produtoProps } from "../pages/home/CardProduto";
import { useAuth } from "./AuthContext";
import { listaProdutos } from "../pages/home/HeroSection";

interface CartProps{
    total: number
    itens: CartItemProps[]
}

interface CartItemProps{
    item: produtoProps
    quantity: number
}

interface CartContextProps{
    cart: CartProps
    addCart: (item: CartItemProps) => void
    removeCart: (item: CartItemProps) => void
    editCart: (item: CartItemProps, quant: number) => void
    clearCart: () => void
}

const CartContext = createContext({} as CartContextProps)

export const CartProvider = ({children}: {
    children: ReactNode
}) => {

    const [cart, setCart] = useState<CartProps>({itens: [{item: listaProdutos[0], quantity: 1 }, {item: listaProdutos[1], quantity: 1 }, {item: listaProdutos[1], quantity: 1 }, {item: listaProdutos[1], quantity: 1 }, {item: listaProdutos[1], quantity: 1 }], total: 0})

    const addCart = ({ quantity, item }: CartItemProps) => {
        try {
            if (cart) {
                const existingItem = cart.itens.find(cartItem => cartItem.item.id === item.id);

                if (existingItem) {
                    // Se o item já existe no carrinho, atualize apenas a quantidade
                    const updatedCart = cart.itens.map(cartItem => {
                        if (cartItem.item.id === existingItem.item.id) {
                            return {
                                ...cartItem,
                                quantity: cartItem.quantity + quantity
                            };
                        }
                        return cartItem;
                    });
                    setCart({
                        ...cart,
                        itens: updatedCart
                    });
                } else {
                    // Se o item ainda não existe no carrinho, adicione-o
                    setCart({
                        ...cart,
                        itens: [...cart.itens, { item, quantity }]
                    });
                }

                // Calcular o total novamente
                const total = cart.itens.reduce((acc, cartItem) => {
                    return acc + cartItem.item.preco * cartItem.quantity;
                }, 0);
                setCart({
                    ...cart,
                    total: total
                });
            }
            
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const removeCart = ({ item }: CartItemProps) => {
        try {
            if (cart) {
                const existingItem = cart.itens.find(cartItem => cartItem.item.id === item.id);

                if (existingItem) {
                    // Verificando se o item existe no carrinho
                    const updatedCart = cart.itens
                    .filter(produto => produto.item !== item)
                    .map(cartItem => {
                        return cartItem
                    });

                    // Calcular o total novamente
                    const total = updatedCart.reduce((acc, cartItem) => {
                        return acc + cartItem.item.preco * cartItem.quantity;
                    }, 0);

                    setCart({
                        itens: [...updatedCart],
                        total: total
                    });
                } 
                throw Error('This item not exists your cart.');
                
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const editCart = (item: CartItemProps, quantity: number) => {
        
    }

    const clearCart = () => {
        setCart({itens: [], total: 0})
    }
    

    return(
        <CartContext.Provider value={{cart, addCart, clearCart, removeCart, editCart}}>
        {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}