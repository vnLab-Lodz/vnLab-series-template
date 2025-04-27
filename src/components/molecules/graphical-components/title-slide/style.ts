import { mdxComponents } from "src/templates/chapter"
import styled from "styled-components"
import { gridConstraint } from "~components/mdx"
import TextSlide from "../text-slide"

export const TextContainer = styled(TextSlide)`
  height: 100%;
  width: 100%;
  position: relative;
  text-align: center;
  min-height: 100vh;

  & > * {
    margin-top: 0 !important;
  }

  & > h1 {
    font-weight: lighter;
    margin-top: ${({ theme }) => theme.spacing.xs} !important;
  }

  & > h2 {
    font-family: ${({ theme }) => theme.typography.fonts.primary};
    font-size: calc(${({ theme }) => theme.typography.md} * 0.8);
    font-weight: bold;
    margin-top: ${({ theme }) => theme.spacing.xxs} !important;
  }
`

export const Label = styled(mdxComponents.h3)`
  font-weight: lighter;
  font-size: 15px;
`

export const ScrollButton = styled.button`
  bottom: ${({ theme }) => theme.spacing.md};
  position: absolute;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;

  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  width: 5%;

  ${gridConstraint}

  &:focus-visible {
    border-radius: 3px;
    outline: 1px solid white;
  }
`
