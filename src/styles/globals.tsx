import { createGlobalStyle } from "styled-components"
import { devices } from "./breakpoints"

export const Globals = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
  */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  *::selection {
    background: #fbfdbc; /* WebKit/Blink Browsers */
    color: #222222;
  }
  *::-moz-selection {
    background: #fbfdbc; /* Gecko Browsers */
    color: #222222;
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    font-size: ${({ theme }) => theme.typography.md};
    font-family: ${({ theme: { typography } }) => typography.fonts.primary};
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
    width: 100%;
    overscroll-behavior-y: contain;
  }
  html, body {
    min-height: 100vh;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  
  .no-scroll {
    overflow: hidden;
    padding-right: var(--scrollbarWidth);
  }

  .invisible {
    display: none !important;
  }

  .sizeable-icon {
    @media ${devices.desktop} {
      width: auto !important;
      height: 32px !important;
      
      &--small {
        height: 20px !important;
  
      }
    }
    
  }

  :root {
    /* spacing */
    --space-unit: 1.125rem;
    --space-xxs: calc(0.5 * var(--space-unit));
    --space-xs: var(--space-unit); 
    --space-sm: calc(1.2 * var(--space-unit));
    --space-md: calc(2 * var(--space-unit));
    --space-lg: calc(3 * var(--space-unit));
    --space-xl: calc(3.5 * var(--space-unit));
    --space-xxl: calc(4 * var(--space-unit));
    --space-xxxl: calc(6 * var(--space-unit));

    /* typography */
    --text-xxl: 48px;
    --text-xl: 32px;
    --text-lg: 22px;
    --text-md: 18px;
    --text-sm: 11px;
    
    @media ${devices.tablet} {
        --unit-base: 1.25rem;
  
        --text-xxl: 60px;
        --text-xl: 60px;
        --text-lg: 25px;
        --text-md: 20px;
        --text-sm: 11px;
    }

    @media ${devices.desktop} and (min-height: 1100px) {
        --unit-base: 1.5rem;
        --space-unit: 1.25rem;

  
        --text-xxl: 4.8rem;
        --text-xl: 4.8rem;
        --text-lg: 1.7rem;
        --text-md: 1.5rem;
        --text-sm: 0.9rem;
    }
  }
  
`
