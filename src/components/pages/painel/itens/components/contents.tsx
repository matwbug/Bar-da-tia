import { Input, Pagination } from "@nextui-org/react"
import { BiSearch } from "react-icons/bi"

export const TableItensTopContent = ({filterValue, onClear, onSearchChange}: {
    filterValue: string, 
    onClear: () => void
    onSearchChange: (value?: string) => void

}) => {
    return(
        <div className="flex flex-col gap-4">
            <div>
                <Input 
                    isClearable
                    className="w-full sm:max-w-[44%]"
                    placeholder="Procure pelo item..."
                    startContent={<BiSearch />}
                    value={filterValue}
                    onClear={() => onClear()}
                    onValueChange={onSearchChange}
                />
            </div>

        </div>
    )
}

export const TableItensBottomContent = ({page, pages, setPage}: {
    page: number
    pages: number
    setPage: (page: number) => void
}) => {
    return(
        <div className="flex w-full justify-center">
            <Pagination 
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                hidden={pages <= 1}
                onChange={(page) => setPage(page)}   
            />
        </div>
    )
}