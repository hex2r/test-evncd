import { MdNavigateNext, MdNavigateBefore } from "react-icons/md"
import { Control } from "../ui"
import clt from "../../utils/getClassList"

type PaginationProps = {
  label?: string
  current: number
  arrayFromArg: number[]
  total: number
  hasNext?: boolean
  hasPrevious?: boolean
  itemLabelMessage?: string
  displayNavigation?: boolean
  onSelect: (num: number) => void
}

export default function Pagination({
  label = "Pagination",
  itemLabelMessage = "Go to page",
  current,
  arrayFromArg,
  hasNext,
  hasPrevious,
  total,
  displayNavigation = false,
  onSelect,
}: PaginationProps) {
  const handleSelect = (num: number) => {
    return () => {
      onSelect(num)
    }
  }

  return (
    <nav className="flex flex-wrap items-center gap-2" aria-label={label}>
      {displayNavigation && total > 1 && (
        <div className="flex">
          <Control
            disabled={!hasPrevious}
            title="Previous"
            className={clt(
              "shadow-[0_0_0_0.03125rem_#222_inset] text-[0.875rem]",
              hasPrevious
                ? "text-secondary hover:bg-[#333] hover:text-white hover:cursor-pointer bg-primary"
                : "text-primary bg-[#222]",
            )}
            onClick={handleSelect(current - 1)}
          >
            <MdNavigateBefore className="text-2xl" />
          </Control>
          <Control
            disabled={!hasNext}
            title="Next"
            className={clt(
              "shadow-[0_0_0_0.03125rem_#222_inset] text-[0.875rem]",
              hasNext
                ? "text-secondary hover:bg-[#333] hover:text-white hover:cursor-pointer bg-primary"
                : "text-primary bg-[#222]",
            )}
            onClick={handleSelect(current + 1)}
          >
            <MdNavigateNext className="text-2xl" />
          </Control>
        </div>
      )}
      <ul className="flex">
        {Array.from(arrayFromArg).map((label) => (
          <PaginationItem
            key={label}
            label={label}
            labelMessage={itemLabelMessage}
            isCurrent={current === label}
            onClick={handleSelect(label)}
          />
        ))}
      </ul>
    </nav>
  )
}

type PaginationItem = {
  labelMessage?: string
  label: number
  isCurrent: boolean
  onClick: (num: number) => void
}

function PaginationItem({
  labelMessage = "Go to page",
  label,
  isCurrent,
  onClick,
}: PaginationItem) {
  return (
    <li className="flex">
      <Control
        aria-label={`${labelMessage} ${label}`}
        aria-current={isCurrent ? "page" : undefined}
        title={`${labelMessage} ${label}`}
        className={clt(
          "shadow-[0_0_0_0.03125rem_#222_inset] text-[0.875rem]",
          isCurrent
            ? "text-active cursor-default bg-primary"
            : "text-secondary hover:bg-[#333] hover:text-white hover:cursor-pointer bg-primary",
        )}
        onClick={() => onClick(label)}
      >
        {label}
      </Control>
    </li>
  )
}
