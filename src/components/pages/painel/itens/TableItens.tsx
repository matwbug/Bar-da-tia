'use client'

import { 
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    CircularProgress,
    SortDescriptor
} from "@nextui-org/react"
import { columns, renderCell } from "./components/columns"
import { useCallback, useEffect, useMemo, useState } from "react"
import { produtoProps } from "../../home/cardProduto"
import { ModalEditProduto } from "../home/modalEditProduto"
import { TableItensBottomContent, TableItensTopContent } from "./components/contents"

export const TableItens = ({produtos}: {
    produtos: produtoProps[]
}) => {
    const [loading, setLoading] = useState(false)
    const [produto, setProduto] = useState<produtoProps>()
    const [modalOpen, setModalOpen] = useState(false)
    const [itens, setItens] = useState<produtoProps[]>(produtos)

    const [filterValue, setFilterValue] = useState('')
    const hasSearchFilter = Boolean(filterValue)

    useEffect(() => {
        let newItens = produtos.map(item => {
            if(produto && item.id === produto.id){
                return produto
            }
            return item
        })
        setItens(newItens)
    }, [produtos, produto])


    const filteredItems = useMemo(() => {
        let filteredItems = [...itens]
        
        if(hasSearchFilter){
            filteredItems = filteredItems.filter(item => 
                item.name.toLowerCase().includes(filterValue.toLowerCase())
            )
        }
        return filteredItems
    }, [itens, filterValue, hasSearchFilter])

    const [page, setPage] = useState(1)
    const rowsPerPage = 9

    const pages = Math.ceil(filteredItems.length / rowsPerPage)

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage

        return filteredItems.slice(start, end)
    }, [page, filteredItems])

    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: 'id',
        direction: 'descending'
    })

    const sortedItens = useMemo(() => {
        return [...items].sort((a: produtoProps, b: produtoProps) => {
            const first = a[sortDescriptor.column as keyof produtoProps]
            const second = b[sortDescriptor.column as keyof produtoProps]
            if(!first || !second) return -1
            const cmp = first < second ? -1 : first > second ? 1 : 0
            
            return sortDescriptor.direction === 'descending' ? -cmp : cmp
        })
    }, [sortDescriptor, items])

    const onSearchChange = useCallback((value?: string) => {
        if(value){
            setFilterValue(value)
            setPage(1)
        }else{
            setFilterValue('')
        }
    }, [])

    const onClear = useCallback(() => {
        setFilterValue('')
        setPage(1)
    }, [])

    return(<>
        {
            produto &&
            <ModalEditProduto 
                produto={produto}
                setProduto={setProduto}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                itens={itens}
                setItens={setItens}
            />
        }
        {
            loading && <div className="absolute top-0 left-0 w-full h-full bg-light-background-100/[0.5] flex justify-center items-center" style={{zIndex: 100}}>
                <CircularProgress aria-label="Carregando..." size="lg" />
            </div>
        }
        <Table
            aria-label="Tabela de produtos"
            topContent={<TableItensTopContent filterValue={filterValue} onClear={onClear} onSearchChange={onSearchChange} />}
            bottomContent={<TableItensBottomContent page={page} pages={pages} setPage={setPage} />}
            bottomContentPlacement="inside"
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            className="max-h-[100%]"
        >
            <TableHeader columns={columns}>
                {(column) => 
                    <TableColumn 
                        key={column.key}
                        {...(column.sortable ? {allowsSorting: true}: {})}
                    >{column.label}
                    </TableColumn>
                }
            </TableHeader>
            <TableBody 
                items={sortedItens}
                emptyContent="Nenhum produto encontrado"
            >
                {(item) => (
                    <TableRow key={`${item.id}`}>
                    {(columnKey) => <TableCell key={columnKey}>{renderCell(item, columnKey, setProduto, setModalOpen, setLoading)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </>)
}