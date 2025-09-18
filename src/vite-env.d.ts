/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
declare module 'virtual:pwa-register/react' {
  export function useRegisterSW(): {
    needRefresh: boolean
    updateServiceWorker: () => void
  }
}
