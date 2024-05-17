import { Input } from "@nextui-org/input"
import { Search } from "lucide-react"
import { Pagination } from '@nextui-org/pagination'

// Componente para o conteúdo superior da tabela, incluindo barra de busca
export const TableItensTopContent = ({filterValue, onClear, onSearchChange}: {
    filterValue: string, 
    onClear: () => void
    onSearchChange: (value?: string) => void
}) => {
    return(
        <div className="flex flex-col gap-4">
            <Input 
                isClearable
                className="w-full sm:max-w-[44%]"
                placeholder="Procure pelo item..."
                startContent={<Search />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
            />
        </div>
    )
}

// Componente para o conteúdo inferior da tabela, incluindo paginação
export const TableItensBottomContent = ({page, pages, setPage}: {
    page: number
    pages: number
    setPage: (page: number) => void
}) => {

    return(
        <div className="flex w-full justify-center">
            <Pagination 
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                hidden={pages === 1}
                onChange={(page) => setPage(page)}   
            />
        </div>
    )
}
