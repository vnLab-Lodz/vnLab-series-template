import styled from "styled-components"
import atoms from "~components/atoms"
import { devices } from "~styles/breakpoints"

export const SlideImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 1 1 auto;
`

export const SlideAnnotation = styled.div`
  flex: 1 0 auto;
  margin: ${({ theme: { spacing } }) =>
    `${spacing.xs} ${spacing.xs} 0 ${spacing.xs}`};

  @media ${devices.tablet} {
    margin: ${({ theme: { spacing } }) =>
      `${spacing.xs} ${spacing.xxxl} 0 ${spacing.xxxl}`};
  }

  @media ${devices.tablet} {
    margin: ${({ theme: { spacing } }) =>
      `${spacing.xs} ${spacing.xl} 0 ${spacing.xl}`};
  }
`

export const AnnotationParagraph = styled(atoms.p)`
  text-align: left;
  font-size: ${({ theme: { typography } }) =>
    `calc(${typography.sm} * 1.3) !important`};
`

export const SlideContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
`
