import styled from "styled-components"
import atoms from "~components/atoms"

export const EditionWrapper = styled.div`
  margin-bottom: ${({ theme: { spacing } }) => spacing.sm};
  display: flex;
  align-items: center;
`

export const Text = styled(atoms.p)`
  margin-right: ${({ theme }) => theme.spacing.md};
`

export const Button = styled(atoms.button)`
  padding-bottom: 2px;
  padding-top: 2px;
  font-weight: 400;
  text-transform: none;
  vertical-align: middle;
  width: fit-content;
`
