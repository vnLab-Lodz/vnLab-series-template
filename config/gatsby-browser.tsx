import { WrapRootElementNodeArgs } from "gatsby"
import { ThemeProvider } from "styled-components"
import theme from "../src/styles/theme"
import React from "react"

export const wrapRootElement = ({ element }: WrapRootElementNodeArgs) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
)
