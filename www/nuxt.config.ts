// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: false},
  pages: true,
  routeRules: {
    '/': {prerender: true},
    '/archive': {prerender: true},
    '/work/**': {prerender: true},
  },
  modules: ['@nuxtjs/sanity', '@pinia/nuxt', 'nuxt-swiper', '@nuxtjs/device'],
  build: {
    transpile: ['sanity', 'rxjs', 'lenis', 'nuxt-swiper'],
  },
  device: {
    refreshOnResize: true,
  },
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID,
    apiVersion: '2023-03-03',
    useCdn: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/styles/globals.scss";`,
        },
      },
    },
  },
})
