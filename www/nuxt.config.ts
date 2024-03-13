// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: false},
  pages: true,
  modules: ['@nuxtjs/sanity', '@pinia/nuxt'],
  build: {
    transpile: ['sanity', 'rxjs', 'lenis'],
  },
  // css: ['~/assets/styles/globals.scss'],
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
