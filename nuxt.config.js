const appConfig = require('./app.config')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Liste des critères - Checklist Pidila',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Checklist PiDILA'},
      {name: 'msapplication-TileColor', content: '#FFFFFF'},
      {name: 'msapplication-TileImage', content: 'favicon/favicon-144.png'}
    ],
    link: [
      {rel: 'icon', sizes: '16x16 32x32 48x48 64x64', type: 'image/x-icon', href: 'favicon.ico'},
      {rel: 'shortcut icon', href: 'favicon.ico', type: 'image/x-icon'},
      {rel: 'icon apple-touch-icon-precomposed', href: 'favicon/favicon-152.png'},
      {rel: 'apple-touch-icon', sizes: '152x152', href: 'favicon/favicon-152.png'},
      {rel: 'apple-touch-icon', sizes: '144x144', href: 'favicon/favicon-144.png'},
      {rel: 'apple-touch-icon', sizes: '120x120', href: 'favicon/favicon-120.png'},
      {rel: 'apple-touch-icon', sizes: '114x114', href: 'favicon/favicon-114.png'},
      {rel: 'apple-touch-icon', sizes: '72x72', href: 'favicon/favicon-72.png'},
      {rel: 'apple-touch-icon', href: 'favicon/favicon-57.png'}
    ],
    bodyAttrs: {
      class: 'body-class'
    },
    htmlAttrs: {
      lang: 'fr',
      dir: 'ltr'
    }
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#3B8070'},

  /*
  ** Load custom plugins
  */
  plugins: [
    '~/plugins/event-bus.js',
    '~/plugins/scroll-to.js',
    '~/plugins/on-click-outside.js',
    '~/plugins/set-page-title.js'
  ],

  /*
  ** Customize the generated output folder
  */
  generate: {
    dir: 'public'
  },

  /*
  ** Customize the base url
  */
  router: {
    base: appConfig.baseURL
  },

  /*
  ** Build configuration
  */
  build: {
    vendor: ['svgxuse', 'babel-polyfill'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  ignore: [
    '*/*.spec.*',
    '**/*.spec.*'
  ]
}
const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/checklist-pidila/dist/'
        }
      }
    : {}
export default {
  ...routerBase
}