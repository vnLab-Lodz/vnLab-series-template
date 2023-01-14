import styled, { css } from "styled-components"
import { devices } from "~styles/breakpoints"

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow-y: auto;
  width: 100%;
  text-align: left;

  padding-top: 100px;
  padding-bottom: 100px;

  /* &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0px;
    right: 0px;
    height: 150px;
    background-image: linear-gradient(
      0deg,
      rgba(34, 34, 34, 0),
      ${({ theme }) => theme.palette.black} 60px
    );

    @media ${devices.tablet} {
      left: 30px;
      right: 30px;
    }
  }

  &::after {
    position: absolute;
    content: "";
    bottom: 0;
    left: 0px;
    right: 0px;
    height: 150px;
    background-image: linear-gradient(
      0deg,
      ${({ theme }) => theme.palette.black} 90px,
      rgba(34, 34, 34, 0)
    );

    @media ${devices.tablet} {
      left: 30px;
      right: 30px;
    }
  } */
`

export const Text = styled.div`
  all: initial;
  ${({ theme: { typography, palette } }) => css`
    color: ${palette.white};
    margin: auto;
    font-family: ${typography.fonts.secondary};
    font-size: ${typography.md};
    font-weight: 300;
    font-style: normal;
    line-height: 150%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;

    max-width: calc(100vw / 32 * 30);

    @media ${devices.tablet} {
      max-width: calc(100vw / 32 * 23);
    }

    @media ${devices.laptop} {
      max-width: calc(100vw / 32 * 18);
    }
  `}
`
