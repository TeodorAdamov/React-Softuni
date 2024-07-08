import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/ui/pagination"

type PaginationProps = {
    startIndex: number;
    endIndex: number;
    productsPerPage: number;
    productsLength: number;
    startIndexHandler: (i: number) => void;
    endIndexHandler: (i: number) => void;
}

const CardPagination = ({
    startIndex,
    startIndexHandler,
    endIndex, endIndexHandler,
    productsPerPage,
    productsLength }: PaginationProps) => {
    return (
        <Pagination className="self-end">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious className={startIndex === 0 ? 'pointer-events-none opacity-50' : ''}
                        onClick={() => {
                            startIndexHandler(startIndex - productsPerPage);
                            endIndexHandler(endIndex - productsPerPage);
                        }} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext className={endIndex >= productsLength ? 'pointer-events-none opacity-50' : ''}
                        onClick={() => {
                            startIndexHandler(startIndex + productsPerPage);
                            endIndexHandler(endIndex + productsPerPage);
                        }} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default CardPagination