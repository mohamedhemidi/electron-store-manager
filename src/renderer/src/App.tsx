import { HashRouter as Router } from 'react-router-dom'
import { AppContext } from './contexts/AppContext'
import { Layout } from './components/layout/layout'
import Routes from './Routes'

function App(): JSX.Element {
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
