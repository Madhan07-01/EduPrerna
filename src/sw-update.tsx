import { useRegisterSW } from 'virtual:pwa-register/react'

export function SWUpdatePrompt() {
  // In React, needRefresh is a boolean state value returned by the hook.
  // Some builds may expose it as an object with a `value` property; support both.
  const reg = useRegisterSW()
  // vite-plugin-pwa types do not currently expose the full React hook shape.
  // Support both boolean and signal-like shapes without using any.
  const needRefresh: boolean =
    (reg as unknown as { needRefresh?: { value?: boolean } | boolean }).needRefresh instanceof Object
      ? Boolean((reg as unknown as { needRefresh?: { value?: boolean } }).needRefresh?.value)
      : Boolean((reg as unknown as { needRefresh?: boolean }).needRefresh)
  const updateServiceWorker = (reg as unknown as { updateServiceWorker?: (reload?: boolean) => void }).updateServiceWorker

  if (!needRefresh) return null
  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto w-fit rounded-md bg-sky-600 text-white px-4 py-2 shadow-lg">
      <span className="mr-3">New version available.</span>
      <button className="underline" onClick={() => updateServiceWorker?.(true)}>Reload</button>
    </div>
  )
}


