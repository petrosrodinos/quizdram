// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@hebilicious/vue-query-nuxt",
    "@element-plus/nuxt",
    "@nuxt/fonts",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  alias: {
    "@interfaces": "./interfaces",
    "@stores": "./stores",
    "@utils": "./utils",
  },
  vueQuery: {
    stateKey: "vue-query-nuxt",
    autoImports: [
      "useQuery",
      "useQueries",
      "useInfiniteQuery",
      "useMutation",
      "useIsFetching",
      "useIsMutating",
      "useQueryClient",
    ],
  },
  runtimeConfig: {
    public: {
      myPublicVariable: process.env.API_URL,
    },
    // private: {
    //   myPrivateToken: process.env.PRIVATE_TOKEN
    // }
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
});
