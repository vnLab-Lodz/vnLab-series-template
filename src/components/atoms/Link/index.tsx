import React, { FC, HTMLAttributes, PropsWithChildren } from "react"
import { useLocalization } from "gatsby-theme-i18n"
import { navigate } from "gatsby"

type Props = {
  to: string
  language: string
} & HTMLAttributes<HTMLSpanElement>

const Link: FC<PropsWithChildren<Props>> = ({
  to,
  language,
  children,
  ...delegated
}) => {
  const { defaultLang, prefixDefault, localizedPath } = useLocalization()

  const path = localizedPath({
    path: to,
    locale: language,
    defaultLang,
    prefixDefault,
  })

  return (
    <span
      {...delegated}
      role="link"
      data-href={path}
      tabIndex={0}
      style={{ cursor: "pointer", ...delegated.style }}
      onClick={() => navigate(path)}
    >
      {children}
    </span>
  )
}

export default Link
