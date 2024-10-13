/** @type {import("tailwindcss").Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["arial", "sans-serif"]
            },
            colors: {
                "light-black": "#010D00",
                "port-brown": "#BFB2AA",
                "AR-Grey": "#3E403F",
                "AR-Beige": "#F2EBDF",
                "AR-Light-Grey": "#6C6C6C",
                "AR-Extra-Light-Grey": "#888",
                "AR-Floral-White": "#FFFAF0",
                "AR-Dark-Grey": "#292929",
                "AR-Green": "#4ca444",
                "card-border": "#846700",
                "card-border-dark": "#4A3936",
                "card-background": "#F5DBAF",
                "card-background-dark": "#242424",
                "card-text-dark": "#DECDC3"
            }
        }
    },
    darkMode: "selector",
    plugins: []
};
