import styled, { css } from "styled-components"

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow-y: auto;
  max-height: calc(100vh - 200px);
  width: 100%;
  text-align: left;

  padding-top: 100px;
  padding-bottom: 100px;

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 30px;
    right: 30px;
    height: 150px;
    background: linear-gradient(
      0deg,
      transparent,
      ${({ theme }) => theme.palette.black} 60px
    );
  }

  &::after {
    position: absolute;
    content: "";
    bottom: 0;
    left: 30px;
    right: 30px;
    height: 150px;
    background: linear-gradient(
      0deg,
      ${({ theme }) => theme.palette.black} 90px,
      transparent
    );
  }
`

export const Text = styled.div`
  all: initial;
  ${({ theme: { typography } }) => css`
    margin: auto;
    font-family: ${typography.fonts.secondary};
    font-size: ${typography.md};
    font-weight: 300;
    font-style: normal;
    line-height: 150%;
    max-width: 50%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `}
`
