import { InnerGrid } from "~styles/grid"
import styled from "styled-components"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"

export const AnnotationsGrid = styled(InnerGrid)`
  row-gap: ${({ theme: { spacing } }) => spacing.xs};
`

export const AnnotationNumber = styled(atoms.p)`
  font-size: calc(1.4 * ${({ theme }) => theme.typography.sm});
  grid-column: 1 / 2;

  @media ${devices.tablet} {
    grid-column: 1;
  }
`

export const AnnotationParagraph = styled(atoms.p)`
  font-size: calc(1.4 * ${({ theme }) => theme.typography.sm});
  font-family: ${({ theme }) => theme.typography.fonts.secondary};
  cursor: pointer;
  grid-column: 3 / last-col;

  @media ${devices.tablet} {
    grid-column: 2 / last-col;
  }
`

export const InheritParagraph = styled.p`
  all: inherit;
  font-size: calc(1.4 * ${({ theme }) => theme.typography.sm});
  font-family: ${({ theme }) => theme.typography.fonts.secondary};
`
