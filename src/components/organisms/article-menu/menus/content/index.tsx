import React from "react"
import { useTranslation } from "react-i18next"
import { Contents } from "src/hooks/usePageContent"
import * as Styled from "./style"

interface Props {
  contents: Contents[]
  closeMenu: (callback?: () => void) => void
}

const contentComponents = {
  h1: Styled.ContentH1,
  h2: Styled.ContentH2,
  h3: Styled.ContentH3,
} as const

const Content: React.FC<Props> = ({ contents, closeMenu }) => {
  const { t } = useTranslation("common")

  return (
    <div>
      {contents.map(({ text, level, y }, index, array) => {
        const Component = contentComponents[level]

        return (
          <Component
            tabIndex={0}
            last={index === array.length - 1}
            key={index}
            onClick={() => {
              closeMenu(() =>
                window.scrollTo({ top: y - 130, behavior: "smooth" })
              )
            }}
          >
            {level === "h1" ? t("introduction") : text}
          </Component>
        )
      })}
    </div>
  )
}

export default Content
