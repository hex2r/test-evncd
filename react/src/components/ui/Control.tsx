import type { HTMLAttributes, PropsWithChildren } from "react"
import clt from "../../utils/getClassList"

export function BaseControl({
  children,
  ...props
}: PropsWithChildren &
  HTMLAttributes<HTMLButtonElement> & { disabled?: boolean }) {
  return (
    <button
      {...props}
      className={clt(
        "flex justify-center items-center relative p-2 min-w-10 min-h-10 focus-visible:z-2",
        props?.className
      )}
    >
      {children}
    </button>
  )
}

export default function Control({
  children,
  ...props
}: PropsWithChildren &
  HTMLAttributes<HTMLButtonElement> & { disabled?: boolean }) {
  return <BaseControl {...props}>{children}</BaseControl>
}
