export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    'nuxt-windicss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/apollo'
  ],

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:1337/graphql',
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  axios: {
    baseURL: process.env.STRAPI_URL || 'http://localhost:1337/api'
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'auth/local',
            method: 'post',
            propertyName: 'jwt'
          },
          user: {
            url: 'users/me',
            method: 'get',
            propertyName: false
          },
          logout: false
        }
      }
    }
  },
}
