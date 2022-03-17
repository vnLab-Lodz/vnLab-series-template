import styled from "styled-components"
import FooterElement from "~components/molecules/footer-element"
import { SummaryButton } from "~components/molecules/footer-element/style"
import { devices } from "~styles/breakpoints"
import { GridContainer } from "~styles/grid"

export const SlideOverlay = styled(GridContainer)`
  z-index: 11;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
`

export const SlideOverlayPaper = styled.div`
  background: ${({ theme }) => theme.palette.white};
  border-left: solid 1px ${({ theme }) => theme.palette.black};
  display: grid;
  overflow-x: auto;

  grid-column: 5 / last-col;
  grid-template-columns: repeat(28, 1fr);

  @media ${devices.tablet} {
    grid-column: 10 / last-col;
    grid-template-columns: repeat(22, 1fr);
  }

  @media ${devices.laptop} {
    grid-column: 19 / last-col;
    grid-template-columns: repeat(13, 1fr);
  }
`

export const NextChapter = styled(FooterElement)`
  max-width: none;
  width: 100%;
  outline: none;
  display: flex;
  justify-content: center;
  flex-direction: column;

  ::before {
    display: none;
  }

  ${SummaryButton} {
    text-align: left;
  }

  grid-column: 3 / -3;

  @media ${devices.tablet} {
    grid-column: 4 / -4;
  }

  @media ${devices.laptop} {
    grid-column: 3 / -3;
  }
`
