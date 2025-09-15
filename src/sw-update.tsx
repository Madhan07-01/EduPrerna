import { useRegisterSW } from 'virtual:pwa-register/react'

export function SWUpdatePrompt() {
  // In React, needRefresh is a boolean state value returned by the hook.
  // Some builds may expose it as an object with a `value` property; support both.
  const reg = useRegisterSW()
  const needRefresh = (reg as any).needRefresh?.value ?? (reg as any).needRefresh ?? false
  const updateServiceWorker = (reg as any).updateServiceWorker as (reload?: boolean) => void

  if (!needRefresh) return null
  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto w-fit rounded-md bg-sky-600 text-white px-4 py-2 shadow-lg">
      <span className="mr-3">New version available.</span>
      <button className="underline" onClick={() => updateServiceWorker?.(true)}>Reload</button>
    </div>
  )
}


