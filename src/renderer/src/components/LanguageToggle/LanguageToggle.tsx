import { LanguageContext } from '@renderer/contexts/LanguageContext'
import { useContext } from 'react'

const LanguageToggle = (): JSX.Element => {
  const language = useContext(LanguageContext)
  const { lang, setLang } = language

  const toggleLanguage = (lang: 'en' | 'ar'): void => {
    setLang(lang)
    localStorage.setItem('lang', lang)
  }

  const toggleButtonName = (): string => {
    if (lang === 'ar') {
      return 'عربي'
    }
    return 'EN'
  }

  return (
    <>
      <div className="dropdown dropdown-top">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-circle text-white bg-[#12A5BC] dark:bg-slate-500 m-1"
        >
          {toggleButtonName()}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li onClick={() => toggleLanguage('ar')}>
            <a className="text-neutral-800 ">عربي</a>
          </li>
          <li onClick={() => toggleLanguage('en')}>
            <a className="text-neutral-800 ">English</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default LanguageToggle
