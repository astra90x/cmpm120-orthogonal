// Code Practice: Beyond Orthogonal
// Name:
// Date:

// Spritesheet by ElvGames: https://elv-games.itch.io/free-fantasy-dreamland-sprites

import Movement from './Movement.js'

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    render: {
        pixelArt: true,
    },
    fps: { forceSetTimeOut: true, target: 60 },
    scene: [Movement],
    physics: {
        default: 'arcade',
        fps: 60,
    },

}

let game = new Phaser.Game(config)

globalThis.cursors = null
globalThis.width = game.config.width
globalThis.height = game.config.height
