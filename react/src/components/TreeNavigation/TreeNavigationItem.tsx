import { useCallback, useRef, type KeyboardEvent } from "react"
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa"
import { GoDotFill } from "react-icons/go"
import type { TreeNavigationItemProps, OnSelectPage } from "./types"
import { useAppActionsContext, useAppContext } from "../../contexts/AppContext"
import { KEYS } from "../../config/constants"
import { useFocusedElementContext } from "../../contexts/CursorNavigation"
import clt from "../../utils/getClassList"

const { ENTER, SPACE, ARROW_LEFT, ARROW_RIGHT } = KEYS

export default function TreeNavigationItem({
  data: { url, path, label, origin, issuesCount = 0 },
  className,
  isExpanded,
  hasChildren,
  toggle,
}: TreeNavigationItemProps) {
  const onSelectQuery = useAppActionsContext((state) => state.onSelectQuery)
  const query = useAppContext((state) => state.query)
  const ref = useRef<HTMLAnchorElement>(null)
  const isSelected = query === url
  const focusedElement = useFocusedElementContext(
    (state) => state.focusedElement
  )

  const handleSelectPage: OnSelectPage = useCallback(
    (e) => {
      e.preventDefault()
      onSelectQuery(url)
    },
    [onSelectQuery, url]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLAnchorElement>) => {
      if (e.key === SPACE || e.key === ENTER) {
        e.preventDefault()
        handleSelectPage(e)
      } else if (hasChildren && isExpanded && e.key === ARROW_LEFT) {
        e.preventDefault()
        e.stopPropagation()
        toggle(e)
      } else if (hasChildren && !isExpanded && e.key === ARROW_RIGHT) {
        e.preventDefault()
        e.stopPropagation()
        toggle(e)
      }
    },
    [handleSelectPage, hasChildren, isExpanded, toggle]
  )

  const dotIconClassList = clt(
    "shrink-0",
    isSelected ? "fill-active" : "fill-secondary group-active:fill-white"
  )

  const toggleIconClassList = clt(
    "shrink-0 hover:scale-125",
    isSelected && "text-active"
  )

  return (
    <a
      ref={ref}
      role="treeitem"
      href={url}
      aria-current={isSelected ? "page" : undefined}
      aria-label={path}
      tabIndex={ref.current === focusedElement ? 0 : -1}
      className={clt(
        "group relative inline-flex items-center gap-2 py-1 px-2 whitespace-nowrap min-w-full border-1 focus-within:z-2",
        className,
        isSelected
          ? "border-primary bg-primary text-white"
          : "border-transparent bg-white hover:bg-[#f2f2f2] active:bg-[#ddd]",
        !origin && issuesCount === 0 && "text-active"
      )}
      onKeyDown={handleKeyDown}
      onClick={handleSelectPage}
    >
      {hasChildren ? (
        isExpanded ? (
          <FaMinusSquare className={toggleIconClassList} onClick={toggle} />
        ) : (
          <FaPlusSquare className={toggleIconClassList} onClick={toggle} />
        )
      ) : (
        <GoDotFill className={dotIconClassList} />
      )}
      <span>{label}</span>
      <span
        className={clt(
          "text-[0.75rem] flex place-self-center-safe pt-[0.15rem]",
          issuesCount > 0
            ? isSelected
              ? "text-white"
              : "text-[#d13e3e]"
            : undefined
        )}
      >
        {origin || `${issuesCount} 𖢥`}
      </span>
    </a>
  )
}
