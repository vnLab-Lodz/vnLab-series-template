const {
  wrapPageElement,
  onServiceWorkerUpdateReady,
  onServiceWorkerUpdateFound,
  onServiceWorkerInstalled,
} = require("./config/gatsby-browser")

exports.wrapPageElement = wrapPageElement
exports.onServiceWorkerUpdateReady = onServiceWorkerUpdateReady
exports.onServiceWorkerUpdateFound = onServiceWorkerUpdateFound
exports.onServiceWorkerInstalled = onServiceWorkerInstalled
