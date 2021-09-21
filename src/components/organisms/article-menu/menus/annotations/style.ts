import { InnerGrid } from "~styles/grid"
import styled from "styled-components"
import atoms from "~components/atoms"

export const AnnotationsGrid = styled(InnerGrid)`
  row-gap: ${({ theme: { spacing } }) => spacing.xs};
`

export const AnnotationNumber = styled(atoms.p)`
  grid-column: 1;
`

export const AnnotationParagraph = styled(atoms.p)`
  cursor: pointer;
  grid-column: 2 / last-col;
`
