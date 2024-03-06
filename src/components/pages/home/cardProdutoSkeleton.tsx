import { Button, Link, Skeleton } from "@nextui-org/react";
import { MdAddShoppingCart } from "react-icons/md";

export const CardProdutoSkeleton = ({ length }: { length: number }) => {
    const skeletons = [];
    
    for (let index = 0; index < length; index++) {
        skeletons.push(
            <div key={index} className="bg-light-background-50 hover:bg-light-background-100 shadow-md w-[19%] min-w-[200px]">
                <Skeleton>
                    <div className="duration-200 ease-in-out
                    flex flex-col gap-4 justify-center items-center rounded-md p-4 w-full h-64"
                    >
                        <div className="w-[100%] h-[50%] flex items-center justify-center">
                            
                        </div>
                        <div className="flex flex-col gap-2 justify-center w-full">
                        </div>
                    </div>
                    <div className={`shadow-md min-h-10 items-end flex flex-row z-50 bg-light-background-50 rounded-md w-full`}>
                        <Button 
                            fullWidth 
                            w-full 
                            className={`bg-transparent w-full `} 
                            isIconOnly 
                        >
                            <MdAddShoppingCart size={20} className="text-red-600"/>
                        </Button>
                    </div>
                </Skeleton>
            </div>
        );
    }
    return skeletons;
}
