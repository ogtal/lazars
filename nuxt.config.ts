export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@kgierke/nuxt-basic-auth", "@vueuse/nuxt"],

  runtimeConfig: {
    cosmos: {
      endpoint: "",
      key: "",
    },
    openai: {
      key: "",
    },
  },

  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
  },

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
  },

  basicAuth: {
    enabled: true,
    users: [
      {
        username: process.env.NUXT_BASIC_AUTH_PASSWORD || "admin",
        password: process.env.NUXT_BASIC_AUTH_PASSWORD || "admin",
      },
    ],
  },
});
