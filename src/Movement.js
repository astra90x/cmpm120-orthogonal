const Movement = class extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    init() {
        this.playerSpeed = 350
    }

    preload() {
        this.load.spritesheet('char', 'assets/spritesheets/Character_002.png', {
            frameWidth: 48,
        })
    }

    create() {
        this.cameras.main.setBackgroundColor(0xdddddd)

        this.player = this.physics.add.sprite(globalThis.width / 2, globalThis.height / 2, 'char', 0).setScale(2)

        this.player.body.setCollideWorldBounds(true)
        this.player.body.setSize(32, 32).setOffset(8, 16)

        this.idleAnimation = `char(0,1,true)`

        for (let [dx, dy, frames] of [
            [-1, -1, [10, 9]],
            [0, -1, [10, 9, 10, 11]], // up
            [1, -1, [10, 11]],
            [-1, 0, [4, 3, 4, 5]], // left
            [1, 0, [7, 6, 7, 8]], // right
            [-1, 1, [1, 0]],
            [0, 1, [1, 0, 1, 2]], // down
            [1, 1, [1, 2]],
        ]) {
            for (let idle of [false, true]) {
                this.anims.create({
                    key: `char(${dx},${dy},${idle})`,
                    frameRate: idle ? 0 : 8,
                    repeat: -1,
                    frames: this.anims.generateFrameNumbers('char', { frames: idle ? [frames[0]] : frames })
                })
            }
        }

        globalThis.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        let dx = !!cursors.right.isDown - !!cursors.left.isDown
        let dy = !!cursors.down.isDown - !!cursors.up.isDown
        let d = Math.sqrt(dx * dx + dy * dy) || 0.5
        this.player.setVelocity(dx / d * this.playerSpeed, dy / d * this.playerSpeed)

        if (d >= 1) this.idleAnimation = `char(${dx},${dy},true)`
        this.player.play(d < 1 ? this.idleAnimation : `char(${dx},${dy},false)`, true)
    }
}

export default Movement
