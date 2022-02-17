import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"

export const ImagesContainer = styled.div<{
  direction: "column" | "row"
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: center;
  align-items: center;
`

export const SlideImageWrapper = styled.div<{
  direction: "column" | "row"
}>`
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.xxs};

  ${({ direction }) =>
    direction === "row"
      ? css`
          max-height: ${({ theme }) =>
            `calc(100vh - 260px - 2 * ${theme.spacing.xxs})`};

          @media ${devices.tablet} {
            max-height: ${({ theme }) =>
              `calc(100vh - 200px - 2 * ${theme.spacing.xxs})`};
          }
        `
      : css`
         max-height: ${({ theme }) =>
           `calc((100vh - 260px - 4 * ${theme.spacing.xxs}) / 2)`};

          @media ${devices.tablet} {
            max-height: ${({ theme }) =>
              `calc((100vh - 200px - 4 * ${theme.spacing.xxs}) / 2)`};
      `};
`
