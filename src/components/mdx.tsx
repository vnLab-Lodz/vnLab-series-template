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

const marginRules = css`
  margin-top: 0;
  margin-bottom: 0;

  // ! If element is not carousel
  &:not(.carousel),
  &:not(.viewport-image) {
    // ! If element is below anything that
    // ! is not a carousel or viewport image
    *:not(.carousel) + &,
    *:not(.viewport-image) + & {
      margin-top: ${({ theme }) => theme.spacing.lg};

      &.mdx-blockquote {
        margin-top: ${({ theme }) => theme.spacing.xl};
      }

      &.mdx-heading {
        margin-top: calc(${({ theme }) => theme.spacing.xxl} * 1.2);
      }
    }

    // ! If element above is a blockquote
    *.mdx-blockquote + & {
      margin-top: ${({ theme }) => theme.spacing.xl};
    }

    // ! Override for when element above is
    // ! carousel, viewport image, br
    // ! or if the element itself is a br
    div.mdx-break + &,
    div.carousel + &,
    div.viewport-image + &,
    &.mdx-break {
      margin-top: 0 !important;
    }
  }

  div.carousel,
  div.viewport-image {
    margin-top: 0;
    margin-bottom: 0;
  }
`

const p = styled(atoms.p).attrs({
  className: "mdx-paragraph",
})`
  ${gridConstraint}
  ${marginRules}
`

const h1 = styled(atoms.h1).attrs({ className: "mdx-heading" })`
  ${gridConstraint}
  ${marginRules}
`
const h2 = styled(atoms.h2).attrs({ className: "mdx-heading" })`
  ${gridConstraint}
  ${marginRules}
`
const h3 = styled(atoms.h3).attrs({ className: "mdx-heading" })`
  ${gridConstraint}
  ${marginRules}
`

const blockquote = styled(Quote).attrs({
  className: "mdx-blockquote",
})`
  ${gridConstraint}
  ${marginRules}
`

const ul = styled(atoms.ul).attrs({ className: "mdx-unordered-list" })`
  ${gridConstraint}
  ${marginRules}
`

const ol = styled(atoms.ol).attrs({ className: "mdx-ordered-list" })`
  ${gridConstraint}
  ${marginRules}
`

const button = styled(atoms.button).attrs({ className: "mdx-button" })`
  ${gridConstraint}
  ${marginRules}
`

const br: React.FC = () => (
  <div
    className="mdx-break"
    css={`
      ${gridConstraint}
      ${marginRules}
    `}
  >
    <br />
  </div>
)

const Abstract = styled(AbstractMolecule).attrs({ className: "mdx-abstract" })`
  ${gridConstraint}
  ${marginRules}
`

const Author = styled(AuthorMolecule).attrs({ className: "mdx-author" })`
  ${gridConstraint}
  ${marginRules}
`

const Edition = styled(EditionMolecule).attrs({ className: "mdx-edition" })`
  ${gridConstraint}
  ${marginRules}
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
