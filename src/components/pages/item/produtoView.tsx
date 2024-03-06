import { Button, Divider, Image, Skeleton } from "@nextui-org/react";
import { CardProduto, produtoProps } from "../home/cardProduto";
import { CiDiscount1 } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { RelatedProdutos } from "./relatedProdutos";
import { useCart } from "@/contexts/cartContext";
import { MdBlock, MdOutlineAppBlocking } from "react-icons/md";

export const ProdutoView = ({ produto, isLoading }: {
    produto?: produtoProps
    isLoading: boolean
}) => {
    const { addCart } = useCart();

    return (
        <main className="flex flex-col container items-center gap-8">
            <div className="relative bg-light-background-200/50 w-full rounded-md flex p-6 items-center justify-center flex-col gap-5 lg:flex-row h-96 max-lg:h-fit">
                {!isLoading && produto && ( // Verifica se os dados não estão carregando e se o produto está definido
                    <>
                        {produto.status === 'DESATIVADO' &&
                            <div className="z-50 absolute top-0 left-0 w-full h-full bg-light-background-200/[0.7] flex flex-col justify-center items-center gap-4">
                                <MdOutlineAppBlocking size={100} />
                                <p className="text-2xl font-bold">ITEM DESATIVADO</p>
                            </div>
                        }
                        <div className="w-80 h-80 p-5 flex justify-center items-center">
                            <Image
                                src={produto.image}
                                alt={produto.name}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="flex flex-col gap-5 max-w-[700px]">
                            <div className="flex flex-col justify-start gap-3">
                                <p className="font-normal font-bebas text-2xl">{produto.name}</p>
                                <span className="font-light text-gray-800">{produto.description}</span>
                            </div>
                            <div className="flex flex-row gap-6 items-center justify-start ">
                                {produto.atacado &&
                                    <div className="flex flex-col gap-1 justify-start">
                                        <span className="text-emerald-400 font-medium text-xl">{(produto.preco - (produto.preco * 0.05)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                        <span className="text-tiny bg-emerald-400 p-1 rounded font-light text-white">A PARTIR DE {produto.atacado_minquantidade} UN</span>
                                    </div>}
                                <div className="flex flex-col gap-1 justify-start">
                                    <span className="font-medium text-xl">{(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                    <span className="text-tiny py-1 rounded text-gray-600 font-light">PREÇO UNITÁRIO</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <span className="flex flex-row gap-1 text-gray-800 items-center justify-start"> <CiDiscount1 size={20} /> Desconto aplicado no momento da compra no carrinho</span>
                                <Button disabled={produto.status === 'DESATIVADO'} variant="flat" color="primary" className="max-w-96" fullWidth onClick={() => addCart({ item: produto, quantity: 1 })}><FaCartShopping /> Adicionar</Button>
                            </div>
                        </div>
                        
                    </>
                )}
                {isLoading && ( // Renderiza o esqueleto se os dados estiverem carregando
                    <>
                        <Skeleton>
                            <div className="w-80 h-80 p-5 flex justify-center items-center">
                                <Image
                                    src=""
                                    alt=""
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </Skeleton>
                        <Skeleton>
                            <div className="flex flex-col gap-5 w-[700px] h-80">
                                <div className="flex flex-col justify-start gap-3">
                                    <p className="font-normal font-bebas text-2xl">{'Lorem Ipsum'}</p>
                                    <span className="font-light text-gray-800">{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}</span>
                                </div>
                                <div className="flex flex-row gap-6 items-center justify-start ">
                                    <div className="flex flex-col gap-1 justify-start">
                                        <span className="text-emerald-400 font-medium text-xl">{'R$ 99,99'}</span>
                                        <span className="text-tiny bg-emerald-400 p-1 rounded font-light text-white">{'A PARTIR DE 10 UN'}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 justify-start">
                                        <span className="font-medium text-xl">{'R$ 99,99'}</span>
                                        <span className="text-tiny py-1 rounded text-gray-600 font-light">{'PREÇO UNITÁRIO'}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="flex flex-row gap-1 text-gray-800 items-center justify-start"> <CiDiscount1 size={20} /> Desconto aplicado no momento da compra no carrinho</span>
                                    <Button disabled={true} variant="flat" color="primary" className="max-w-96" fullWidth><FaCartShopping /> Adicionar</Button>
                                </div>
                            </div>
                        </Skeleton>
                    </>
                )}
            </div>
            <RelatedProdutos produtoId={produto?.id} isLoading={isLoading} />
        </main>
    )
}
