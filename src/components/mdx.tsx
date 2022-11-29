import React from "react"
import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"
import atoms from "./atoms"
import AbstractMolecule from "./molecules/abstract"
import AuthorMolecule from "./molecules/author"
import EditionMolecule from "./molecules/edition"
import Quote from "./molecules/quote"

const gridConstraint = css`
  max-width: -moz-available;
  grid-column: 2 / 32;

  @media ${devices.tablet} {
    grid-column: 7 / 30;
  }

  @media ${devices.laptop} {
    grid-column: 9 / 25;
  }
`

const p = styled(atoms.p).attrs({
  className: "mdx-paragraph",
})`
  ${gridConstraint}
`

const h1 = styled(atoms.h1).attrs({ className: "mdx-heading" })`
  ${gridConstraint}
`
const h2 = styled(atoms.h2).attrs({ className: "mdx-heading" })`
  ${gridConstraint}
`
const h3 = styled(atoms.h3).attrs({ className: "mdx-heading" })`
  ${gridConstraint}
`

const blockquote = styled(Quote).attrs({
  className: "mdx-blockquote",
})`
  ${gridConstraint}
`

const ul = styled(atoms.ul).attrs({ className: "mdx-unordered-list" })`
  ${gridConstraint}
`

const ol = styled(atoms.ol).attrs({ className: "mdx-ordered-list" })`
  ${gridConstraint}
`

const button = styled(atoms.button).attrs({ className: "mdx-button" })`
  ${gridConstraint}
`

const br: React.FC = () => (
  <div
    className="mdx-break"
    css={`
      ${gridConstraint}
    `}
  >
    <br />
  </div>
)

const Abstract = styled(AbstractMolecule).attrs({ className: "mdx-abstract" })`
  ${gridConstraint}
`

const Author = styled(AuthorMolecule).attrs({ className: "mdx-author" })`
  ${gridConstraint}
`

const Edition = styled(EditionMolecule).attrs({ className: "mdx-edition" })`
  ${gridConstraint}
`

export const components = {
  p,
  h1,
  h2,
  h3,
  blockquote,
  ul,
  ol,
  button,
  br,
  Abstract,
  Author,
  Edition,
}
