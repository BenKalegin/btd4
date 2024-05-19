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
            { x: 118, y: 20 },
            { x: 118, y: 90 },
            { x: 850, y: 90 },
            { x: 850, y: 235 },
            { x: 586, y: 235 },
            { x: 586, y: 536 },
            { x: 718, y: 536 },
            { x: 718, y: 406 },
            { x: 870, y: 406 },
            { x: 870, y: 705 },
            { x: 446, y: 705 },
            { x: 446, y: 235 },
            { x: 118, y: 235 },
            { x: 118, y: 352 },
            { x: 310, y: 352 },
            { x: 310, y: 500 },
            { x: 118, y: 500 },
            { x: 118, y: 896 },
            { x: 234, y: 896 },
            { x: 234, y: 636 },
            { x: 318, y: 636 },
            { x: 318, y: 830 },
            { x: 730, y: 830 },
            { x: 730, y: 999 },
        ];

        const speed = 800; // pixels per second

        const bloon = this.add.image(track[0].x, track[0].y, 'myImage');
        // Add a tween for each segment of the track
        let totalDuration = 0; // Total duration of all tweens so far
        for (let i = 0; i < track.length - 1; i++) {
            // Calculate the distance of the segment
            const dx = track[i + 1].x - track[i].x;
            const dy = track[i + 1].y - track[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            // Calculate the duration based on the speed
            const duration = (distance / speed) * 1000; // convert to milliseconds

            this.tweens.add({
                targets: bloon,
                x: { value: track[i + 1].x, duration: duration, ease: 'None' },
                y: { value: track[i + 1].y, duration: duration, ease: 'None' },
                delay: totalDuration, // Delay each tween to create a sequence
            });

            totalDuration += duration;
        }
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