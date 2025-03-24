interface ImportMetaEnv {
  readonly VITE_ECWID_STORE_ID: string
  readonly VITE_ECWID_ACCESS_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
