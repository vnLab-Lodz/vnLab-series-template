import { mdxComponents } from "src/templates/chapter"
import styled from "styled-components"
import { gridConstraint } from "~components/mdx"

export const TextContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  ${gridConstraint}
`

export const Label = styled(mdxComponents.h3)`
  font-weight: lighter;
  font-size: 15px;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

export const Title = styled(mdxComponents.h1)`
  font-weight: lighter;
  margin-top: 0 !important;
`

export const Subtitle = styled(mdxComponents.h2)`
  font-family: ${({ theme }) => theme.typography.fonts.primary};
  font-size: ${({ theme }) => theme.typography.md};
  font-weight: bold;
  margin-top: 0 !important;
`

export const ScrollButton = styled.button`
  bottom: ${({ theme }) => theme.spacing.md};
  position: absolute;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;

  &:focus-visible {
    border-radius: 3px;
    outline: 1px solid white;
  }
`
