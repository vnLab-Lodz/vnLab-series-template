import { motion } from "framer-motion"
import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"

export const Form = styled.form`
display: grid;
height: fit-content;
grid-column: 1 /last-col;
grid-template-columns: repeat(16, 1fr);
margin-top: 66.5px;

@media ${devices.tablet} {
  margin-top: ${({ theme }) => theme.spacing.sm};
  grid-column 7 / -3;
  grid-template-columns: repeat(14, 1fr)
}

@media ${devices.laptop} {
  grid-column 5 / 15;
  grid-template-columns: repeat(12, 1fr)
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
    font-size: ${typography.sm};
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

export const Tabs = styled.div`
display: flex;
margin-top: ${({ theme }) => theme.spacing.sm};
grid-column: 2 /last-col;
position: relative;

@media ${devices.tablet} {
  grid-column 7 / -3;
}

@media ${devices.laptop} {
  grid-column 5 / 13;
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
