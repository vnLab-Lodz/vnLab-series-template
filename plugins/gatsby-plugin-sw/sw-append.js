/* global importScripts, workbox, idbKeyval */
importScripts(`%idbKeyValVersioned%`)

const { NavigationRoute } = workbox.routing

let lastNavigationRequest = null
let offlineShellEnabled = true

// prefer standard object syntax to support more browsers
const MessageAPI = {
  setPathResources: (event, { path, resources }) => {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources: event => {
    event.waitUntil(idbKeyval.clear())

    // We detected compilation hash mismatch
    // we should clear runtime cache as data
    // files might be out of sync and we should
    // do fresh fetches for them
    event.waitUntil(
      caches.keys().then(function (keyList) {
        return Promise.all(
          keyList.map(function (key) {
            if (key && key.includes(`runtime`)) {
              return caches.delete(key)
            }

            return Promise.resolve()
          })
        )
      })
    )
  },

  enableOfflineShell: () => {
    offlineShellEnabled = true
  },

  disableOfflineShell: () => {
    offlineShellEnabled = false
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi: api } = event.data
  if (api) MessageAPI[api](event, event.data)
})

function handleAPIRequest({ event }) {
  const { pathname } = new URL(event.request.url)

  const params = pathname.match(/:(.+)/)[1]
  const data = {}

  if (params.includes(`=`)) {
    params.split(`&`).forEach(param => {
      const [key, val] = param.split(`=`)
      data[key] = val
    })
  } else {
    data.api = params
  }

  if (MessageAPI[data.api] !== undefined) {
    MessageAPI[data.api]()
  }

  if (!data.redirect) {
    return new Response()
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: lastNavigationRequest,
    },
  })
}

const navigationRoute = new NavigationRoute(async ({ event }) => {
  // handle API requests separately to normal navigation requests, so do this
  // check first
  if (event.request.url.match(/\/.gatsby-plugin-offline:.+/)) {
    return handleAPIRequest({ event })
  }

  if (!offlineShellEnabled) {
    return await fetch(event.request)
  }

  lastNavigationRequest = event.request.url

  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^%pathPrefix%`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`%pathPrefix%/%appFile%`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      console.log(`SW: Cache miss for ${resource}`)
      return await fetch(event.request)
    }
  }

  const offlineShell = `%pathPrefix%/offline-plugin-app-shell-fallback/index.html`
  const offlineShellWithKey = workbox.precaching.getCacheKeyForURL(offlineShell)
  return await caches.match(offlineShellWithKey)
})

workbox.routing.registerRoute(navigationRoute)

// this route is used when performing a non-navigation request (e.g. fetch)
workbox.routing.registerRoute(/\/.gatsby-plugin-offline:.+/, handleAPIRequest)

// WARNING: Added `downloadPages and event listener to the original plugin
// This will be replaced with pages that need to be precached
const downloadPages = []

self.addEventListener("message", event => {
  if (event.data && event.data.type === "CACHE_PUBLICATION") {
    console.log("SW: DOWNLOADING ALL PAGES FOR OFFLINE USE")
    event.waitUntil(
      (async () => {
        const cache = await caches.open(workbox.core.cacheNames.runtime)
        await cache.addAll([
          ...downloadPages,
          ...downloadPages
            .filter(
              page =>
                page.includes("chapter") ||
                page.includes("search") ||
                page.includes("hypothesis_tutorial")
            )
            .flatMap(page => [`page-data${page}page-data.json`])
            .concat(["/page-data/app-data.json"]),
        ])

        downloadPages
          .filter(
            page =>
              page.includes("chapter") ||
              page.includes("search") ||
              page.includes("hypothesis_tutorial")
          )
          .forEach(url => {
            MessageAPI.setPathResources(event, {
              path: url,
              resources: [url, `page-data${url}page-data.json`].concat([
                "/page-data/app-data.json",
              ]),
            })
          })
      })()
    )
    console.log("SW: DOWNLOAD OF ALL PAGES FOR OFFLINE USE COMPLETE")
  }
})
