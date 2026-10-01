require('dotenv').config()

module.exports = {
  //mode: 'universal',

  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'Sam Whaley Sailing',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'renderer', content: 'webkit' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { hid: 'description', name: 'description', content: 'Follow Sam Whaley chase his dreams as he aspires to win a medal at the Olympic Games.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Manrope:300,400,600,800|Roboto:300,400&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: false,
  /*
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/global.js', ssr: false },
    { src: '~/plugins/global-components.js'}
  ],

  //Express Email sending with MailGun
  serverMiddleware: [
    '~/api/contact'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/google-analytics'  
  ],

  googleAnalytics: {
    id: process.env.GA_ID || ''
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    '@nuxtjs/markdownit',
    '@nuxtjs/style-resources',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['faPlus', 'faMinus', 'faChevronDown', 'faHeart']
        },
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['faInstagram', 'faFacebook', 'faTwitter']
        }
      ]
    }],
      ['nuxt-gmaps', {
        key: process.env.GMAPS,
      }]

  ],

  markdownit: {  
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true
  },

  styleResources: {
    scss: [
      '~/assets/scss/var.scss'
    ]
  },

  /*
  ** Global CSS
  */
  css: [
    { src: '~assets/scss/main.scss', lang: 'scss' }
  ],

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.GRAPHQL_URL || 'https://sw-backend.herokuapp.com/graphql'
      }
    }
  },

  pageTransition: {
    name: '',
    mode: 'out-in'
  },
  /*
  ** Build configuration
  */
  env: {  
    strapiBaseUri: process.env.API_URL || "https://sw-backend.herokuapp.com",
    GMAPS: process.env.GMAPS
  },

  build: {
    extractCSS: true,
    optimization :{
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: 'test',
        maxSize : 456000
      }
    },
    postcss: {
      plugins: {
        'postcss-import': true,
      },
      preset: {
        autoprefixer: {
          grid: true,
          flex: true
        }
      }
    },
  
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
