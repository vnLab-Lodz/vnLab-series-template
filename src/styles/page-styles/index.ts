import styled from "styled-components"
import { devices } from "~styles/breakpoints"
import LP from "~components/molecules/language-picker"
import { GridContainer } from "~styles/grid"
import lightTheme from "~styles/theme"

export const Background = styled(GridContainer)`
  background-color: ${({ theme }) => theme.palette.identity};
  height: 100vh;
  z-index: 8; // nav shows below 8
  position: absolute;
  inset: 0;

  grid-auto-rows: min-content min-content min-content 1fr min-content
    min-content;

  @media ${devices.tablet} {
    grid-auto-rows: min-content 1fr min-content min-content;
  }
`

export const Miscalaneous = styled.div`
  display: flex;
  flex-direction: column;
  grid-row: 2;
  grid-column: 1 / -1;

  @media ${devices.tablet} {
    flex-direction: row;
    min-height: 106px;
    grid-row: 1;
    grid-column: 6 / -1;
  }

  @media ${devices.laptop} {
    grid-column: 4 / -1;
  }
`

export const NavBtn = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 0px;
  background: none;

  height: fit-content;

  text-align: left;
  padding: ${({ theme: { spacing } }) => spacing.xs};

  grid-row: 1;
  grid-column: 1 / 5;

  @media ${devices.tablet} {
    text-align: center;
    min-height: 106px;
    grid-row: 1;
    grid-column: 1 / 4;
  }

  @media ${devices.laptop} {
    grid-column: 1 / 3;
  }

  filter: invert(1);
`

export const TocButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 0px;
  background: none;
  padding: 0;
  text-align: left;
  white-space: nowrap;

  height: fit-content;
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  padding-left: ${({ theme: { spacing } }) => spacing.xs};

  @media ${devices.tablet} {
    margin: 0;
    padding-left: 0;
  }

  p {
    text-transform: uppercase;
    font-weight: bold;
    font-size: ${({ theme }) => theme.typography.sm};
    color: ${lightTheme.palette.white};
    line-height: 150%;
    letter-spacing: 0.55px;
  }

  @media ${devices.tablet} {
    min-height: 106px;
  }
`

export const LanguagePicker = styled(LP)<{ flex?: boolean }>`
  grid-row: 3;
  grid-column: 1 / 8;
  padding-left: ${({ theme: { spacing } }) => spacing.xs};

  @media ${devices.tablet} {
    margin-left: ${({ theme }) => theme.spacing.md};
    padding-left: ${({ theme: { spacing } }) => spacing.xxs};
    height: 106px;
  }

  & > p {
    color: ${lightTheme.palette.white} !important;
  }
`

export const Spacer = styled.div`
  grid-row: 4;

  @media ${devices.tablet} {
    grid-row: 2;
  }
`

export const Title = styled.h1`
  margin-top: auto;

  font-family: ${({ theme }) => theme.typography.fonts.primary};
  font-weight: 300;
  font-size: ${({ theme }) => theme.typography.xl};
  color: ${lightTheme.palette.white};

  margin-bottom: ${({ theme }) => theme.spacing.xxs};
  padding-left: ${({ theme: { spacing } }) => spacing.xs};
  padding-right: ${({ theme: { spacing } }) => spacing.xs};

  grid-row: 5;
  grid-column: 2 / last-col;

  @media ${devices.tablet} {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    padding-left: 0;
    padding-right: 0;

    grid-row: 3;
    grid-column: 6 / last-col;
  }

  @media ${devices.laptop} {
    grid-row: 3;
    grid-column: 4 / last-col;
  }
`

export const Role = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.secondary};
  font-weight: 300;
  font-size: ${({ theme }) => theme.typography.sm};
  color: ${lightTheme.palette.white};

  margin-bottom: ${({ theme }) => theme.spacing.xxs};
`

export const People = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-left: ${({ theme: { spacing } }) => spacing.xs};
  align-self: end;

  grid-row: 6;
  grid-column: 2 / -4;

  @media ${devices.tablet} {
    padding-left: 0;
    grid-row: 4;
    grid-column: 6 / last-col;
  }

  @media ${devices.laptop} {
    grid-row: 4;
    grid-column: 4 / last-col;
  }
`

export const Person = styled.h2`
  font-family: ${({ theme }) => theme.typography.fonts.primary};
  font-weight: bold;
  font-size: ${({ theme }) => theme.typography.md};
  color: ${lightTheme.palette.white};
`

export const Logo = styled.img`
  margin: auto;
  height: 60px;
  filter: invert(1) brightness(10);

  margin-bottom: ${({ theme }) => theme.spacing.md};
  align-self: end;

  grid-row: 6 / 7;
  grid-column: -4 / -1;

  @media ${devices.tablet} {
    grid-row: 3 / 5;
    grid-column: 1 / 4;
  }

  @media ${devices.laptop} {
    grid-row: 3 / 5;
    grid-column: 1 / 3;
  }
`
