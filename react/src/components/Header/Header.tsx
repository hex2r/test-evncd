import { PrimaryNavigation } from "../Navigation"
import { DateTime } from "../DateTime"

export default function Header() {
  return (
    <div className="flex items-center min-h-[3.5rem] gap-4">
      <div className="shrink-0">
        <a
          className="flex py-4 pr-2 bg-white w-[9.375rem] h-[3.75rem] place-items-center"
          href="/"
        >
          <img src="/logo.jpeg" alt="Logo" />
        </a>
      </div>
      <div className="grow-1 pl-8 overflow-hidden">
        <h1 className="overflow-hidden whitespace-nowrap overflow-ellipsis">
          Production Monitoring Dev
        </h1>
      </div>
      <div className="shrink-0">
        <div className="text-[0.75rem]">
          <span>{`${import.meta.env.VITE_SERVER_ID} | `}</span>
          <DateTime />
        </div>
      </div>
      <div className="shrink-0">
        <PrimaryNavigation />
      </div>
    </div>
  )
}
