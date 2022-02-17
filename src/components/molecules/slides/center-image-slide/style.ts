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
    margin: ${({ theme }) => `calc(2 * ${theme.spacing.xs})`};
    height: ${({ theme }) => `calc(100% - 4 *${theme.spacing.xs})`};
    max-height: ${({ theme }) => `calc(100% - 4 *${theme.spacing.xs})`};
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
