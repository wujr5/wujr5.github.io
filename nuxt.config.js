const path = require('path')
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'wujr5.github.io',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/css/reset.css' },
      { rel: 'stylesheet', href: '/css/atom.css' },
      { rel: 'stylesheet', href: '/css/atom-common.css' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  build: {
    extend(config, ctx) {
      // 处理原子类
      config.module.rules.push({
        test: /\.vue$/,
        include: [
          path.resolve(__dirname, 'pages'),
          path.resolve(__dirname, 'components'),
          path.resolve(__dirname, 'layouts')
        ],
        use: [
          {
            loader: './loader/atom-loader.js',
            options: {
              // 是否开启调试
              debug: false
            }
          }
        ],
        exclude: /(node_modules)/
      });

      if (!ctx.isDev) {
        config.plugins.push(
          new PurgecssPlugin({
            paths: glob.sync([
              path.join(__dirname, './pages/**/*.vue'),
              path.join(__dirname, './layouts/**/*.vue'),
              path.join(__dirname, './components/**/*.vue')
            ]),
            // ql-container 和 ql-editor 是内容专题可能会使用的样式
            whitelist: ['html', 'body', 'ql-container', 'ql-editor'],
            whitelistPatternsChildren: [/ql-container$/, /ql-editor$/]
          })
        );
      }
    }
  },
  axios: {
    proxy: true
  },
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  // 执行 npm run generate 后，生成的文件放在 docs 目录下
  generate: {
    dir: 'docs'
  }
}
