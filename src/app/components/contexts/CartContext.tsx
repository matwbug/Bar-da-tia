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
    removeCart: (item: CartItemProps, quantity?: number) => void
    clearCart: () => void
}

const CartContext = createContext({} as CartContextProps)

export const CartProvider = ({children}: {
    children: ReactNode
}) => {

    const [cart, setCart] = useState<CartProps>({itens: [], total: 0})

    const addCart = ({ quantity, item }: CartItemProps) => {
        try {
            const existingItem = cart.itens.find(cartItem => cartItem.item.id === item.id);
    
            let updatedCart;
            if (existingItem) {
                // Se o item já existe no carrinho, atualize apenas a quantidade
                updatedCart = cart.itens.map(cartItem => {
                    if (cartItem.item.id === existingItem.item.id) {
                        return {
                            ...cartItem,
                            quantity: cartItem.quantity + quantity
                        };
                    }
                    return cartItem;
                });
            } else {
                // Se o item ainda não existe no carrinho, adicione-o
                updatedCart = [...cart.itens, { item, quantity }];
            }
    
            // Calcular o total novamente
            const total = updatedCart.reduce((acc, cartItem) => {
                return acc + cartItem.item.preco * cartItem.quantity;
            }, 0);
    
            // Atualizar o estado do carrinho e o total
            setCart({
                ...cart,
                itens: updatedCart,
                total: total
            });
            
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };
    
    const removeCart = ({ item, quantity }: CartItemProps) => {
        try {
            if (cart) {
                const existingItem = cart.itens.find(cartItem => cartItem.item.id === item.id);

                if (existingItem) {
                    // Verificando se o item existe no carrinho
                    if(quantity === 0){
                        // Caso a quantidade seja 0, o item será removido do carrinho
                        const updatedCart = cart.itens
                        .filter(produto => produto.item !== item) //Filtrando o item removido do array
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
                    }else{
                        const updatedCart = cart.itens
                        .map(cartItem => {
                            if(cartItem.item.id === item.id){
                                return {
                                    item: item,
                                    quantity: quantity // Retornando a quantidade correta atualizada
                                }
                            }
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
                } 
                throw Error('This item not exists your cart.');
                
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const clearCart = () => {
        setCart({itens: [], total: 0})
    }
    

    return(
        <CartContext.Provider value={{cart, addCart, clearCart, removeCart}}>
        {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}