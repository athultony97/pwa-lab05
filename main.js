// service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("service-worker.js", {
                scope: "/pwa-lab05/"
            })
            .then(registration => {
                console.log("Service Worker registered: ", registration)
            })
            .catch(registrationError => {
                console.log("Service Worker registration failed: ", registrationError)
            })
    })
}

