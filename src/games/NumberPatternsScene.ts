// src/games/NumberPatternsScene.ts
// Animated Number Patterns mini-game (Mathematics)
// Shows a short numeric sequence; user selects the next number from 4 choices.
// Scores and points are recorded to Supabase via existing services.

import Phaser from 'phaser'
import { submitAttempt, addPoints } from '../services/supabaseGames'

type Round = { seq: number[]; correct: number; options: number[] }

export default class NumberPatternsScene extends Phaser.Scene {
  private startTime!: number
  private hits = 0
  private total = 5
  private roundIndex = 0
  private round!: Round
  private ui: Phaser.GameObjects.Container | null = null
  private challengeContext!: {
    challenge_id: string
    grade: number
    subject: 'Mathematics'
  }

  constructor() {
    super('NumberPatternsScene')
  }

  init() {
    const data = (Phaser.Utils as any).sceneData || {}
    this.challengeContext = {
      challenge_id: data.challenge_id,
      grade: data.grade,
      subject: 'Mathematics',
    }
  }

  create() {
    this.cameras.main.setBackgroundColor('#0f172a')
    this.ensureParticleTex('dotNP', 3)
    const w = this.scale.width
    const h = this.scale.height
    this.add.particles(0, 0, 'dotNP', {
      x: { min: 0, max: w },
      y: { min: 0, max: h },
      speedY: { min: 10, max: 30 },
      lifespan: 5000,
      alpha: { start: 0.2, end: 0 },
      scale: { start: 0.8, end: 0.3 },
      tint: [0x60a5fa, 0xa5b4fc],
      quantity: 2,
    } as any)

    const title = this.add.text(20, 20, 'Number Patterns', { color: '#fff', fontSize: '20px' })
    this.tweens.add({ targets: title, y: 24, duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.InOut' })

    this.startTime = Date.now()
    this.roundIndex = 0
    this.nextRound()
  }

  private ensureParticleTex(key: string, r = 2) {
    if (!this.textures.exists(key)) {
      const g = this.add.graphics()
      g.fillStyle(0xffffff)
      g.fillCircle(r, r, r)
      g.generateTexture(key, r * 2, r * 2)
      g.destroy()
    }
  }

  private nextRound() {
    if (this.roundIndex >= this.total) return void this.finish()
    this.round = this.generateRound(this.roundIndex)
    this.roundIndex++
    this.drawRound()
  }

  private generateRound(i: number): Round {
    // Create varied simple patterns
    const type = i % 5
    let seq: number[] = []
    let next = 0
    switch (type) {
      case 0: {
        const start = Phaser.Math.Between(1, 6)
        const step = Phaser.Math.Between(2, 5)
        seq = [start, start + step, start + step * 2, start + step * 3]
        next = start + step * 4
        break
      }
      case 1: {
        const start = Phaser.Math.Between(2, 5)
        const mul = Phaser.Math.Between(2, 3)
        seq = [start, start * mul, start * mul * mul, start * mul * mul * mul]
        next = start * mul ** 4
        break
      }
      case 2: {
        const a = Phaser.Math.Between(5, 12)
        seq = [a, a - 1, a - 3, a - 6]
        next = a - 10 // -1, -2, -3, -4 pattern
        break
      }
      case 3: {
        const a = Phaser.Math.Between(1, 5)
        seq = [a, a + 1, a + 3, a + 6] // +1, +2, +3
        next = a + 10
        break
      }
      default: {
        const a = Phaser.Math.Between(2, 10)
        seq = [a, a * 2, a + a * 2, (a + a * 2) * 2]
        next = (a + a * 2) + (a + a * 2) * 2
        break
      }
    }
    const opts = new Set<number>([next])
    while (opts.size < 4) {
      opts.add(next + Phaser.Math.Between(-7, 7))
    }
    const options = Phaser.Utils.Array.Shuffle(Array.from(opts))
    return { seq, correct: next, options }
  }

  private drawRound() {
    if (this.ui) this.ui.destroy()
    this.ui = this.add.container(0, 0)

    const qText = this.add.text(20, 80, `${this.round.seq.join(', ')}, ?`, {
      color: '#a5b4fc', fontSize: '32px', wordWrap: { width: 700 },
    })
    const meta = this.add.text(20, 130, `Round ${this.roundIndex} / ${this.total}`, { color: '#fff' })

    qText.setAlpha(0).setScale(0.9)
    this.tweens.add({ targets: qText, alpha: 1, scale: 1, duration: 300, ease: 'Back.Out' })

    const baseY = 180
    const buttons: Phaser.GameObjects.Text[] = []
    this.round.options.forEach((opt, idx) => {
      const bx = 20 + (idx % 2) * 220
      const by = baseY + Math.floor(idx / 2) * 60
      const b = this.makeButton(`${opt}`, bx, by, () => this.pick(opt))
      buttons.push(b)
    })

    this.ui.add([qText, meta, ...buttons])
  }

  private makeButton(label: string, x: number, y: number, onClick: () => void) {
    const btn = this.add.text(x, y, label, {
      color: '#111827', backgroundColor: '#a5b4fc', padding: { x: 10, y: 6 }, fontSize: '20px'
    })
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => this.tweens.add({ targets: btn, scale: 1.05, duration: 120 }))
      .on('pointerout', () => this.tweens.add({ targets: btn, scale: 1, duration: 120 }))
      .on('pointerdown', () => {
        this.cameras.main.flash(100, 165, 180, 252)
        onClick()
      })
    btn.setAlpha(0)
    this.tweens.add({ targets: btn, alpha: 1, y: y + 4, duration: 200 })
    return btn
  }

  private pick(value: number) {
    if (value === this.round.correct) {
      this.hits++
      this.feedback('Correct!', 0x10b981)
      this.confetti(260, 170)
    } else {
      this.feedback(`Wrong! → ${this.round.correct}`, 0xef4444)
      this.cameras.main.shake(120, 0.004)
    }
    this.time.delayedCall(650, () => this.nextRound())
  }

  private feedback(text: string, tint: number) {
    const t = this.add.text(20, 150, text, { color: '#ffffff', fontStyle: 'bold' })
    t.setTint(tint)
    this.tweens.add({ targets: t, y: 140, alpha: 0, duration: 600, onComplete: () => t.destroy() })
  }

  private confetti(x: number, y: number) {
    const key = 'npConfetti'
    if (!this.textures.exists(key)) {
      const g = this.add.graphics(); g.fillStyle(0xffffff); g.fillRect(0, 0, 4, 4); g.generateTexture(key, 4, 4); g.destroy()
    }
    const emitter = this.add.particles(0, 0, key, {
      x, y, quantity: 16, speed: { min: 120, max: 260 }, angle: { min: 200, max: 340 }, gravityY: 400,
      lifespan: 900, scale: { start: 1, end: 0 }, tint: [0x10b981, 0x3b82f6, 0xf59e0b, 0xef4444]
    } as any)
    this.time.delayedCall(900, () => emitter.destroy())
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
      const newTotal = await addPoints(this.hits * 8)
      const pts = this.add.text(20, 380, `Points updated. Total: ${newTotal}`, { color: '#10b981' })
      this.tweens.add({ targets: pts, alpha: 1, duration: 400 })
    } catch (e: any) {
      const err = this.add.text(20, 380, `Failed to record: ${e.message}`, { color: '#f87171' })
      this.tweens.add({ targets: err, alpha: 1, duration: 400 })
    }
  }
}
