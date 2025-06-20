import type { PropsWithChildren } from "react"

const skipLinks = [
  {
    label: "Skip to Primary Navigation",
    url: "#primary-navigation",
  },
  {
    label: "Skip to Navigation Tree",
    url: "#aside",
  },
  {
    label: "Skip to Main",
    url: "#main",
  },
]

Template.Header = TemplateHeader
Template.Content = TemplateContent
Template.Sidebar = TemplateSidebar
Template.Main = TemplateMain
Template.SkipLinks = TemplateSkipLinks

export default function Template({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col h-[100vh] overflow-hidden print:h-auto print:overflow-visible">
      {children}
    </div>
  )
}

function TemplateHeader({ children }: PropsWithChildren) {
  return (
    <header className="shrink-0 bg-primary text-white print:hidden">
      <div className="w-[90rem] px-4 mx-auto max-w-full">{children}</div>
    </header>
  )
}

function TemplateContent({ children }: PropsWithChildren) {
  return (
    <div className="flex max-w-[90rem] mx-auto pt-4 sm:p-4 print:p-0 grow-1 w-2/1 sm:w-full overflow-hidden sm:gap-4 print:overflow-visible">
      {children}
    </div>
  )
}

function TemplateSidebar({ children }: PropsWithChildren) {
  return (
    <aside
      id="aside"
      className="flex w-1/2 flex-col basis-1/2 sm:basis-[25rem] shrink-0 overflow-hidden bg-white print:hidden"
      tabIndex={-1}
    >
      {children}
    </aside>
  )
}

function TemplateMain({ children }: PropsWithChildren) {
  return (
    <main
      id="main"
      className="flex w-1/2 flex-col basis-1/2 sm:basis-auto bg-white grow-1 overflow-hidden print:overflow-visible"
      tabIndex={-1}
    >
      {children}
    </main>
  )
}

function SkipLink({ label, url }: { label: string; url: string }) {
  return (
    <a
      className="hidden sm:block fixed top-16 left-0 p-2 -translate-x-full bg-active text-white border-l-16 border-l-[#999] opacity-0 focus-within:opacity-100 focus-within:translate-x-0 transition-transform will-change-transform"
      href={url}
    >
      {label}
    </a>
  )
}

function TemplateSkipLinks() {
  return (
    <>
      {skipLinks.map((skipLinkProps, idx) => (
        <SkipLink {...skipLinkProps} key={idx} />
      ))}
    </>
  )
}
