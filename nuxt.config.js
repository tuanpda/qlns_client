export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Hệ thống Quản lý nhân sự - HRM",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/icon.png" },
      // {
      //   rel: "stylesheet",
      //   href: "/fontawesome-free-6.5.1-web/css/all.css",
      // },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css",
        integrity:
          "sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==",
        crossorigin: "anonymous",
        referrerpolicy: "no-referrer",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/bulma/css/bulma.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/sweetalert2", ssr: false },
    { src: "~/plugins/toasted", ssr: false },
    { src: "~/plugins/filters" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // "@nuxtjs/auth-next",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: "/",
    // baseURL: "http://14.224.129.177:1975", // máy chủ tuanpda
    baseURL: "http://localhost:1975",
    timeout: 20000,
    credentials: true,
  },

  server: {
    port: 2612,
    host: "localhost",
    // host: "192.168.1.97", // server tuanpda
    // host:"0.0.0.0"
  },

  // server: {
  //   port: 81,
  //   host: "192.168.1.5",
  //   // tnhh phủ diễn
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    middleware: ["auth"],

    // Thêm route catch-all
    extendRoutes(routes, resolve) {
      routes.push({
        name: "catch-all",
        path: "*",
        component: resolve(__dirname, "pages/404.vue"), // Đường dẫn đến trang "This page could not be found"
      });
    },
  },

  // auth: {
  //   strategies: {
  //     custom: {
  //       scheme: "~/nuxtAuthSchema/CustomScheme.js",
  //       endpoints: {
  //         login: {
  //           url: "/api/auth/access/login",
  //           method: "post",
  //           propertyName: false,
  //         },
  //         // refresh: { url: '/api/auth/refresh', method: 'post' },
  //         user: { url: "/api/users/auth/user", method: "get" },
  //       },
  //       // token: {
  //       //   property: "access_token",
  //       //   global: true,
  //       //   required: true,
  //       //   type: "Bearer",
  //       // },
  //       user: {
  //         property: "user",
  //         autoFetch: true,
  //       },
  //     },
  //   },

  //   watchLoggedIn: true, // Cập nhật trạng thái đăng nhập
  //   redirect: {
  //     login: "/login",
  //     logout: "/login",
  //     home: "/",
  //   },
  // },
};
