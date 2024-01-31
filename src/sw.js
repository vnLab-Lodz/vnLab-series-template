self.addEventListener("message", event => {
  console.log("SW Received Message: ", event.data)
  if (event.data && event.data.type === "CACHE_PUBLICATION") {
    console.log("SW message type matched: ", event.data.type)
    const { payload } = event.data
    console.log("SW Caching URL")

    event.waitUntil(cacheUrls(payload.urlsToCache))
    console.log("SW CACHED")

    // event.waitUntil(registerCachedUrls(event.data.payload))
    payload.forEach(url => {
      const navigationRoute = new NavigationRoute(async ({ event }) => {
        console.log("I HAVE MATCHED")
        const regex = new RegExp(`.*${url}(/index.html|/index|/*)`)
        if (regex.test(event.request.url)) return await fetch(event.request)
        const resource = await caches.match(resource)
        if (!resource) return await fetch(event.request)
        return resource
      })

      workbox.routing.registerRoute(navigationRoute)

      // workbox.routing.registerRoute(
      //   new RegExp(`.*${url}(/index.html|/index|/*)`),
      //   new workbox.strategies.CacheFirst({
      //     cacheName: `download__${workbox.core.cacheNames.runtime}`,
      //   }),
      //   "GET"
      // )
    })

    console.log("SW Done")
  }
})

async function cacheUrls(urls) {
  const cache = await caches.open(
    `download__${workbox.core.cacheNames.runtime}`
  )
  await cache.addAll(urls)
}

workbox.routing.setCatchHandler(async ({ event }) => {
  console.log("I HAVE CAUGHT THE ERROR BS")
  console.log(event)
  const resource = await caches.match(event.request.url)
  if (!resource) return await fetch(event.request)
  return resource
})

workbox.routing.registerRoute(
  "http:/localhost:3000/chapter_11/",
  new workbox.strategies.CacheFirst({
    cacheName: `download__${workbox.core.cacheNames.runtime}`,
  }),
  "GET"
)

// async function registerCachedUrls(urls) {
//   urls.map(
//     url =>
//       new Promise(resolve => {

//         resolve()
//       })
//   )

//   await Promise.all(promises)
// }
