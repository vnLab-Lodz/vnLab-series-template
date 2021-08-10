import "styled-components"
import { Theme } from "../styles/theme"

declare module "*.svg" {
  const content: any
  export default content
}

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
