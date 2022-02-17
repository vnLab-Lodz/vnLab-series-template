import styled, { css } from "styled-components"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"

export const SlideImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 1 1 auto;
`

export const SlideAnnotation2 = styled.div`
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: calc(100vw / 32 * 16);
  max-width: calc(100vw / 32 * 16);

  @media ${devices.desktop} {
    min-width: clamp(0px, calc(100vw / 32 * 26), calc(26 * 1.125rem));
    max-width: clamp(0px, calc(100vw / 32 * 26), calc(26 * 1.125rem));
  }
`

export const AnnotationParagraph = styled(atoms.p)`
  text-align: left;
  font-size: ${({ theme: { typography } }) =>
    `calc(${typography.sm} * 1.3) !important`};
  color: ${({ theme: { palette } }) => palette.white};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const ExpandCaptionButton = styled.button`
  ${({ theme: { typography, palette } }) => css`
    font-familty: ${typography.fonts.primary};
    font-size: ${typography.sm};
    font-weight: normal;
    text-transform: lowercase;
    line-height: 115%;
    padding: 0px;
    text-align: right;
    background: transparent;
    border: none;
    cursor: pointer;
    height: fit-content;
    color: ${palette.white};
    margin-left: ${({ theme: { spacing } }) => spacing.md};
  `}
`

export const SlideContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-top: 100px;

  @media ${devices.laptop} {
    margin-left: calc(100vw / 32 * 2);
    margin-right: calc(100vw / 32 * 2);
  }

  /* width: ${({ theme }) => `calc(100% - 4 *${theme.spacing.xs})`};
  max-width: ${({ theme }) => `calc(100% - 4 *${theme.spacing.xs})`};
  height: ${({ theme }) => `calc(100% - 4 *${theme.spacing.xs} - 70px)`};
  max-height: ${({ theme }) => `calc(100% - 4 *${theme.spacing.xs} - 70px)`};
  margin: ${({ theme }) =>
    `calc(70px + 2 * ${theme.spacing.xs}) calc(2 * ${theme.spacing.xs}) calc(2 * ${theme.spacing.xs}) calc(2 * ${theme.spacing.xs})`};

  @media ${devices.tablet} {
    margin: ${({ theme }) => `calc(2 * ${theme.spacing.xs})`};
    height: ${({ theme }) => `calc(100% - 4 *${theme.spacing.xs})`};
    max-height: ${({ theme }) => `calc(100% - 4 *${theme.spacing.xs})`};
  } */
`
