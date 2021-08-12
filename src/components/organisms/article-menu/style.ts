import { motion } from "framer-motion"
import styled, { css } from "styled-components"
import Layout from "../layout"

export const ArticleMenuContainer = styled.div`
  position: relative;
  height: 250px;
  background: ${({ theme: { palette } }) => palette.light};
`

export const StickyWrapper = styled.div<{ sticky?: boolean }>`
  background: ${({ theme: { palette } }) => palette.light};
  ${({ sticky }) =>
    sticky &&
    css`
      position: fixed;
      top: 0px;
    `}
`

export const MenuNav = styled.nav`
  ${({ theme: { spacing, palette } }) => css`
    display: flex;
    justify-content: center;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: ${palette.dark};
    padding: ${spacing.sm};
    position: relative;
    z-index: 3;
  `}
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

export const MenuContet = styled(motion.div)`
  ${({ theme: { palette } }) => css`
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: 2;
    background-color: ${palette.white};
    border-bottom: solid 2px ${palette.dark};
    overflow: hidden;
  `}
`

export const MenuLayout = styled(Layout)`
  margin-top: ${({ theme: { spacing } }) => spacing.xxxl};
  margin-bottom: ${({ theme: { spacing } }) => spacing.sm};
`
