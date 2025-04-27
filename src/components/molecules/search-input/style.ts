import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"

export const Form = styled.form`
  display: grid;
  height: fit-content;
  grid-column: 1 / last-col;
  grid-template-columns: repeat(16, 1fr);
  margin-top: 66.5px;

  @media ${devices.tablet} {
    margin-top: ${({ theme }) => theme.spacing.sm};
    grid-column: 7 / -3;
    grid-template-columns: repeat(14, 1fr);
  }

  @media ${devices.laptop} {
    grid-column: 5 / 16;
    grid-template-columns: repeat(12, 1fr);
  }
`

export const Input = styled.input`
  ${({ theme: { spacing, palette, typography } }) => css`
    background: none;
    border: solid 1px ${palette.dark};
    padding: 0px 0px 0px ${spacing.sm};
    border-radius: 0;
    height: 100px;
    font-weight: bold;

    font-family: ${typography.fonts.primary};
    font-size: calc(${typography.sm} * 0.8);
    color: ${palette.black};

    &:focus-visible {
      outline-style: solid;
    }

    grid-column: 1 / -3;

    @media ${devices.tablet} {
      font-weight: normal;
      height: 50px;
      grid-column: 1 / -3;
    }

    @media ${devices.laptop} {
      grid-column: 1 / -3;
    }
  `}
`

export const SubmitBtn = styled.button`
  ${({ theme: { palette } }) => css`
    background: none;
    border-radius: 0;
    border: solid 1px ${palette.dark};
    border-left: none;
    cursor: pointer;
    grid-column: -3 / last-col;

    @media ${devices.tablet} {
      grid-column: -3 / last-col;
    }
    @media ${devices.laptop} {
      grid-column: -3 / last-col;
    }
  `}
`
