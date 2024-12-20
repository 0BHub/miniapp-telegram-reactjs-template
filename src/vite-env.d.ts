/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HOLESKY_URL: string;
  readonly VITE_MAINNET_URL: string;
  readonly VITE_PROJECT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
