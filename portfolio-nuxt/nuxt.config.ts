//import { defineNuxtConfig } from 'nuxt3'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', 'nuxt-icon', '@pinia/nuxt', 'nuxt-headlessui', 'nuxt-swiper', 'nuxt-api-party'],
  extends: ['nuxt-umami'],
  image: {
    domains: ['unboundedpress.org']
  },
  app: {
    //baseURL: "/dev/",
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  appConfig: {
    umami: {
      id: '51f4f246-9c2e-4a86-9ffb-7a7967d9013d',
      host: 'https://analytics.umami.is/',
      version: 2
    },
  },
  apiParty: {
    endpoints: {
      jsonPlaceholder: {
        url: process.env.JSON_PLACEHOLDER_API_BASE_URL!,
        // Global headers sent with each request
        headers: {
          Authorization: `Bearer ${process.env.JSON_PLACEHOLDER_API_TOKEN!}`
        }
      }
    }
  },
  nitro: {
    prerender: { crawlLinks: true}
  },
  experimental: {
    payloadExtraction: true
  }
})
