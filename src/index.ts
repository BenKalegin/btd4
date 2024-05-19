import Phaser from 'phaser';

class MyScene extends Phaser.Scene {
    preload() {
        // Load an image asset
        this.load.image('background', 'assets/background-3-3.png');
        this.load.image('myImage', 'assets/Red_Bloon.webp');
    }

    create() {
        this.cameras.main.setBackgroundColor('#008000');

        this.add.image(500, 500, 'background');
        // Add the image to the scene

        // Define the track
        const track = [
            { x: 100, y: 100 },
            { x: 200, y: 200 },
            { x: 300, y: 300 },
            { x: 400, y: 400 },
            // ... add more points as needed
        ];

        const bloon = this.add.image(track[0].x, track[0].y, 'myImage');

        // Create a tween that moves the bloon along the track
        this.tweens.add({
            targets: bloon,
            x: { value: track.map(point => point.x), duration: 2000, ease: 'Power1' },
            y: { value: track.map(point => point.y), duration: 2000, ease: 'Power1' },
            repeat: -1 // Repeat forever
        });

    }

    update() {
        // Game loop logic here
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1000,
    height: 1000,
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