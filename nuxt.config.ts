// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  ssr: false,
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    base: '/',
    },

})
