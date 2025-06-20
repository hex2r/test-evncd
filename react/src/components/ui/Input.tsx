import { type ChangeEvent, type RefObject, type KeyboardEvent } from "react"
import clt from "../../utils/getClassList"

type InputProps = {
  ref?: RefObject<HTMLInputElement | null>
  name: string
  type?: "text" | "search" | "email"
  value: string
  className?: string
  placeholder: string
  autoFocus?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  onBlur?: () => void
}

export default Input

function Input({
  ref,
  type = "text",
  name,
  value,
  className,
  placeholder,
  autoFocus,
  onChange,
  onKeyDown,
  onBlur,
}: InputProps) {
  return (
    <input
      ref={ref}
      name={name}
      type={type}
      value={value}
      autoFocus={autoFocus}
      className={clt(
        className,
        "px-4 py-2 w-full border-1 bg-white text-[#333] border-secondary hover:border-[#ccc] focus:border-[#ccc]"
      )}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  )
}
