import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"

export const SlideImageWrapper = styled.div<{ fullscreen?: boolean }>`
  display: flex;
  justify-content: center;
  width: ${({ theme }) => `calc(100% - 4 *${theme.spacing.xs})`};
  max-width: ${({ theme }) => `calc(100% - 4 *${theme.spacing.xs})`};
  height: ${({ theme }) => `calc(100% - 4 *${theme.spacing.xs} - 70px)`};
  max-height: ${({ theme }) => `calc(100% - 4 *${theme.spacing.xs} - 70px)`};
  margin: ${({ theme }) =>
    `calc(70px + 2 * ${theme.spacing.xs}) calc(2 * ${theme.spacing.xs}) calc(2 * ${theme.spacing.xs}) calc(2 * ${theme.spacing.xs})`};

  @media ${devices.tablet} {
    margin-top: 100px;
    margin-bottom: 100px;
    margin-left: calc(100vw / 32 * 2);
    margin-right: calc(100vw / 32 * 2);
    max-width: calc(100vw / 32 * 25);
    height: calc(100vh - 200px);
    max-height: calc(100vh - 200px);
  }

  @media ${devices.laptop} {
    margin-left: calc(100vw / 32 * 2);
    margin-right: calc(100vw / 32 * 2);
    max-width: calc(100vw / 32 * 26);
  }

  ${({ fullscreen }) =>
    fullscreen &&
    css`
      width: 100%;
      max-width: 100%;
      height: calc(100% - 65px);
      max-height: calc(100% - 65px);
      margin: 65px 0px 0px 0px;

      @media ${devices.tablet} {
        height: 100vh;
        max-height: 100vh;
        margin: 0;
      }
    `}
`
