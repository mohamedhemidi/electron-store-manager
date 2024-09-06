interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: number
  readonly VITE_LICENSE_KEY_SECRET: string
  readonly VITE_MAC_ADDRESS: string
  readonly VITE_LICENSE_METHOD: 'MAC_ADDRESS' | 'ONLINE' | 'OPEN'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
