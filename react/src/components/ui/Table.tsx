import { type CSSProperties, type PropsWithChildren } from "react"
import clt from "../../utils/getClassList"

Table.Thead = Thead
Table.Tbody = Tbody
Table.Tr = Tr
Table.Th = Th
Table.Td = Td

export default function Table({
  cx,
  children,
}: { cx?: CSSProperties } & PropsWithChildren) {
  return (
    <table className="table-fixed border-collapse text-left" style={cx}>
      {children}
    </table>
  )
}

function Thead({
  className,
  children,
}: { className?: string } & PropsWithChildren) {
  return <thead className={className}>{children}</thead>
}

function Tbody({ children }: PropsWithChildren) {
  return (
    <tbody className="shadow-[0_0_0_0.0625rem_#ccc_inset]">{children}</tbody>
  )
}

function Tr({ children }: PropsWithChildren) {
  return <tr>{children}</tr>
}

function Th({
  className,
  cx,
  children,
}: { className?: string; cx?: CSSProperties } & PropsWithChildren) {
  return (
    <th
      className={clt(
        className,
        "relative px-4 py-1 bg-primary text-white font-normal focus-within:z-2 shadow-[0_0_0_0.03125rem_#222_inset]"
      )}
      style={cx}
    >
      {children}
    </th>
  )
}

function Td({
  className,
  colSpan,
  cx,
  children,
}: {
  className?: string
  colSpan?: number
  cx?: CSSProperties
} & PropsWithChildren) {
  return (
    <td
      colSpan={colSpan}
      className={clt(
        className,
        "px-4 py-1 shadow-[0_0_0_0.03125rem_#e3e3e3_inset]"
      )}
      style={cx}
    >
      {children}
    </td>
  )
}
