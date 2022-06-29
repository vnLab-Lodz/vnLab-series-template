import { LocalizedLink } from "gatsby-theme-i18n"
import styled from "styled-components"
import atoms from "~components/atoms"

export const H3 = styled(atoms.h3)`
  margin-bottom: ${({ theme: { spacing } }) => spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xxs};
  text-align: start;
`

export const BiogramLink = styled(LocalizedLink)`
  text-decoration: none;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
`
