import spacing from "./spacing"
import typography from "./typography"

export const lightTheme = {
  palette: {
    black: "rgba(17, 17, 17, 1)",
    dark: "rgba(51, 51, 51, 1)",
    medium: "rgba(188, 188, 188, 1)",
    light: "rgba(251, 251, 251, 1)",
    white: "rgba(255, 255, 255, 1)",
    primary: "rgba(235, 248, 234, 1)",
    secondary: "rgba(234, 248, 248, 1)",
    tertiary: "rgba(236, 234, 248, 1)",
    quaternary: "rgba(248, 247, 234, 1)",
    accent: "rgba(248, 234, 235, 1)",
    accentDark: "rgba(107, 73, 5, 1)",
    transparentBlack: "rgba(0, 0, 0, 0)",
    transparentWhite: "rgba(255, 255, 255, 0)",
    identity: "rgba(3, 66, 77, 1)",
    identityLight: "rgba(3, 66, 77, 0.9)",
  },
  typography: {
    fonts: {
      primary: "'Poppins', sans-serif",
      secondary: "'Crimson Pro', serif",
    },
    ...typography,
  },
  spacing,
}

export const darkTheme = {
  ...lightTheme,
  palette: {
    white: "rgba(0, 0, 0, 1)",
    light: "rgba(17, 17, 17, 1)",
    medium: "rgba(188, 188, 188, 1)",
    dark: "rgba(251, 251, 251, 1)",
    black: "rgba(255, 255, 255, 1)",
    primary: "rgba(235, 248, 234, 1)",
    secondary: "rgba(234, 248, 248, 1)",
    tertiary: "rgba(236, 234, 248, 1)",
    quaternary: "rgba(248, 247, 234, 1)",
    accent: "rgba(248, 234, 235, 1)",
    accentDark: "rgba(107, 73, 5, 1)",
    transparentBlack: "rgba(0, 0, 0, 0)",
    transparentWhite: "rgba(255, 255, 255, 0)",
    identity: "rgba(3, 66, 77, 1)",
    identityLight: "rgba(3, 66, 77, 0.9)",
  },
}

export type Theme = typeof lightTheme

export default lightTheme
