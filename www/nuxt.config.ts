// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: false},
  pages: true,
  modules: ['@nuxtjs/sanity'],
  css: ['~/assets/styles/globals.scss'],
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID,
    useCdn: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/_functions.scss" as *;',
        },
      },
    },
  },
})
