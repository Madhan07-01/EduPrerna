import Phaser from 'phaser'
import PhaserGameCanvas from '../PhaserGameCanvas'

const gates = [
  { name: 'AND', truth: (a:boolean,b:boolean)=> a && b },
  { name: 'OR', truth: (a:boolean,b:boolean)=> a || b },
  { name: 'XOR', truth: (a:boolean,b:boolean)=> (a?1:0) + (b?1:0) === 1 },
  { name: 'NAND', truth: (a:boolean,b:boolean)=> !(a && b) },
]

function makeQuestion(){
  const g = gates[Phaser.Math.Between(0, gates.length-1)]
  const a = Math.random() < 0.5
  const b = Math.random() < 0.5
  const ans = g.truth(a,b)
  const options = Phaser.Utils.Array.Shuffle([true,false])
  return { g: g.name, a, b, ans, options }
}

class LogicGateScene extends Phaser.Scene {
  private score = 0
  private timeLeft = 30
  private timerEvent?: Phaser.Time.TimerEvent
  private timeText!: Phaser.GameObjects.Text
  private scoreText!: Phaser.GameObjects.Text
  private qText!: Phaser.GameObjects.Text
  private optTexts: Phaser.GameObjects.Text[] = []
  private ans = false

  create(){
    const { width } = this.scale
    this.cameras.main.setBackgroundColor('#0b0f1f')

    this.scoreText = this.add.text(16, 12, 'Score: 0', { color: '#fff' })
    this.timeText = this.add.text(width - 140, 12, 'Time: 30', { color: '#fff' })

    this.nextQ()

    this.timerEvent = this.time.addEvent({ delay: 1000, loop: true, callback: ()=>{
      this.timeLeft--
      this.timeText.setText(`Time: ${this.timeLeft}`)
      if (this.timeLeft <= 0) this.finish()
    }})
  }

  private nextQ(){
    const { width } = this.scale
    const { g, a, b, ans, options } = makeQuestion()
    this.ans = ans
    if (this.qText) this.qText.destroy()
    this.optTexts.forEach(t=>t.destroy())
    this.optTexts = []

    this.qText = this.add.text(width/2, 100, `${g} Gate: ${a?1:0} , ${b?1:0} -> ?`, { color: '#e2e8f0', fontSize: '26px' }).setOrigin(0.5)

    options.forEach((opt, i)=>{
      const t = this.add.text(width/2, 180 + i*60, opt? '1' : '0', { color: '#f8fafc', backgroundColor: '#1f2937' }).setPadding(10,6,10,6).setOrigin(0.5)
      t.setInteractive({ useHandCursor: true })
      t.on('pointerdown', ()=>{
        if (opt === this.ans) { this.score += 10; this.scoreText.setText(`Score: ${this.score}`) }
        else { this.score = Math.max(0, this.score-5); this.scoreText.setText(`Score: ${this.score}`) }
        this.time.delayedCall(150, ()=> this.nextQ())
      })
      this.optTexts.push(t)
    })
  }

  private finish(){
    this.timerEvent?.remove(false)
    ;(Phaser.Utils as any)?.sceneData?.onFinish?.(this.score)
  }
}

export default function PhaserLogicGateMatch({ onFinish }:{ onFinish:(score:number)=>void }){
  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-700 p-3 bg-white/80 dark:bg-slate-900/60">
      <PhaserGameCanvas scene={LogicGateScene as any} width={640} height={360} backgroundColor="#0b0f1f" sceneData={{ onFinish }} />
    </div>
  )
}
