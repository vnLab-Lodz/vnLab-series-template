import { WrapRootElementNodeArgs } from "gatsby"
import { ThemeProvider } from "styled-components"
import theme from "../src/styles/theme"
import React from "react"
import { Globals } from "../src/styles/globals"
import HypothesisManager from "~components/organisms/hypothesis-manager"

export const wrapRootElement = ({ element }: WrapRootElementNodeArgs) => (
  <ThemeProvider theme={theme}>
    <HypothesisManager>
      <Globals />
      {element}
    </HypothesisManager>
  </ThemeProvider>
)
