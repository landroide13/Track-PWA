
const staticTrackPWA = "dev-Track-PWA-App-v1"

const assets = [
    "/",
    "/index.html",
    "/CSS/style.css",
    "/CSS/bootstrap-icons.min.css",
    "/CSS/bootstrap.min.css",
    "/JS/main.js",
    "/JS/functions.js",
    "/JS/bootstrap.min.js",
    "/assets/Email-Tracking.png",
    "/assets/track1.jpeg",
    "/assets/icons/android-chrome-192x192.png",
    "/assets/icons/android-chrome-512x512.png",
    "/assets/icons/apple-touch-icon.png",
    "/assets/icons/favicon-16x16.png",
    "/assets/icons/favicon-32x32.png",
]


self.addEventListener("install", installEvent => {
    installEvent.waitUntil(

      caches.open(staticTrackPWA).then(cache => {
        cache.addAll(assets)

      })
    )
  })


















