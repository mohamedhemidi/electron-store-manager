import React, { useEffect, useState } from 'react'
import { Main } from '../main'
import { Sidebar } from '../sidebar'
import { ThemeContext } from '@renderer/contexts/ThemeContext'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(localStorage.getItem('dark-theme') === 'true')

  useEffect(() => {
    const theme = localStorage.getItem('dark-theme') === 'true'
    setDarkTheme(theme)
  }, [])

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <div className={`flex relative ${darkTheme ? 'dark' : ''}`}>
        <Sidebar />
        <Main>{children}</Main>
      </div>
    </ThemeContext.Provider>
  )
}

export default Layout
