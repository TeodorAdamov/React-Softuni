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
    productsLength: number;
    handlePrevious: () => void;
    handleNext: () => void;
}

const CardPagination = ({
    startIndex,
    handlePrevious,
    endIndex,
    handleNext,
    productsLength }: PaginationProps) => {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious className={startIndex === 0 ? 'pointer-events-none opacity-50' : ''}
                        onClick={handlePrevious} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext className={endIndex >= productsLength ? 'pointer-events-none opacity-50' : ''}
                        onClick={handleNext} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default CardPagination