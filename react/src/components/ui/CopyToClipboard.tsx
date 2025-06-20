import { useRef, useState, type PropsWithChildren } from "react"
import { FaCopy, FaCheck } from "react-icons/fa"

type CopyToClipboardProps = {
  data: string
} & PropsWithChildren

export default function CopyToClipboard({
  data,
  children,
}: CopyToClipboardProps) {
  const [isCopied, setCopied] = useState(false)
  const timeout = useRef<number>(undefined)

  const handleClick = () => {
    if (isCopied) {
      if (timeout.current) clearTimeout(timeout.current)
      return setCopied(false)
    }

    navigator.clipboard.writeText(data)
    setCopied(true)

    timeout.current = setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <div className="group relative inline-flex px-2 border-dotted border-1 border-transparent -mx-2 hover:border-primary focus-within:border-primary">
      {children}
      <button
        aria-label="Copy to clipboard"
        className="absolute -bottom-[0.0625rem] left-1/1 p-[0.325rem] text-[0.875rem] opacity-0 bg-primary group-hover:opacity-100 group-focus-within:opacity-100 text-secondary hover:text-white border-1 border-primary"
        onClick={handleClick}
      >
        {isCopied ? <FaCheck /> : <FaCopy />}
      </button>
    </div>
  )
}
