// src/games/PeriodicMatchScene.ts
// Animated Periodic Table Match (Science)
// Shows an element symbol; user selects the correct atomic number from 4 choices.
// Writes attempts and points to Supabase.

import Phaser from 'phaser'
import { submitAttempt, addPoints } from '../services/supabaseGames'

type Elem = { symbol: string; name: string; Z: number }

const ELEMENTS: Elem[] = [
  { symbol: 'H', name: 'Hydrogen', Z: 1 },
  { symbol: 'He', name: 'Helium', Z: 2 },
  { symbol: 'Li', name: 'Lithium', Z: 3 },
  { symbol: 'Be', name: 'Beryllium', Z: 4 },
  { symbol: 'B', name: 'Boron', Z: 5 },
  { symbol: 'C', name: 'Carbon', Z: 6 },
  { symbol: 'N', name: 'Nitrogen', Z: 7 },
  { symbol: 'O', name: 'Oxygen', Z: 8 },
  { symbol: 'F', name: 'Fluorine', Z: 9 },
  { symbol: 'Ne', name: 'Neon', Z: 10 },
  { symbol: 'Na', name: 'Sodium', Z: 11 },
  { symbol: 'Mg', name: 'Magnesium', Z: 12 },
  { symbol: 'Al', name: 'Aluminium', Z: 13 },
  { symbol: 'Si', name: 'Silicon', Z: 14 },
  { symbol: 'P', name: 'Phosphorus', Z: 15 },
  { symbol: 'S', name: 'Sulfur', Z: 16 },
  { symbol: 'Cl', name: 'Chlorine', Z: 17 },
  { symbol: 'Ar', name: 'Argon', Z: 18 },
]

export default class PeriodicMatchScene extends Phaser.Scene {
  private startTime!: number
  private hits = 0
  private total = 6
  private idx = 0
  private current!: Elem
  private ui: Phaser.GameObjects.Container | null = null
  private challengeContext!: {
    challenge_id: string
    grade: number
    subject: 'Science'
  }

  constructor() {
    super('PeriodicMatchScene')
  }

  init() {
    const data = (Phaser.Utils as any).sceneData || {}
    this.challengeContext = {
      challenge_id: data.challenge_id,
      grade: data.grade,
      subject: 'Science',
    }
  }

  create() {
    this.cameras.main.setBackgroundColor('#042f2e')
    this.ensureTex('pmDot', 3)
    const w = this.scale.width
    const h = this.scale.height
    this.add.particles(0, 0, 'pmDot', {
      x: { min: 0, max: w }, y: { min: 0, max: h },
      speedY: { min: 10, max: 35 }, lifespan: 5000,
      alpha: { start: 0.25, end: 0 }, scale: { start: 0.8, end: 0.3 },
      tint: [0x10b981, 0x22d3ee], quantity: 2,
    } as any)

    const title = this.add.text(20, 20, 'Periodic Match', { color: '#ecfeff', fontSize: '20px' })
    this.tweens.add({ targets: title, y: 24, duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.InOut' })

    this.startTime = Date.now()
    this.idx = 0
    this.next()
  }

  private ensureTex(key: string, r = 2) {
    if (!this.textures.exists(key)) {
      const g = this.add.graphics(); g.fillStyle(0xffffff); g.fillCircle(r, r, r); g.generateTexture(key, r * 2, r * 2); g.destroy()
    }
  }

  private next() {
    if (this.idx >= this.total) return void this.finish()
    this.current = Phaser.Utils.Array.GetRandom(ELEMENTS)
    this.idx++
    this.draw()
  }

  private draw() {
    if (this.ui) this.ui.destroy()
    this.ui = this.add.container(0, 0)
    const symbol = this.add.text(20, 80, this.current.symbol, { color: '#ecfeff', fontSize: '64px', fontStyle: 'bold' })
    const name = this.add.text(20, 150, this.current.name, { color: '#a7f3d0', fontSize: '18px' })
    const meta = this.add.text(20, 185, `Question ${this.idx} / ${this.total}`, { color: '#ecfeff' })

    symbol.setScale(0.85).setAlpha(0)
    this.tweens.add({ targets: symbol, scale: 1, alpha: 1, duration: 250, ease: 'Back.Out' })

    const opts = new Set<number>([this.current.Z])
    while (opts.size < 4) opts.add(this.current.Z + Phaser.Math.Between(-3, 5))
    const options = Phaser.Utils.Array.Shuffle(Array.from(opts))

    const btns: Phaser.GameObjects.Text[] = []
    options.forEach((opt, i) => {
      const bx = 20 + (i % 2) * 220
      const by = 230 + Math.floor(i / 2) * 60
      const b = this.makeButton(`${opt}`, bx, by, () => this.pick(opt))
      btns.push(b)
    })

    this.ui.add([symbol, name, meta, ...btns])
  }

  private makeButton(label: string, x: number, y: number, onClick: () => void) {
    const btn = this.add.text(x, y, label, {
      color: '#042f2e', backgroundColor: '#99f6e4', padding: { x: 10, y: 6 }, fontSize: '20px'
    })
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => this.tweens.add({ targets: btn, scale: 1.05, duration: 120 }))
      .on('pointerout', () => this.tweens.add({ targets: btn, scale: 1, duration: 120 }))
      .on('pointerdown', () => { this.cameras.main.flash(100, 16, 185, 129); onClick() })
    btn.setAlpha(0)
    this.tweens.add({ targets: btn, alpha: 1, y: y + 4, duration: 200 })
    return btn
  }

  private pick(val: number) {
    if (val === this.current.Z) {
      this.hits++
      this.feedback('Correct!', 0x10b981)
      this.confetti(280, 210)
    } else {
      this.feedback(`Wrong! Z=${this.current.Z}`, 0xdb2777)
      this.cameras.main.shake(120, 0.004)
    }
    this.time.delayedCall(700, () => this.next())
  }

  private feedback(text: string, tint: number) {
    const t = this.add.text(20, 210, text, { color: '#ecfeff', fontStyle: 'bold' })
    t.setTint(tint)
    this.tweens.add({ targets: t, y: 200, alpha: 0, duration: 650, onComplete: () => t.destroy() })
  }

  private confetti(x: number, y: number) {
    const key = 'pmConfetti'
    if (!this.textures.exists(key)) {
      const g = this.add.graphics(); g.fillStyle(0xffffff); g.fillRect(0, 0, 4, 4); g.generateTexture(key, 4, 4); g.destroy()
    }
    const emitter = this.add.particles(0, 0, key, {
      x, y, quantity: 16, speed: { min: 120, max: 260 }, angle: { min: 200, max: 340 }, gravityY: 400,
      lifespan: 900, scale: { start: 1, end: 0 }, tint: [0x10b981, 0x06b6d4, 0xf59e0b, 0xdb2777]
    } as any)
    this.time.delayedCall(900, () => emitter.destroy())
  }

  private async finish() {
    const elapsed = Math.round((Date.now() - this.startTime) / 1000)
    const score = Math.round((this.hits / this.total) * 100)
    const done = this.add.text(20, 320, `Done! Score ${score}, Time ${elapsed}s`, { color: '#ecfeff' })
    this.tweens.add({ targets: done, alpha: 1, y: 300, duration: 400, ease: 'Sine.Out' })

    try {
      await submitAttempt({
        challenge_id: this.challengeContext.challenge_id,
        grade: this.challengeContext.grade,
        subject: 'Science',
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
