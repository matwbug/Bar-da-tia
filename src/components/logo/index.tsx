import { Button, Image, Link } from "@nextui-org/react";

export const Logo = ({variant = "normal", href = '/'}: {
    variant?: "normal" | "withName"
    href?: string
}) =>{
    return(
        <Link href={href}>
            <div className="flex flex-row space-x-1 cursor-pointer justify-center items-end">
                <Image 
                    src="/logo.png"
                    alt="Logo Bar da Tia"
                    width={35}
                    style={{objectFit: "cover"}}                    
                />
                {variant === "withName" && <p className="font-bold text-black dark:text-white font-bebas text-xl">BAR DA TIA</p>}
            </div>
        </Link>
    )
}