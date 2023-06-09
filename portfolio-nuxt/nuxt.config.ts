// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', 'nuxt-icon', '@pinia/nuxt'],
  image: {
    domains: ['unboundedpress.org']
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  }
})
