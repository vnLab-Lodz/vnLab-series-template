const {
  wrapPageElement,
  onServiceWorkerUpdateReady,
  onServiceWorkerUpdateFound,
  onServiceWorkerInstalled,
  onServiceWorkerActive,
} = require("./config/gatsby-browser")

exports.wrapPageElement = wrapPageElement
exports.onServiceWorkerUpdateReady = onServiceWorkerUpdateReady
exports.onServiceWorkerUpdateFound = onServiceWorkerUpdateFound
exports.onServiceWorkerInstalled = onServiceWorkerInstalled
exports.onServiceWorkerActive = onServiceWorkerActive
