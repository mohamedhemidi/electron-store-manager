import { HashRouter as Router } from 'react-router-dom'
import { AppContext } from './contexts/AppContext'
import { Layout } from './components/layout/layout'
import Routes from './Routes'
import { useEffect, useState } from 'react'
import { LanguageContext } from './contexts/LanguageContext'
import { Intro } from './pages/intro'
import LicenseKeyPrompt from './pages/licenseKeyPrompt/LicenseKeyPrompt'
import channels from '@shared/constants/channels'

function App(): JSX.Element {
  const api = window.api
  const [lang, setLang] = useState(localStorage.getItem('lang'))

  // License Management
  const [licenseValidated, setLicenseValidate] = useState(false)

  useEffect(() => {
    if (api) {
      api.send(channels.LicenseVerifyRequest)
      api.receive(channels.LicenseVerifyResponse, (data: boolean) => {
        setLicenseValidate(data)
      })
    }
  }, [])

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
      <Router>
        <AppContext.Provider value={api}>
          {!licenseValidated ? (
            <LicenseKeyPrompt />
          ) : (
            <LanguageContext.Provider value={{ lang, setLang }}>
              <Layout>
                <Routes />
              </Layout>
            </LanguageContext.Provider>
          )}
        </AppContext.Provider>
      </Router>

      <Intro />
    </div>
  )
}

export default App
