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
} from "@nextui-org/react"  // Importa os componentes de tabela do Next UI
import { columns, renderCell } from "./components/columns"  // Importa as colunas e a função para renderizar as células da tabela
import { useCallback, useEffect, useMemo, useState } from "react"  // Importa hooks do React
import { produtoProps } from "../../home/cardProduto"  // Importa o tipo de propriedade do produto
import { ModalEditProduto } from "../home/modalEditProduto"  // Importa o componente ModalEditProduto
import { TableItensBottomContent, TableItensTopContent } from "./components/contents"  // Importa componentes de conteúdo da tabela

// Componente TableItens
export const TableItens = ({produtos}: {
    produtos: produtoProps[]
}) => {
    // Estados para controle de carregamento, produto selecionado, abertura do modal e itens da tabela
    const [loading, setLoading] = useState(false)
    const [produto, setProduto] = useState<produtoProps>()
    const [modalOpen, setModalOpen] = useState(false)
    const [itens, setItens] = useState<produtoProps[]>(produtos)

    // Estado para filtro de busca
    const [filterValue, setFilterValue] = useState('')
    const hasSearchFilter = Boolean(filterValue)

    // Efeito para atualizar os itens quando houver mudança nos produtos
    useEffect(() => {
        let newItens = produtos.map(item => {
            if(produto && item.id === produto.id){
                return produto
            }
            return item
        })
        setItens(newItens)
    }, [produtos, produto])

    // Função para filtrar os itens com base no valor de busca
    const filteredItems = useMemo(() => {
        let filteredItems = [...itens]
        
        if(hasSearchFilter){
            filteredItems = filteredItems.filter(item => 
                item.name.toLowerCase().includes(filterValue.toLowerCase())
            )
        }
        return filteredItems
    }, [itens, filterValue, hasSearchFilter])

    // Estado para controle da página atual e número de itens por página
    const [page, setPage] = useState(1)
    const rowsPerPage = 9

    // Cálculo do número de páginas com base nos itens filtrados
    const pages = Math.ceil(filteredItems.length / rowsPerPage)

    // Seleção dos itens para exibir na página atual
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage

        return filteredItems.slice(start, end)
    }, [page, filteredItems])

    // Estado e função para controle da ordenação da tabela
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: 'id',
        direction: 'descending'
    })

    // Ordenação dos itens com base no descritor de ordenação
    const sortedItens = useMemo(() => {
        return [...items].sort((a: produtoProps, b: produtoProps) => {
            const first = a[sortDescriptor.column as keyof produtoProps]
            const second = b[sortDescriptor.column as keyof produtoProps]
            if(!first || !second) return -1
            const cmp = first < second ? -1 : first > second ? 1 : 0
            
            return sortDescriptor.direction === 'descending' ? -cmp : cmp
        })
    }, [sortDescriptor, items])

    // Função de callback para alterar o valor do filtro de busca
    const onSearchChange = useCallback((value?: string) => {
        if(value){
            setFilterValue(value)
            setPage(1)
        }else{
            setFilterValue('')
        }
    }, [])

    // Função de callback para limpar o filtro de busca
    const onClear = useCallback(() => {
        setFilterValue('')
        setPage(1)
    }, [])

    // Retorno do componente de tabela com os elementos e configurações definidos
    return(<>
        {
            // Renderização do modal de edição de produto se um produto estiver selecionado
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
            // Renderização do indicador de carregamento se o estado de loading estiver ativado
            loading && <div className="absolute top-0 left-0 w-full h-full bg-light-background-100/[0.5] flex justify-center items-center" style={{zIndex: 100}}>
                <CircularProgress aria-label="Carregando..." size="lg" />
            </div>
        }
        {/* Componente de tabela com configurações e conteúdos definidos */}
        <Table
            aria-label="Tabela de produtos"
            topContent={<TableItensTopContent filterValue={filterValue} onClear={onClear} onSearchChange={onSearchChange} />}
            bottomContent={<TableItensBottomContent page={page} pages={pages} setPage={setPage} />}
            bottomContentPlacement="inside"
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            className="max-h-[100%]"
        >
            {/* Cabeçalho da tabela */}
            <TableHeader columns={columns}>
                {(column) => 
                    <TableColumn 
                        key={column.key}
                        {...(column.sortable ? {allowsSorting: true}: {})}
                    >{column.label}
                    </TableColumn>
                }
            </TableHeader>
            {/* Corpo da tabela */}
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
