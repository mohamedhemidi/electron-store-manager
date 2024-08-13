import { HashRouter as Router } from 'react-router-dom'
import { AppContext } from './contexts/AppContext'
import { Layout } from './components/layout/layout'
import Routes from './Routes'
import { useEffect, useState } from 'react'
import { LanguageContext } from './contexts/LanguageContext'

function App(): JSX.Element {
  const api = window.api
  const [lang, setLang] = useState(localStorage.getItem('lang'))

  useEffect(() => {
    const lang = localStorage.getItem('lang')
    if (lang) {
      setLang(lang)
    } else {
      localStorage.setItem('lang', 'en')
      setLang('en')
    }
  }, [])
  return (
    <>
      <Router>
        <AppContext.Provider value={api}>
          <LanguageContext.Provider value={{ lang, setLang }}>
            <Layout>
              <Routes />
            </Layout>
          </LanguageContext.Provider>
        </AppContext.Provider>
      </Router>
    </>
  )
}

export default App
