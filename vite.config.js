import VitePluginHtmlEnv from "vite-plugin-html-env";
import { config } from "dotenv"
config()

/** @type {import('vite').UserConfig} */
export default {
  plugins: [
    VitePluginHtmlEnv({
      prefix: "{{",
      suffix: "}}",
      envPrefixes: [""]
    })
  ],
  server: {
    port: 3000
  },
  publicDir: "assets"
}