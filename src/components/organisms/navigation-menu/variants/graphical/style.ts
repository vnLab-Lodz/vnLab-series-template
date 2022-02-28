import { motion } from "framer-motion"
import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"
import * as Styled from "../../style"

export const Nav = styled(Styled.Nav)`
  @media ${devices.laptop} {
    position: relative;
  }
`

export const BaseContainer = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export const SlideNavContainer = styled(motion.div)`
  position: absolute;
  height: 100%;
  background: ${({ theme }) => theme.palette.black};
  right: 0;
  width: 100%;
  border-right: solid 1px ${({ theme }) => theme.palette.white};
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
`

export const ButtonsContainer = styled.div<{ spaced?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ spaced, theme }) => (spaced ? theme.spacing.xxl : 0)};
`

export const MediaBtn = styled.button`
  color: ${({ theme }) => theme.palette.white};
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 0px;
  padding: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  font-family: ${({ theme }) => theme.typography.fonts.primary};
  font-size: ${({ theme }) => theme.typography.sm};
  line-height: 1.36;
`

export const ArrowBtn = styled(MediaBtn)`
  padding: ${({ theme }) => theme.spacing.xxs};
`

export const ToggleBtn = styled(Styled.ToggleBtn)`
  z-index: 1;
  background: transparent;
  filter: none;

  ${({ open }) =>
    open &&
    css`
      filter: none;

      &&& > img {
        filter: brightness(10) !important;
      }
    `}
`
