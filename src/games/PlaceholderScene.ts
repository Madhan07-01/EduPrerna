// src/games/PlaceholderScene.ts
// Generic placeholder Phaser scene for unimplemented game types.
// It still records an attempt to Supabase so flows can be tested end-to-end.

import Phaser from 'phaser'
import { submitAttempt, addPoints } from '../services/supabaseGames'

export default class PlaceholderScene extends Phaser.Scene {
  private startTime!: number
  private challengeContext!: {
    challenge_id: string
    grade: number
    subject: 'Mathematics' | 'Science' | 'Technology' | 'Engineering'
    game_type?: string
  }

  constructor() {
    super('PlaceholderScene')
  }

  init() {
    const data = (Phaser.Utils as any).sceneData || {}
    this.challengeContext = {
      challenge_id: data.challenge_id,
      grade: data.grade,
      subject: data.subject,
      game_type: data.config?.game_type,
    }
  }

  create() {
    this.cameras.main.setBackgroundColor('#0b1220')

    // Ensure a tiny particle texture exists
    const dotKey = 'placeholderDot'
    if (!this.textures.exists(dotKey)) {
      const g = this.add.graphics()
      g.fillStyle(0xffffff)
      g.fillCircle(2, 2, 2)
      g.generateTexture(dotKey, 4, 4)
      g.destroy()
    }

    // Shimmering particle background
    const w = this.scale.width
    const h = this.scale.height
    this.add.particles(0, 0, dotKey, {
      x: { min: 0, max: w },
      y: { min: 0, max: h },
      lifespan: 4000,
      speedY: { min: 5, max: 20 },
      scale: { start: 0.6, end: 0.2 },
      alpha: { start: 0.25, end: 0 },
      tint: [0x60a5fa, 0xa78bfa, 0x34d399],
      quantity: 2,
      emitting: true,
    } as any)

    const title = this.add.text(20, 20, 'STEM Challenge', { color: '#ffffff', fontSize: '20px' })
    this.tweens.add({ targets: title, y: 24, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.InOut' })
    this.add.text(20, 60, 'This game type is coming soon.', { color: '#93c5fd' })
    if (this.challengeContext.game_type) {
      this.add.text(20, 90, `Type: ${this.challengeContext.game_type}`, { color: '#9ca3af' })
    }
    this.add.text(20, 130, 'Press Space to complete a mock attempt.', { color: '#9ca3af' })

    this.startTime = Date.now()
    this.input.keyboard!.on('keydown-SPACE', () => this.finish())
  }

  private async finish() {
    const elapsed = Math.round((Date.now() - this.startTime) / 1000)
    const score = 100 // mock full score to complete flow

    try {
      await submitAttempt({
        challenge_id: this.challengeContext.challenge_id,
        grade: this.challengeContext.grade,
        subject: this.challengeContext.subject,
        score,
        completed: true,
        time_taken_seconds: elapsed,
        meta: { placeholder: true },
      })
      const newTotal = await addPoints(5)
      const ok = this.add.text(20, 180, `Recorded! Points total: ${newTotal}`, { color: '#10b981' })
      ok.setScale(0.9).setAlpha(0)
      this.tweens.add({ targets: ok, alpha: 1, scale: 1, duration: 300, ease: 'Back.Out' })
    } catch (e: any) {
      this.add.text(20, 180, `Failed to record: ${e.message}`, { color: '#f87171' })
    }
  }
}
