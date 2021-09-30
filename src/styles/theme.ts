import spacing from "./spacing"
import typography from "./typography"

const theme = {
  palette: {
    black: "rgba(34, 34, 34, 1)",
    dark: "rgba(51, 51, 51, 1)",
    medium: "rgba(188, 188, 188, 1)",
    light: "rgba(248, 248, 248, 1)",
    white: "rgba(255, 255, 255, 1)",
    primary: "rgba(235, 248, 234, 1)",
    secondary: "rgba(234, 248, 248, 1)",
    tertiary: "rgba(236, 234, 248, 1)",
    accent: "rgba(248, 234, 235, 1)",
    accentDark: "rgba(107, 73, 5, 1)",
    transparentBlack: "rgba(0, 0, 0, 0)",
    transparentWhite: "rgba(255, 255, 255, 0)",
  },
  typography: {
    fonts: {
      primary: "'HK-Grotesk', sans-serif",
      secondary: "'CrimsonPro', serif",
    },
    ...typography,
  },
  spacing,
} as const

export type Theme = typeof theme

export default theme
