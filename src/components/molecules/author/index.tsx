import { useLocalization } from "gatsby-theme-i18n"
import React from "react"
import * as Styled from "./style"

interface Props {
  link?: string
}

const Author: React.FC<Props> = ({ children, link }) => {
  const { locale } = useLocalization()

  return (
    <Styled.H3 type="primary">
      {link ? (
        <Styled.BiogramLink to={link} lang={locale}>
          {children}
        </Styled.BiogramLink>
      ) : (
        children
      )}
    </Styled.H3>
  )
}

export default Author
