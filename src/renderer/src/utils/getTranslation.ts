import { LanguageContext } from '@renderer/contexts/LanguageContext'
import ILanguage from '@renderer/types/Language'
import { languages } from '@shared/constants/globals'
import { useContext } from 'react'
import language from '@renderer/languages'

const getTranslation = (): ILanguage[languages] => {
  const { lang } = useContext(LanguageContext)
  const contentLang: ILanguage[languages] = language[lang]
  return contentLang
}
export default getTranslation
