// https://nuxt.com/docs/api/configuration/nuxt-config
import {defineNuxtConfig} from "nuxt/config";

export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', "@nuxt/image", "@nuxt/icon", "@nuxtjs/google-fonts"],
    icon: {
        serverBundle: {
            collections: []
        }
    },
    nitro: {
        compressPublicAssets: true,
        minify: true
    },
    css: ['@/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
            cssnano: {}
        },
    },
    image: {
        format: ['webp', 'png', 'jpg', 'gif'],
        domains: ['localhost', 'ardeco.app'],
        ipx: {
            maxAge: 60 * 60 * 24 * 365,
        }
    },
    googleFonts: {
        families: {
            Roboto: {
                wght: [100, 200, 300, 400, 500, 600, 700, 800, 900], // All weights
                ital: [100, 200, 300, 400, 500, 600, 700, 800, 900]  // All italic weights
            },
        },
        subsets: ['latin', 'latin-ext'],
        text: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%C3%A9%C3%A0%C3%A8%C3%B9%C3%A2%C3%AA%C3%AE%C3%B4%C3%BB%C3%A7%C3%AB%C3%AF%C3%BC%C5%93%C3%A6%C3%80%C3%82%C3%86%C3%87%C3%89%C3%88%C3%8A%C3%8B%C3%8E%C3%8F%C3%94%C5%92%C3%99%C3%9B%C3%9C%C5%B8%3B%21%40%23%24%E2%82%AC%25%5E%26%2A%28%29-_%3D%2B%5B%5D%7B%7D%3B%3A%27%22%2C%3C.%3E%2F%3F%5C%7C%60~",
        display: 'swap',
        download: false
    }
})
