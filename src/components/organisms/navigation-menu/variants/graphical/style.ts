import { motion } from "framer-motion"
import styled, { css } from "styled-components"
import { breakpoints, devices } from "~styles/breakpoints"
import * as Styled from "../../style"

export const Nav = styled(Styled.Nav)`
  background: ${({ theme }) => theme.palette.black};

  @media ${devices.tablet} {
    background: ${({ theme }) => theme.palette.white};
    position: relative;
  }
`

export const BaseContainer = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  @media ${devices.tablet} {
    flex-direction: column;
    justify-content: space-between;
  }

  @media (max-width: calc(${breakpoints.tablet} - 1px)) {
    border-bottom: solid 1px ${({ theme }) => theme.palette.white};
  }
`

export const SlideNavContainer = styled(motion.div)`
  position: absolute;
  height: 100%;
  height: -webkit-fill-available;
  background: ${({ theme }) => theme.palette.black};
  right: 0;
  width: 100%;
  border-right: solid 1px ${({ theme }) => theme.palette.white};
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`

export const ButtonsContainer = styled.div<{ spaced?: boolean }>`
  display: flex;
  margin-bottom: ${({ spaced, theme }) => (spaced ? theme.spacing.xxl : 0)};
  flex-direction: row;
  height: 100%;

  @media ${devices.tablet} {
    height: auto;
    width: 100%;
    flex-direction: column;
  }
`

export const MediaBtn = styled.button`
  color: ${({ theme }) => theme.palette.white};
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 0px;
  padding: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.typography.fonts.primary};
  font-size: ${({ theme }) => theme.typography.sm};
  line-height: 1.36;
  height: 100%;

  &:disabled {
    opacity: 0;
  }

  @media (max-width: calc(${breakpoints.tablet} - 1px)) {
    &:last-of-type {
      margin-right: ${({ theme }) => theme.spacing.xxs};
    }

    &:first-of-type {
      margin-left: ${({ theme }) => theme.spacing.xxs};
    }
  }

  @media ${devices.tablet} {
    height: auto;
    width: 100%;
  }
`

export const ArrowBtn = styled(MediaBtn)`
  padding-top: ${({ theme }) => theme.spacing.xxs};
  padding-bottom: ${({ theme }) => theme.spacing.xxs};
  padding-left: ${({ theme }) => `calc(${theme.spacing.xxs} * 1.25)`};
  padding-right: ${({ theme }) => `calc(${theme.spacing.xxs} * 1.25)`};
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

export const Icon = styled(motion.img)`
  @media (max-width: calc(${breakpoints.tablet} - 1px)) {
    filter: brightness(10) !important;
  }
`

export const BottomUtilityBar = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  pointer-events: all;
  margin-top: auto;
  grid-column: 1 / last-col;
  border-top: solid 1px ${({ theme }) => theme.palette.white};
  height: 60px;
  color: ${({ theme }) => theme.palette.white};
  background: ${({ theme }) => theme.palette.black};
`
