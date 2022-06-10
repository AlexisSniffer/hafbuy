export default {
  head: {
    titleTemplate: '',
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      {
        rel: 'dns-prefetch',
        href: '//fonts.googleapis.com',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800,800italic%7CPoppins:300,400,500,600,700,800%7COswald:400,700',
      },
    ],
  },
  css: [
    '~/static/css/swiper.min.css',
    '~/static/css/animate.min.css',
    '~/static/css/bootstrap.min.css',
    '~/static/css/porto-icons.min.css',
    '~/static/vendor/fontawesome-free/css/all.min.css',
    '~/static/vendor/simple-line-icons/css/simple-line-icons.min.css',
    '~/static/sass/style.scss',
  ],
  plugins: [
    { src: '~/plugins', ssr: false },
    { src: '~/plugins/localstorage.js', ssr: false },
    { src: '~/plugins/filters.js', ssr: false },
    { src: '~/plugins/directives/animate.js', ssr: false },
    { src: '~/plugins/directives/parallax.js', ssr: false },
    { src: '~/plugins/directives/sticky.js', ssr: false },
  ],
  buildModules: ['@nuxtjs/style-resources', 'cookie-universal-nuxt'],
  modules: ['@nuxtjs/axios'],
  router: {
    base: '/',
    linkActiveClass: '',
    linkExactActiveClass: 'active',
  },
  /*build: {
    publicPath: 'http://hafbuy.com',
  },*/
  generate: {
    subFolders: false,
    fallback: '404.html',
  },
  ssr: false,
  loading: false,
  loadingIndicator: false,
  pageTransition: 'page',
  /*server: {
    port: 4000,
    host: 'localhost',
  },*/
}
