import { action } from "@storybook/addon-actions"
import { ThemeProvider } from "styled-components"
import { Globals } from "../src/styles/globals"
import theme from "../src/styles/theme"

global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
global.__BASE_PATH__ = "/"

window.___navigate = pathname => {
  action("NavigateTo:")(pathname)
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  Story => (
    <ThemeProvider theme={theme}>
      <Globals />
      <Story />
    </ThemeProvider>
  ),
]
