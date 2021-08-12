import styled, { css } from "styled-components"

export const ArticleNav = styled.nav`
  display: flex;
  justify-content: center;
  padding: ${({ theme: { spacing } }) => spacing.sm};
  border-bottom: ${({ theme: { palette } }) => `solid 1px ${palette.dark}`};
  margin-bottom: ${({ theme: { spacing } }) => spacing.xxxl};
`

export const ButtonText = styled.span`
  ${({ theme: { spacing, typography } }) => css`
    margin-right: ${spacing.xxs};
    font-family: ${typography.fonts.primary};
    font-size: ${typography.sm};
    font-weight: bold;
    text-transform: uppercase;
    line-height: 115%;
  `}
`

export const Button = styled.button`
  ${({ theme: { spacing } }) => css`
    padding: ${spacing.xs};
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  `}
`
