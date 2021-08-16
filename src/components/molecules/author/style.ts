import styled from "styled-components"
import atoms from "~components/atoms"

export const H3 = styled(atoms.h3)`
  margin-bottom: ${({ theme: { spacing } }) => spacing.lg};
  text-align: start;
`
