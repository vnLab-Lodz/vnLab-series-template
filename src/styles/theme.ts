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
    desktop: {
      xl: "60px",
      lg: "25px",
      md: "20px",
      sm: "13px",
    },
    mobile: {
      xxl: "48px",
      xl: "32px",
      lg: "22px",
      md: "18px",
      sm: "13px",
    },
  },
  spacing: {
    xxxl: "calc(var(--unit-base) * 6)",
    xxl: "calc(var(--unit-base) * 4)",
    xl: "calc(var(--unit-base) * 3.5)",
    lg: "calc(var(--unit-base) * 3)",
    md: "calc(var(--unit-base) * 2)",
    sm: "calc(var(--unit-base) * 1.2)",
    xs: "var(--unit-base)",
    xxs: "calc(var(--unit-base) * 0.5)",
  },
} as const

export type Theme = typeof theme

export default theme
