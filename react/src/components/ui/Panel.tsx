import type { PropsWithChildren } from "react"
import clt from "../../utils/getClassList"

type PanelProps = {
  label: string
  isScrollable?: boolean
} & PropsWithChildren

export default function Panel({
  label,
  children,
  isScrollable = false,
}: PanelProps) {
  return (
    <div className="grow-1 flex flex-col overflow-hidden bg-secondary print:bg-white gap-4 print:overflow-visible">
      <div className="flex py-4 px-6 shrink-0 bg-white">
        <h2 className="font-semibold whitespace-nowrap max-w-full overflow-hidden text-ellipsis grow">
          {label}
        </h2>
      </div>
      <div
        className={clt(
          "flex flex-col px-6 py-4 grow-1 bg-white",
          isScrollable
            ? "overflow-auto"
            : "overflow-hidden print:overflow-visible"
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function PanelNegativeWrapper({ children }: PropsWithChildren) {
  return (
    <div className="relative flex flex-col -mx-6 -my-4 grow-1 overflow-hidden print:overflow-visible">
      {children}
    </div>
  )
}
