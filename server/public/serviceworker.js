// sometimes called sw.js, either is fine
// Do not import this into index.html like a client script.
console.log("hello from the service worker!");

// an array, probably of urls to get assets
const assets = ["styles.css", "client.js", "sw-register.js"];

// This is nice and all, but not enough
// we need to cache all of it, index.html too.
// we want to cache things, not file names, so use "/" not "index.html"
assets.push("/");

// we can cache assets from outside our scope, but we can only serve them to our scope
assets.push("https://unpkg.com/axios/dist/axios.min.js");

// We don't need to cache the icon or the manifest.  The app doesn't use them and if the PWA is running we have them.
// We do need any custom fonts or third party dependencies

self.addEventListener("install", event => {
    // Don't kill the service worker until this promise is resolved.
    // This is handy in case it takes more than the 40sec "no activity" limit to load things.
    event.waitUntil(
        // access the cache api
        // create it by opening it when it doesn't exist
        // this call could take a sec, so it's async!
        caches.open("assets").then(cache => {
            // We're doing this on install, so let's cache some assets!
            // cache.add() // <- this is also an option
            cache.addAll(assets);
        })
    )
});

// Great, we have everything cached, but we need to serve it up if we are offline.

// This is powerful, it's possible to create real problems.
// State while revalidate strategy

// // Example of intercepting request and checking it before passing it on
// self.addEventListener("fetch", event => {
//     // the url is always absolute
//     if (event.request.url === "http://localhost:5001/offline") {
//         const response = new Response(`You are offline!  You are at URL: ${event.request.url}`);
//         // respondWith takes in a response (sync) or a promise of a response (async)
//         event.respondWith(response);
//     } else {

//         return fetch(event.request);
//     }
// }


// // Cache first example
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request) // searching the cache
            .then(cachedResponse => {
                // if the request is in the cache, return it (a "cache HIT")
                if (cachedResponse) {
                    console.log("it's cached, return the cached copy!");
                    console.log("cachedResponse", cachedResponse);
                    return cachedResponse;
                } else {
                    // if it's not, go to the network (a "cache MISS")
                    console.log("it's not cached, pass it on to the network!");
                    return fetch(event.request);
                }
            })
    );
});  // This pattern is called "cache first"


// Network first example
// self.addEventListener('fetch', event => {
//     event.respondWith(
//         caches.match(event.request)
//             .then(cachedResponse => {
//                 // Even if the response is in the cache, we fetch it
//                 // and update the cache for future usage
//                 const fetchPromise = fetch(event.request).then(
//                     networkResponse => {
//                         caches.open("assets").then(cache => {
//                             cache.put(event.request, networkResponse.clone());
//                             return networkResponse;
//                         });
//                     });
//                 // We use the currently cached version if it's there
//                 return cachedResponse || fetchPromise; // cached or a network fetch
//             })
//     );
// });
