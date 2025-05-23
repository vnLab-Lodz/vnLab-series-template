import React from "react"
import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"
import atoms from "./atoms"
import AbstractMolecule from "./molecules/abstract"
import AuthorMolecule from "./molecules/author"
import EditionMolecule from "./molecules/edition"
import Quote, { BlockQuote } from "./molecules/quote"
import { HalfSlide as SlidesHalfSlide } from "./molecules/slides/split-slide/style"
import { HalfSlide as GraphicalHalfSlide } from "./molecules/graphical-components/split-slide/style"

export const gridConstraint = css`
  max-width: -moz-available;
  grid-column: 2 / 32;

  @media ${devices.tablet} {
    grid-column: 7 / 30;
  }

  @media ${devices.laptop} {
    grid-column: 9 / 25;
  }

  ${SlidesHalfSlide} &,
  ${GraphicalHalfSlide} & {
    @media ${devices.laptop} {
      grid-column: 3 / -3;
    }
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
        margin-top: 30px;

        @media ${devices.laptop} {
          margin-top: 40px;
        }
      }

      &.mdx-quote {
        margin-top: ${({ theme }) => theme.spacing.xl};
      }

      &.mdx-heading {
        margin-top: calc(${({ theme }) => theme.spacing.xxl} * 1.2);
      }

      ul > li &.mdx-unordered-list,
      ol > li &.mdx-ordered-list {
        margin-top: 0;
      }
    }

    p.mdx-paragraph + &.mdx-paragraph {
      margin-top: ${({ theme }) => `clamp(0px, ${theme.spacing.xs}, 20px)`};
    }

    table + p.mdx-paragraph + &.mdx-paragraph {
      margin-top: ${({ theme }) => theme.spacing.lg};
    }

    // ! If element above is a blockquote
    *.mdx-blockquote + & {
      margin-top: ${({ theme }) => theme.spacing.md};
    }

    *.mdx-quote + & {
      margin-top: 30px;

      @media ${devices.laptop} {
        margin-top: 40px;
      }
    }

    // ! Override for when element above is
    // ! carousel, viewport image, br
    // ! or if the element itself is a br
    hr.mdx-hr + &,
    div.carousel + &,
    div.viewport-image + & {
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

const blockquote = styled(BlockQuote).attrs({
  className: "mdx-blockquote",
})`
  ${gridConstraint}
  ${marginRules}
`

const quote = styled(Quote).attrs({
  className: "mdx-quote",
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

const button = styled(atoms.button).attrs({
  className: "mdx-button",
  whileHover: undefined,
  whileTap: undefined,
})`
  ${gridConstraint}
  ${marginRules}

  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  align-self: center;
  width: fit-content !important;
  border-radius: 9999px;
  border: none;
  outline: solid 1px ${({ theme }) => theme.palette.black};
  padding: ${({ theme }) => theme.spacing.xxs}
    ${({ theme }) => theme.spacing.xs};

  &:hover,
  &:active,
  &:focus-visible {
    outline: solid 2px ${({ theme }) => theme.palette.black};
  }
`

const hr = styled.hr.attrs({ className: "mdx-hr" })`
  ${gridConstraint}

  margin: ${({ theme }) => theme.spacing.sm} 0;
  width: 100%;
  height: 0;
  opacity: 0;
`

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

const Tag = styled.span`
  font: inherit;
  color: inherit;

  @media ${devices.tablet} {
    scroll-margin-top: 110px;
  }

  @media ${devices.desktopL} {
    scroll-margin-top: 170px;
  }
`

const table = styled.table`
  ${gridConstraint}
  ${marginRules}

  max-width: 100%;

  & th,
  & td {
    padding: ${({ theme }) => theme.spacing.xxs};
    border: solid 1px ${({ theme }) => theme.palette.black};
  }

  & + p {
    ${({ theme: { typography, spacing } }) => css`
      margin-top: ${spacing.xs} !important;
      font-family: ${typography.fonts.primary};
      font-size: ${typography.sm};
      text-align: left;
      font-weight: 300;
    `}
  }

  & * {
    min-width: 0;

    ${({ theme: { typography, palette } }) => css`
      font-family: ${typography.fonts.secondary};
      font-size: ${typography.md};
      line-height: 150%;
      color: ${palette.black};
    `}
  }
`

export const components = {
  strong: atoms.strong,
  em: atoms.em,
  del: atoms.del,
  a: atoms.a,
  p,
  h1,
  h2,
  h3,
  quote,
  blockquote,
  ul,
  ol,
  button,
  hr,
  table,
  Abstract,
  Author,
  Edition,
  Tag,
}
