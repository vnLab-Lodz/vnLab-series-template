import { useLocalization } from "gatsby-theme-i18n"
import React, { useMemo, useState } from "react"
import * as Styled from "./style"
import { useTranslation } from "react-i18next"

interface Language {
  code: string
  name: string
}

interface Props {
  currentPath: string
  className?: string
  standalone?: boolean
  compact?: boolean
}

function getLocales(config: Array<{ code: string }>, activeLang: string) {
  return config.map(({ code }, index) => (
    <React.Fragment key={`locale-code--${code}`}>
      <Styled.LocaleSpan active={code === activeLang}>{code}</Styled.LocaleSpan>
      {index !== config.length - 1 && " / "}
    </React.Fragment>
  ))
}

const LanguagePicker: React.FC<Props> = ({
  currentPath,
  className,
  standalone = false,
  compact = false,
}) => {
  const [langPickerOpen, setLangPickerOpen] = useState(false)

  const { config, locale } = useLocalization()
  const { t } = useTranslation()
  const locales = useMemo(() => getLocales(config, locale), [config, locale])
  const languages: Language[] = useMemo(() => {
    return config.map(({ code, name }: Language) => ({ code, name }))
  }, [config])

  if (languages.length === 1) return null

  return (
    <Styled.LangButton
      title={t("common:icons.language")}
      type="button"
      compact={compact}
      inMenu={!standalone}
      className={className}
      onClick={() => setLangPickerOpen(prev => !prev)}
    >
      <Styled.LangButtonText>
        {locales}
        {langPickerOpen && (
          <Styled.LanguagePopUp close={compact}>
            {languages.map(lang => (
              <Styled.LangLink
                key={lang.code}
                inactive={(lang.code === locale).toString()}
                to={currentPath.replace(`/${locale}/`, "/")}
                language={lang.code}
              >
                {lang.name}
              </Styled.LangLink>
            ))}
          </Styled.LanguagePopUp>
        )}
      </Styled.LangButtonText>
    </Styled.LangButton>
  )
}

export default LanguagePicker
