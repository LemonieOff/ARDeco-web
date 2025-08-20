// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
    modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@nuxt/icon", "@nuxtjs/google-fonts"],
    icon: {
        serverBundle: {
            collections: []
        }
    },
    nitro: {
        compressPublicAssets: true,
        minify: true
    },
    css: ["@/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
            cssnano: {}
        }
    },
    experimental: {
        componentIslands: {
            selectiveClient: true
        },
        defaults: {
            nuxtLink: {
                prefetch: false
            }
        }
    },
    image: {
        format: ["webp", "png", "jpg", "gif"],
        domains: ["localhost", "ardeco.app"],
        ipx: {
            maxAge: 60 * 60 * 24 * 365
        }
    },
    googleFonts: {
        families: {
            Roboto: {
                wght: [100, 200, 300, 400, 500, 600, 700, 800, 900], // All weights
                ital: [100, 200, 300, 400, 500, 600, 700, 800, 900]  // All italic weights
            }
        },
        subsets: ["latin", "latin-ext"],
        display: "swap",
        download: false
    },
    compatibilityDate: "2024-10-16",
    runtimeConfig: {
        public: {
            frontendHost: process.env.FRONTEND_HOST,
            backendHost: process.env.BACKEND_HOST
        }
    }
});
