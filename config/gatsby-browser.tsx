import { WrapRootElementNodeArgs } from "gatsby"
import { ThemeProvider } from "styled-components"
import theme from "../src/styles/theme"
import React from "react"
import { Globals } from "../src/styles/globals"
import HypothesisManager from "~components/organisms/hypothesis-manager"
import ScrollContextProvider from "src/context/scroll-context"
import HypothesisContextProvider from "src/context/hypothesis-context"

export const wrapRootElement = ({ element }: WrapRootElementNodeArgs) => (
  <ThemeProvider theme={theme}>
    <HypothesisContextProvider>
      <HypothesisManager>
        <ScrollContextProvider>
          <Globals />
          {element}
        </ScrollContextProvider>
      </HypothesisManager>
    </HypothesisContextProvider>
  </ThemeProvider>
)
