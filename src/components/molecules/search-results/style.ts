import styled from "styled-components"
import { devices } from "~styles/breakpoints"
import { Summary } from "../toc-element/style"

export const ResultsWrapper = styled.div`
  padding-top: ${({ theme }) => theme.spacing.md};
  grid-column: 2 / last-col;
  margin-left: -6vw; // offset 2 grid fractions
  
  @media ${devices.tablet} {
    grid-column 7 / -3;
  }
  
  @media ${devices.laptop} {
    margin-left: -4vw;
    grid-column 5 / 13;
    
    ${Summary} {
      width: 400%;
    }
  }

`
