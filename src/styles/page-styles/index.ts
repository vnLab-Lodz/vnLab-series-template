import styled from "styled-components"
import { devices } from "~styles/breakpoints"
import { GridContainer } from "~styles/grid"
import lightTheme from "~styles/theme"

export const FloatingContainer = styled(GridContainer)`
  height: 100vh;
  pointer-events: none;
  z-index: 10;
  position: absolute;
  top: 66px;
  left: 0;
  right: 0;

  @media ${devices.tablet} {
    top: 0;
  }
`

export const FloatingContainerInner = styled.div`
  background-color: ${({ theme }) => theme.palette.identity};
  grid-column: 1 / -1;
  padding-left: calc((100vw / 32) * 2);
  padding-right: calc((100vw / 32) * 2);
  margin-bottom: calc(66px + 50vh);
  padding-top: ${({ theme }) => theme.spacing.xl};

  @media ${devices.tablet} {
    grid-column: 3 / 31;
    margin-bottom: calc((100vw / 32) * 2);
    padding-left: calc((100vw / 32) * 1);
    padding-right: calc((100vw / 32) * 1);
    padding-top: ${({ theme }) => theme.spacing.xxxl};
  }

  @media ${devices.laptop} {
    grid-column: 3 / 17;
    margin-bottom: 20vh;
  }

  grid-row: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const FloatingContainerArrow = styled.div`
  background-color: ${({ theme }) => theme.palette.identity};
  display: none;

  @media ${devices.tablet} {
    display: flex !important;
    grid-column: 1 / 4;
  }

  @media ${devices.laptop} {
    grid-column: 1 / 3;
  }

  grid-column: 1 / 3;
  grid-row: 1;
  align-self: end;
  justify-content: center;
  align-items: flex-end;
  height: 90vh;
  width: 100%;
  padding-bottom: ${({ theme }) => theme.spacing.md};
`

export const FloatingSpacer = styled.div`
  height: calc(150vh);

  @media ${devices.tablet} {
    height: calc(190vh + calc((100vw / 32) * 2));
  }

  @media ${devices.laptop} {
    height: 190vh;
  }
`

export const TableOfContentsContainer = styled(GridContainer)`
  display: contents;

  & > * {
    display: contents;
  }

  & > * > * {
    width: 100%;
  }
`

export const TableOfContentsInner = styled.div`
  background: ${({ theme }) => theme.palette.white} !important;
  width: 100vw;

  @media ${devices.tablet} {
    width: calc(calc((100vw / 32) * 30) - calc((100vw / 32) * 3));
    margin-left: calc((100vw / 32) * 3);
  }

  @media ${devices.laptop} {
    width: calc(50vw - calc((100vw / 32) * 2));
    margin-left: calc((100vw / 32) * 2);
  }
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.fonts.secondary};
  font-weight: 300;
  font-size: ${({ theme }) => theme.typography.xl};
  text-wrap: balance;
  color: ${lightTheme.palette.white};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const Caption = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.primary};
  font-weight: normal;
  font-size: ${({ theme }) => theme.typography.sm};
  color: ${lightTheme.palette.white};
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
`

export const Author = styled.h2`
  font-family: ${({ theme }) => theme.typography.fonts.primary};
  font-weight: bold;
  font-size: ${({ theme }) => theme.typography.md};
  color: ${lightTheme.palette.white};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

export const FixedFullScreenImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1000;
`

export const FixedFullScreenVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1000;
`
