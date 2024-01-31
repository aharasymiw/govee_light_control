// this is running on the main thread
// it needs to register a service worker on it's own thread

// this could fail if service workers aren't supported, so test first
// Note the capital W!
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("serviceworker.js")
}
