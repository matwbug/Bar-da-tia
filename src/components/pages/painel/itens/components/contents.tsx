import { Input, Pagination } from "@nextui-org/react"; // Importa componentes de input e paginação do Next UI
import { BiSearch } from "react-icons/bi"; // Importa ícone de busca do React

// Componente para o conteúdo superior da tabela, incluindo barra de busca
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

// Componente para o conteúdo inferior da tabela, incluindo paginação
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
