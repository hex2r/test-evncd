import type { JSX } from "react"

export type NavigationProps = {
  items: NavigationItemProps[]
  id?: string
  label: string
  tabIndex?: number
}

export default function Navigation({
  id = undefined,
  tabIndex = undefined,
  label,
  items,
}: NavigationProps) {
  return (
    <nav id={id} aria-label={label} tabIndex={tabIndex}>
      <ul className="flex gap-4">
        {items.map((itemProps, idx) => (
          <NavigationItem {...itemProps} key={idx} />
        ))}
      </ul>
    </nav>
  )
}

type NavigationItemProps = {
  url: string
  label: string
  icon?: JSX.Element
}

function NavigationItem({ url, label, icon }: NavigationItemProps) {
  return (
    <li>
      <a
        href={url}
        className="flex gap-2 py-2 items-center text-white hover:text-active"
      >
        {icon}
        <span>{label}</span>
      </a>
    </li>
  )
}
