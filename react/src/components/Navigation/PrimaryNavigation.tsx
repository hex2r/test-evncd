import Navigation, { type NavigationProps } from "./Navigation"
import { RiLogoutBoxRLine } from "react-icons/ri"

const data = {
  tabIndex: -1,
  id: "primary-navigation",
  label: "Primary Navigation",
  items: [
    {
      label: "Logout",
      url: "#",
      icon: <RiLogoutBoxRLine />,
    },
  ],
} satisfies NavigationProps

export default function PrimaryNavigation() {
  return <Navigation {...data} />
}
