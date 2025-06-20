import { useMemo, type PropsWithChildren } from "react"
import { MdLocalPrintshop as PrintIcon } from "react-icons/md"
import { Pagination, getPagesFromTotal } from "../Pagination"
import { PAGINATION } from "../../config"
import type { Pagination as PaginationProps } from "../../types"
import { Control } from "../ui"

type PaginatedTableProps = PropsWithChildren & {
  pagination: PaginationProps & {
    onSelectPage: (number: number) => void
    onSelectLimit: (limit: number) => void
  }
  isLoading: boolean
}

export default function PaginatedTable({
  children,
  isLoading,
  pagination: {
    total,
    currentPage,
    limit,
    hasNext,
    hasPrevious,
    onSelectPage,
    onSelectLimit,
  },
}: PaginatedTableProps) {
  // Note: Allows using custom limit number, setting through the URL query params
  const memorizedLimit = useMemo(
    () => [...new Set([...PAGINATION.LIMITS, limit].sort((a, b) => a - b))],
    [limit],
  )

  console.log("memorizedLimit", memorizedLimit)

  return (
    <div className="flex flex-col grow overflow-hidden print:overflow-visible">
      {children}
      {total > 1 && (
        <div className="hidden print:block px-6 py-4">{`${currentPage} of ${total}`}</div>
      )}
      <div className="flex flex-wrap gap-4 my-4 px-6 justify-between print:hidden">
        <div className="flex gap-2">
          <Control
            disabled={isLoading}
            title="Print"
            className={
              "shadow-[0_0_0_0.03125rem_#222_inset] text-[0.875rem] text-secondary bg-primary hover:bg-[#333] hover:text-white hover:cursor-pointer"
            }
            onClick={window.print}
          >
            <PrintIcon className="text-lg" />
          </Control>
          <Pagination
            label={`Display items per page, current value ${limit}`}
            current={limit}
            total={total}
            itemLabelMessage="Display items per page"
            arrayFromArg={memorizedLimit}
            onSelect={onSelectLimit}
          />
        </div>
        <Pagination
          displayNavigation
          label={`Pagination, current page ${currentPage}`}
          current={currentPage}
          arrayFromArg={getPagesFromTotal(total)}
          total={total}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          onSelect={onSelectPage}
        />
      </div>
    </div>
  )
}
