import Template from "./Templates/Main"
import { Header, Sidebar, Main } from "../components"
import { AppProvider } from "../contexts/AppContext"

export default function IndexPage() {
  return (
    <Template>
      <Template.SkipLinks />
      <Template.Header>
        <Header />
      </Template.Header>
      <AppProvider>
        <Template.Content>
          <Template.Sidebar>
            <Sidebar />
          </Template.Sidebar>
          <Template.Main>
            <Main />
          </Template.Main>
        </Template.Content>
      </AppProvider>
    </Template>
  )
}
