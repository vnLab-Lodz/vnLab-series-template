import styled from "styled-components"
import { gridConstraint } from "~components/mdx"

export const Iframe = styled.iframe`
  ${gridConstraint}

  * + & {
    margin-top: ${({ theme }) => theme.spacing.md};
  }
`
