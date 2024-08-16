interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_LICENCE_KEY_SECRET: string
  readonly VITE_MAC_ADDRESS_MACOS: string
  readonly VITE_MAC_ADDRESS_WINDOWS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
