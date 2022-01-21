import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"

export const ImagesContainer = styled.div<{
  direction: "column" | "row"
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  width: ${({ theme }) => `calc(100% - 2 *${theme.spacing.xs})`};
  max-width: ${({ theme }) => `calc(100% - 2 *${theme.spacing.xs})`};

  height: ${({ theme }) => `calc(100% - 2 *${theme.spacing.xs} - 70px)`};
  max-height: ${({ theme }) => `calc(100% - 2 *${theme.spacing.xs} - 70px)`};
  padding: ${({ theme }) =>
    `calc(70px + ${theme.spacing.xs}) ${theme.spacing.xs} ${theme.spacing.xs} ${theme.spacing.xs}`};

  @media ${devices.tablet} {
    height: ${({ theme }) => `calc(100% - 2 *${theme.spacing.xs})`};
    max-height: ${({ theme }) => `calc(100% - 2 *${theme.spacing.xs})`};
    padding: ${({ theme }) => theme.spacing.xs};
  }
`

export const SlideImageWrapper = styled.div<{
  direction: "column" | "row"
}>`
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.xs};

  ${({ direction }) =>
    direction === "row"
      ? css`
          max-height: ${({ theme }) => `calc(100% - 4 *${theme.spacing.xs})`};
          /* max-width: ${({ theme }) => `calc(100%-2*${theme.spacing.xs})`}; */
          max-width: 57vh; // magic number that makes sur e the images are always spaced by the margin
        `
      : css`
          max-height: ${({ theme }) => `calc(50% - 2 *${theme.spacing.xs})`};
          max-width: ${({ theme }) => `calc(100% - 4 *${theme.spacing.xs})`};
        `};
`
