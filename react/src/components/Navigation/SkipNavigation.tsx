import Navigation, { type NavigationProps } from "./Navigation"

const data = {
  label: "Skip Navigation",
  items: [
    {
      label: "Skip to Primary Navigation",
      url: "#primary-navigation",
    },
    {
      label: "Skip to Tree Navigation",
      url: "#sidebar",
    },
    {
      label: "Skip to Main",
      url: "#main",
    },
  ],
} satisfies NavigationProps

export default function SkipNavigation() {
  return <Navigation {...data} />
}
