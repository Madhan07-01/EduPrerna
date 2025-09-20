import Phaser from 'phaser'

export class PhysicsSimulatorInteractiveScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PhysicsSimulatorInteractiveScene' })
  }

  preload(): void {
    // Preload any assets needed
  }

  create(): void {
    this.showEmptyContent()
  }

  showEmptyContent(): void {
    this.children.removeAll()
    
    // Background
    this.add.rectangle(175, 200, 350, 400, 0xffffff)

    // Completely empty - no title or content
  }

  update(): void {
    // Update logic if needed
  }
}