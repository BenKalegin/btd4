import Phaser from 'phaser';
import Image = Phaser.Physics.Arcade.Image;


type Position = {x: number, y: number};

class MyScene extends Phaser.Scene {
    // @ts-ignore
    private bloons: Phaser.Physics.Arcade.Group;
    // @ts-ignore
    private monkey: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    preload() {
        // Load an image asset
        this.load.image('background', 'assets/background-3-3.png');
        this.load.image('myImage', 'assets/Red_Bloon.webp');
        this.load.image('dart-monkey', 'assets/dart-monkey.svg');
        this.load.image('dart', 'assets/dart.png');
    }

    create() {
        this.cameras.main.setBackgroundColor('#008000');

        this.add.image(500, 500, 'background');
        // Add the image to the scene

        // Define the track
        const track: Position[] = [
            {x: 118, y: 20},
            {x: 118, y: 90},
            {x: 850, y: 90},
            {x: 850, y: 235},
            {x: 586, y: 235},
            {x: 586, y: 536},
            {x: 718, y: 536},
            {x: 718, y: 406},
            {x: 870, y: 406},
            {x: 870, y: 705},
            {x: 446, y: 705},
            {x: 446, y: 235},
            {x: 118, y: 235},
            {x: 118, y: 352},
            {x: 310, y: 352},
            {x: 310, y: 500},
            {x: 118, y: 500},
            {x: 118, y: 896},
            {x: 234, y: 896},
            {x: 234, y: 636},
            {x: 318, y: 636},
            {x: 318, y: 830},
            {x: 730, y: 830},
            {x: 730, y: 999},
        ];

        const speed = 400; // pixels per second

        this.monkey = this.physics.add.sprite(500, 500, 'dart-monkey');


        this.bloons = this.physics.add.group();
        let bloonCount = 0;

        const spawnEvent = this.time.addEvent({
            delay: 1000, // 2000 ms = 2 seconds
            callback: () => {
                bloonCount++;
                if (bloonCount <= 15)
                    this.spawnBloon(track, speed);
                else
                    spawnEvent.remove();
            },
            loop: true
        });
    }

    private spawnBloon(track: Position[], speed: number) {
        const bloon = this.add.image(track[0].x, track[0].y, 'myImage');
        // Add a tween for each segment of the track
        this.bloons.add(bloon);
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
                x: {value: track[i + 1].x, duration: duration, ease: 'None'},
                y: {value: track[i + 1].y, duration: duration, ease: 'None'},
                delay: totalDuration, // Delay each tween to create a sequence
            });

            totalDuration += duration;
        }
    }

    update() {
        this.shootDart(this.monkey);
    }


    private shootDart(monkey: Phaser.Physics.Arcade.Sprite) {
        // Set the dart's velocity towards the nearest bloon
        // For simplicity, let's assume you have a method getNearestBloon that returns the nearest bloon to the monkey
        const firstBloonInRange = this.firstBloonInRange(monkey.x, monkey.y, 200);

        if (firstBloonInRange != undefined) {
            // Create a dart sprite at the monkey's location
            const dart = this.physics.add.sprite(monkey.x, monkey.y, 'dart');
            const dx = firstBloonInRange.x - monkey.x;
            const dy = firstBloonInRange.y - monkey.y;

            dart.setRotation(Math.atan2(dy, dx));

            this.physics.moveToObject(dart, firstBloonInRange, 500); // 500 is the speed of the dart

            // Add a collider between the dart and the bloons, so that the dart can pop them
            this.physics.add.collider(dart, this.bloons, (dart, bloon) => {
                // This function is called when a dart hits a bloon
                bloon.destroy(); // Destroy the bloon
                dart.destroy(); // Destroy the dart
            });
        }


    }

    private firstBloonInRange(x: number, y: number, range: number) : Image | undefined {
        return this.bloons.getChildren().find(bloon  => {
            const image = bloon as Phaser.Physics.Arcade.Image;
             return Phaser.Math.Distance.Between(x, y, image. x, image.y) < range;
        })as Phaser.Physics.Arcade.Image;

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