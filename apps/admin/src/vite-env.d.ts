/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAIN_DOMAIN_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
