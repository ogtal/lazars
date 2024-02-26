import * as path from "path";

export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@kgierke/nuxt-basic-auth", "@vueuse/nuxt"],

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
        username: process.env.BASIC_AUTH_USERNAME || "admin",
        password: process.env.BASIC_AUTH_PASSWORD || "admin",
      },
    ],
  },
});
