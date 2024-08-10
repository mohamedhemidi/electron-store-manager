import { BrowserRouter as Router } from 'react-router-dom'
import { AppContext } from './contexts/AppContext'
import { Layout } from './components/layout/layout'
import Routes from './Routes'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.api.send(channels.CreateClientRequest, 'Mohamed')

  // const ipcHandleClientList = (): void => {
  //   window.api.send(channels.ClientsListRequest)
  //   window.api.receive(channels.ClientsListReceive, (data) => {
  //     console.log(data)
  //   })
  // }
  const api = window.api

  return (
    <>
      <Router>
        <AppContext.Provider value={api}>
          <Layout>
            <Routes />
          </Layout>
        </AppContext.Provider>
      </Router>
    </>
  )
}

export default App
