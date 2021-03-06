import React from "react"
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
  return (
    <div>
      {contents.map(({ text, level, scrollIntoView }, index, array) => {
        const Component = contentComponents[level]

        return (
          <Component
            tabIndex={0}
            last={index === array.length - 1}
            key={index}
            onClick={() => {
              closeMenu(() => scrollIntoView())
            }}
          >
            {text}
          </Component>
        )
      })}
    </div>
  )
}

export default Content
