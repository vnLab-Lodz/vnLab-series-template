import { isFirefox } from "./isFirefox"

export function getSupportedFitContent() {
  return isFirefox() ? "-moz-fit-content" : "fit-content"
}
