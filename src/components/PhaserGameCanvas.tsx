// src/components/PhaserGameCanvas.tsx
// Generic Phaser canvas host. Accepts a Scene class and optional initial data.

import { useEffect, useRef } from 'react'
import Phaser from 'phaser'

type Props = {
  scene: Phaser.Types.Scenes.SceneType
  width?: number
  height?: number
  backgroundColor?: string | number
  parentClassName?: string
  sceneData?: Record<string, any>
}

export default function PhaserGameCanvas({
  scene,
  width = 800,
  height = 600,
  backgroundColor = '#111827',
  parentClassName = 'w-full max-w-3xl mx-auto',
  sceneData = {},
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Pass data through a global helper accessible to the Scene
    ;(Phaser.Utils as any).sceneData = sceneData

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width,
      height,
      backgroundColor,
      parent: containerRef.current,
      scene: [scene],
      physics: { default: 'arcade', arcade: { debug: false } },
    }

    gameRef.current = new Phaser.Game(config)

    return () => {
      gameRef.current?.destroy(true)
      gameRef.current = null
    }
  }, [scene, width, height, backgroundColor, sceneData])

  return <div ref={containerRef} className={parentClassName} />
}
