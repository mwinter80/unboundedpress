//import { defineNuxtConfig } from 'nuxt3'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', 'nuxt-icon', '@pinia/nuxt', 'nuxt-headlessui', 'nuxt-swiper'],
  extends: ['nuxt-umami'],
  image: {
    domains: ['unboundedpress.org']
  },
  app: {
    //baseURL: "/dev/",
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      viewport: 'width=device-width'
    },
  },
  appConfig: {
    umami: {
      id: '51f4f246-9c2e-4a86-9ffb-7a7967d9013d',
      host: 'https://analytics.umami.is/',
      version: 2
    },
  },
  routeRules: {
    '/cv': { redirect: '/legacy/cv' },
    '/works_list': { redirect: '/legacy/works_list' },
    '/hdp': { redirect: '/a_history_of_the_domino_problem' },
  },
  nitro: {
    prerender: { crawlLinks: true}
  },
  experimental: {
    payloadExtraction: true
  }
})
