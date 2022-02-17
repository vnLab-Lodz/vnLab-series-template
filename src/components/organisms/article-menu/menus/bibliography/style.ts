import styled from "styled-components"

export const InheritParagraph = styled.p`
  all: inherit;
  font-family: ${({ theme }) => theme.typography.fonts.secondary};
  font-size: calc(1.4 * ${({ theme }) => theme.typography.sm});
`
