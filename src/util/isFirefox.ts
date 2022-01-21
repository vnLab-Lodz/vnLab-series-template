export function isFirefox() {
  return typeof navigator === "undefined"
    ? false
    : navigator.userAgent.toLowerCase().indexOf("firefox") > -1
}
