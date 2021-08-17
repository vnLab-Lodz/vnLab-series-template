import styled, { css } from "styled-components"
import atoms from "~components/atoms"

export const ContentH1 = styled(atoms.p)`
  text-align: start;
  cursor: pointer;
`
export const ContentH2 = styled(ContentH1)<{ last?: boolean }>`
  ${({ last, theme: { spacing, palette } }) => css`
    border-top: solid 1px ${palette.medium};
    margin: calc(${spacing.xxs} * 1.45) 0px;
    padding-top: calc(${spacing.xxs} * 1.45);

    ${last &&
    css`
      margin-bottom: 0px;
    `}
  `}
`

export const ContentH3 = styled(ContentH1)`
  ${({ theme: { spacing, typography } }) => css`
    text-indent: ${spacing.md};
    font-size: calc(${typography.md} * 0.8);
  `}
`
