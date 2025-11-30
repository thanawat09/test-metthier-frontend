import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useFiltersMeta } from "@/hooks/use-filters-meta";
import { usePagination } from "@/hooks/use-pagination";
import { cn } from "@/lib/utils";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    paginationItemsToDisplay?: number;
    className?: string;
};

export default function PaginationTable({
    currentPage,
    totalPages,
    paginationItemsToDisplay = 5,
    className,
}: PaginationProps) {
    const { limit, setLimit, setPage } = useFiltersMeta();

    const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
        currentPage,
        paginationItemsToDisplay,
        totalPages,
    });

    return (
        <div className={cn("flex items-center justify-between gap-3 ", className)}>
            {/* Page number information */}
            <p
                aria-live="polite"
                className="flex-1 whitespace-nowrap text-muted-foreground text-sm hidden md:block"
            >
                Page <span className="text-foreground">{currentPage}</span> of{" "}
                <span className="text-foreground">{totalPages}</span>
            </p>

            {/* Pagination */}
            <div className="grow">
                <Pagination>
                    <PaginationContent>
                        {/* Previous page button */}
                        <PaginationItem>
                            <PaginationLink
                                aria-disabled={currentPage === 1 ? true : undefined}
                                aria-label="Go to previous page"
                                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                                href={
                                    currentPage === 1 ? undefined : `#/page/${currentPage - 1}`
                                }
                                role={currentPage === 1 ? "link" : undefined}
                            >
                                <ChevronLeftIcon aria-hidden="true" size={16} />
                            </PaginationLink>
                        </PaginationItem>

                        {/* Left ellipsis (...) */}
                        {showLeftEllipsis && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {/* Page number links */}
                        {pages.map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    isActive={page === currentPage}
                                    onClick={() => setPage(page)}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {/* Right ellipsis (...) */}
                        {showRightEllipsis && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {/* Next page button */}
                        <PaginationItem>
                            <PaginationLink
                                aria-disabled={currentPage === totalPages ? true : undefined}
                                aria-label="Go to next page"
                                className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                                href={
                                    currentPage === totalPages
                                        ? undefined
                                        : `#/page/${currentPage + 1}`
                                }
                                role={currentPage === totalPages ? "link" : undefined}
                            >
                                <ChevronRightIcon aria-hidden="true" size={16} />
                            </PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            {/* Results per page */}
            <div className="flex flex-1 justify-end">
                <Select
                    aria-label="Results per page"
                    defaultValue={limit.toString()}
                    onValueChange={(value) => {
                        setLimit(Number(value));
                        setPage(1);
                    }}
                >
                    <SelectTrigger
                        className="w-fit whitespace-nowrap"
                        id="results-per-page"
                    >
                        <SelectValue placeholder="Select number of results" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5">5 / page</SelectItem>
                        <SelectItem value="10">10 / page</SelectItem>
                        <SelectItem value="20">20 / page</SelectItem>
                        <SelectItem value="50">50 / page</SelectItem>
                        <SelectItem value="100">100 / page</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
