import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { type QueuedBadge } from '../services/gamification'

interface BadgeContextType {
  queueBadge: (b: QueuedBadge) => void
}

const BadgeContext = createContext<BadgeContextType | undefined>(undefined)

export function useBadgeQueue() {
  const ctx = useContext(BadgeContext)
  if (!ctx) throw new Error('useBadgeQueue must be used within BadgeProvider')
  return ctx
}

export function BadgeProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = useState<QueuedBadge[]>([])
  const [active, setActive] = useState<QueuedBadge | null>(null)
  const timer = useRef<number | null>(null)

  const playNext = useCallback(() => {
    if (timer.current) {
      window.clearTimeout(timer.current)
      timer.current = null
    }
    setActive(null)
    setTimeout(() => {
      setQueue((q) => {
        if (q.length === 0) return q
        const [next, ...rest] = q
        setActive(next)
        // auto-hide after 4s
        timer.current = window.setTimeout(() => {
          setActive(null)
          playNext()
        }, 4200)
        return rest
      })
    }, 250)
  }, [])

  const queueBadge = useCallback((b: QueuedBadge) => {
    // Avoid duplicate badges in the queue
    setQueue((q) => {
      // Check if this badge is already in the queue
      const isDuplicate = q.some(badge => badge.id === b.id)
      if (isDuplicate) return q
      
      return [...q, b]
    })
    
    if (!active) {
      // trigger immediately
      setTimeout(() => playNext(), 50)
    }
  }, [active, playNext])

  const value = useMemo(() => ({ queueBadge }), [queueBadge])

  return (
    <BadgeContext.Provider value={value}>
      {children}
      {/* Popup host */}
      <div className="fixed inset-0 pointer-events-none z-[60]">
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[min(92vw,420px)]">
          {active && (
            <div className="pointer-events-auto">
              <BadgePopup badge={active} onClose={playNext} />
            </div>
          )}
          {/* hidden marker to reference queue (lint fix) */}
          <span style={{ display: 'none' }}>{queue.length}</span>
        </div>
      </div>
    </BadgeContext.Provider>
  )
}

function BadgePopup({ badge, onClose }: { badge: QueuedBadge; onClose: () => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  React.useEffect(() => {
    audioRef.current?.play().catch(() => {})
  }, [])

  return (
    <div className="animate-fade-in rounded-2xl border-2 border-yellow-400 bg-gradient-to-br from-amber-50 to-yellow-100 shadow-2xl overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl animate-bounce">{badge.icon || '🏅'}</div>
          <div>
            <div className="text-xs uppercase tracking-wide text-amber-700">Badge Unlocked</div>
            <div className="text-xl font-extrabold text-amber-900">{badge.name}</div>
          </div>
        </div>
        <div className="mt-2 text-sm text-amber-800">{badge.description}</div>
        {badge.quote && <div className="mt-2 text-xs italic text-amber-700">“{badge.quote}”</div>}
        <div className="mt-3 flex items-center justify-between">
          <div className="text-2xl animate-pulse">🎆 🎉</div>
          <button onClick={onClose} className="pointer-events-auto text-xs px-3 py-1 rounded-full bg-amber-600 text-white hover:bg-amber-700">Close</button>
        </div>
      </div>
      <style>{`
        .animate-fade-in { animation: fadeIn 300ms ease-out, pop 300ms ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes pop { 0% { transform: scale(0.96) } 70% { transform: scale(1.03) } 100% { transform: scale(1) } }
      `}</style>
      <audio ref={audioRef} src="https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg" preload="auto" />
    </div>
  )
}