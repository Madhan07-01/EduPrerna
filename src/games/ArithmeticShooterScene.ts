// src/games/ArithmeticShooterScene.ts
// Phaser scene: Arithmetic Shooter (Mathematics)
// Uses Supabase services to record attempt and add points, while Firebase remains the auth source.

import Phaser from 'phaser'
import { submitAttempt, addPoints } from '../services/supabaseGames'

export default class ArithmeticShooterScene extends Phaser.Scene {
  private question!: { a: number; b: number; op: '+' | '-' }
  private correct!: number
  private startTime!: number
  private hits = 0
  private total = 5
  private answered = 0
  private challengeContext!: {
    challenge_id: string
    grade: number
    subject: 'Mathematics'
  }

  constructor() {
    super('ArithmeticShooter')
  }

  init() {
    // Pull data passed from React via a global helper
    const data = (Phaser.Utils as any).sceneData || {}
    this.challengeContext = {
      challenge_id: data.challenge_id,
      grade: data.grade,
      subject: 'Mathematics',
    }
  }

  create() {
    this.cameras.main.setBackgroundColor('#0f172a')

    // Ensure simple particle textures exist first
    if (!this.textures.exists('starsFar')) {
      const g = this.add.graphics()
      g.fillStyle(0xffffff, 1)
      g.fillCircle(2, 2, 2)
      g.generateTexture('starsFar', 4, 4)
      g.destroy()
    }
    if (!this.textures.exists('starsNear')) {
      const g2 = this.add.graphics()
      g2.fillStyle(0xffffff, 1)
      g2.fillCircle(3, 3, 3)
      g2.generateTexture('starsNear', 6, 6)
      g2.destroy()
    }

    // Parallax starfield (two layers)
    const w = this.scale.width
    const h = this.scale.height
    this.add.particles(0, 0, 'starsFar', {
      x: { min: 0, max: w },
      y: { min: 0, max: h },
      speedY: 10,
      lifespan: 10000,
      scale: { start: 0.6, end: 0.6 },
      quantity: 2,
      tint: 0x334155,
      emitting: true,
    } as any)
    this.add.particles(0, 0, 'starsNear', {
      x: { min: 0, max: w },
      y: { min: 0, max: h },
      speedY: 25,
      lifespan: 7000,
      scale: { start: 1, end: 1 },
      quantity: 2,
      tint: 0x64748b,
      emitting: true,
    } as any)

    this.add.text(20, 20, 'Arithmetic Shooter', { color: '#ffffff', fontStyle: 'bold' })
    this.startTime = Date.now()
    this.nextQuestion()

    this.input.keyboard!.on('keydown', (event: KeyboardEvent) => {
      const val = Number(event.key)
      if (!Number.isNaN(val)) {
        this.checkAnswer(val)
      }
    })
  }

  private nextQuestion() {
    if (this.answered >= this.total) return void this.finish()
    const a = Phaser.Math.Between(1, 9)
    const b = Phaser.Math.Between(1, 9)
    const op: '+' | '-' = Math.random() > 0.5 ? '+' : '-'
    const correct = op === '+' ? a + b : a - b

    this.question = { a, b, op }
    this.correct = correct
    this.answered++
    this.drawQuestion()
  }

  private drawQuestion() {
    // Clear question layer only: add a container to hold question UI for tweening
    this.children.removeAll()
    this.add.text(20, 20, 'Arithmetic Shooter', { color: '#ffffff', fontStyle: 'bold' })
    const q = `${this.question.a} ${this.question.op} ${this.question.b} = ?`
    const qText = this.add.text(20, 80, q, { color: '#a5b4fc', fontSize: '32px' })
    const meta1 = this.add.text(20, 140, `Attempt ${this.answered} / ${this.total}`, { color: '#ffffff' })
    const meta2 = this.add.text(20, 200, `Press number keys to answer`, { color: '#9ca3af' })

    // Animate question pop-in
    qText.setScale(0.8).setAlpha(0)
    this.tweens.add({ targets: qText, scale: 1, alpha: 1, duration: 250, ease: 'Back.Out' })
    this.tweens.add({ targets: [meta1, meta2], alpha: 1, duration: 300, delay: 100 })
  }

  private checkAnswer(val: number) {
    if (val === this.correct) {
      this.hits++
      const t = this.add.text(20, 260, 'Correct!', { color: '#22c55e' })
      this.tweens.add({ targets: t, y: 240, alpha: 0, duration: 600, ease: 'Sine.Out' })
      // Confetti burst
      const key = 'confetti'
      if (!this.textures.exists(key)) {
        const g = this.add.graphics()
        g.fillStyle(0xffffff)
        g.fillRect(0, 0, 4, 4)
        g.generateTexture(key, 4, 4)
        g.destroy()
      }
      const emitter = this.add.particles(0, 0, key, {
        x: 200,
        y: 200,
        quantity: 12,
        speed: { min: 100, max: 220 },
        angle: { min: 220, max: 320 },
        gravityY: 300,
        lifespan: 900,
        scale: { start: 1, end: 0 },
        tint: [0x10b981, 0x3b82f6, 0xf59e0b, 0xef4444],
      } as any)
      this.time.delayedCall(900, () => emitter.destroy())
      // Floating +10 popup for correct
      this.popupScore('+10', 260, 230, 0x10b981)
    } else {
      const t = this.add.text(20, 260, `Wrong! Correct was ${this.correct}`, { color: '#ef4444' })
      this.cameras.main.shake(120, 0.004)
      this.tweens.add({ targets: t, y: 280, alpha: 0, duration: 700 })
    }
    this.time.delayedCall(700, () => this.nextQuestion())
  }

  private async finish() {
    const elapsed = Math.round((Date.now() - this.startTime) / 1000)
    const score = Math.round((this.hits / this.total) * 100)
    const done = this.add.text(20, 320, `Done! Score ${score}, Time ${elapsed}s`, { color: '#ffffff' })
    this.tweens.add({ targets: done, alpha: 1, y: 300, duration: 400, ease: 'Sine.Out' })

    try {
      await submitAttempt({
        challenge_id: this.challengeContext.challenge_id,
        grade: this.challengeContext.grade,
        subject: 'Mathematics',
        score,
        completed: true,
        time_taken_seconds: elapsed,
        meta: { hits: this.hits, total: this.total },
      })
      const newTotal = await addPoints(this.hits * 10)
      const pts = this.add.text(20, 380, `Points updated. Total: ${newTotal}`, { color: '#10b981' })
      this.tweens.add({ targets: pts, alpha: 1, duration: 400 })
    } catch (e: any) {
      const err = this.add.text(20, 380, `Failed to record: ${e.message}`, { color: '#f87171' })
      this.tweens.add({ targets: err, alpha: 1, duration: 400 })
    }
  }

  // Floating score popup helper
  private popupScore(text: string, x: number, y: number, color: number) {
    const t = this.add.text(x, y, text, { color: '#ffffff', fontStyle: 'bold' })
    t.setTint(color)
    t.setScale(0.9)
    this.tweens.add({ targets: t, y: y - 24, alpha: 0, duration: 700, ease: 'Sine.Out', onComplete: () => t.destroy() })
  }
}
