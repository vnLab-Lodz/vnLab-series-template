import { motion } from "framer-motion"
import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"

export const Tabs = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.spacing.sm};
  grid-column: 2 / last-col;
  position: relative;

  @media ${devices.tablet} {
    grid-column: 7 / -3;
  }

  @media ${devices.laptop} {
    grid-column: 5 / 13;
  }
`

export const SearchInBtn = styled.button`
  ${({ theme: { palette, spacing } }) => css`
    flex: 1;
    background: none;
    border: none;
    border-bottom: solid 1px ${palette.dark};
    padding: ${spacing.xs};
    cursor: pointer;
    color: ${palette.black};
  `}
`

export const Underline = styled(motion.div)`
  ${({ theme: { palette } }) => css`
    background: ${palette.black};
    height: 2px;
    position: absolute;
    bottom: 0px;
  `}
`
