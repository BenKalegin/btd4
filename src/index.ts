import Phaser from 'phaser';

class MyScene extends Phaser.Scene {
    preload() {
        // Load an image asset
        this.load.image('myImage', 'assets/Red_Bloon.webp');
    }

    create() {
        // Set the background color to green
        this.cameras.main.setBackgroundColor('#008000');
        // Add the image to the scene
        this.add.image(400, 300, 'myImage');
    }

    update() {
        // Game loop logic here
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 }, // Added 'x' property
            debug: false
        }
    },
    scene: MyScene // Changed to the class
};

const game = new Phaser.Game(config);