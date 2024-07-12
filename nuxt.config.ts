// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-nodemailer',
    '@nuxtjs/supabase'
  ],
  ssr: false,
  css: ['~/assets/css/main.css'],
  devServer: {
    https: {
      key: 'localhost-key.pem',
      cert: 'localhost.pem'
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  nodemailer: {
    from: `"3PhotoLib" <${import.meta.env.NUXT_NODEMAILER_AUTHUSER}>`,
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: import.meta.env.NUXT_NODEMAILER_AUTHUSER,
      pass: import.meta.env.NUXT_NODEMAILER_AUTHPASS 
    }
  },
  supabase: {
    redirect: false,
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
