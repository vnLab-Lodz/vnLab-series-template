import spacing from "./spacing"
import typography from "./typography"

const theme = {
  palette: {
    black: "#222222",
    dark: "#707070",
    medium: "#BCBCBC",
    light: "F8F8F8",
    white: "#FFFFFF",
    primary: "#EBF8EA",
    secondary: "#EAF8F8",
    tertiary: "#ECEAF8",
    accent: "#F8EAEB",
    accentDark: "#6B4905",
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
