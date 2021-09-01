import { useLocalization } from "gatsby-theme-i18n"
import React, { useState } from "react"
import * as Styled from "./style"

interface Language {
  code: string
  name: string
}

interface Props {
  currentPath: string
  className?: string
  dark?: boolean
}

function getLocalesString(config: Array<{ code: string }>) {
  return config.reduce((prev: string, { code }, index) => {
    if (index === 0) return code.toUpperCase()

    return (prev += `/${code.toUpperCase()}`)
  }, "")
}

const LanguagePicker: React.FC<Props> = ({ currentPath, className, dark }) => {
  const [langPickerOpen, setLangPickerOpen] = useState(false)

  const { config, locale } = useLocalization()
  const locales = getLocalesString(config)
  const languages: Language[] = config.map(({ code, name }: Language) => ({
    code,
    name,
  }))

  return (
    <Styled.LangButton
      className={className}
      onClick={() => setLangPickerOpen(prev => !prev)}
    >
      <Styled.LangButtonText dark={dark}>{locales}</Styled.LangButtonText>
      {langPickerOpen && (
        <Styled.LanguagePopUp>
          {languages.map((lang: Language, i) => (
            <Styled.LangLink
              key={`nav-menu__lang-link--${i}`}
              inactive={(lang.code === locale).toString()}
              to={currentPath.replace(`/${locale}/`, "/")}
              language={lang.code}
            >
              {lang.name}
            </Styled.LangLink>
          ))}
        </Styled.LanguagePopUp>
      )}
    </Styled.LangButton>
  )
}

export default LanguagePicker
