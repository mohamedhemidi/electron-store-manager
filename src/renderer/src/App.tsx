import { HashRouter as Router } from 'react-router-dom'
import { AppContext } from './contexts/AppContext'
import { Layout } from './components/layout/layout'
import Routes from './Routes'
import { useEffect, useState } from 'react'
import { LanguageContext } from './contexts/LanguageContext'
import { Intro } from './pages/intro'

function App(): JSX.Element {
  const api = window.api
  const [lang, setLang] = useState(localStorage.getItem('lang'))

  // Language management
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
    <div className="relative">
      <Intro />
      <Router>
        <AppContext.Provider value={api}>
          <LanguageContext.Provider value={{ lang, setLang }}>
            <Layout>
              <Routes />
            </Layout>
          </LanguageContext.Provider>
        </AppContext.Provider>
      </Router>

      <Intro />
    </div>
  )
}

export default App
