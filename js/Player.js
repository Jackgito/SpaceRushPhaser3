import { gameOver } from "./gameOver.js";
import { gameMode } from "./game.js";

export class Player extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, texture, asteroidGroup) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.upSpeed = 11;
        this.downSpeed = 11;
        this.hitPoints = 3;
        this.isSwitched = false;
        this.mouseDown = false;

        //this.createParticles(scene)
        this.trailEmitter = scene.add.particles(0, 0, "trail", {
            lifespan: 400,
            angle: { min: -190, max: -170 },
            scale: { start: 0.70, end: 0, ease: 'sine.out' },
            speed: 200,
            emitting: false,
            blendMode: 'ADD',
        });
        this.trailEmitter.setDepth(-1);

        this.smokeEmitter = scene.add.particles(0, 0, "smoke", {
            lifespan: 300,
            angle: { min: -230, max: -120 },
            scale: { start: 2.0, end: 0, ease: 'sine.out' },
            speed: 100,
            emitting: false,
        });
        this.smokeEmitter.setDepth(-2);

        this.dustEmitter = scene.add.particles(0, 0, "dust", {
            speed: { min: -300, max: 300 },
            lifespan: 300,
            angle: { min: 0, max: 360 },
            scale: { start: 2, end: 0 },
            speed: 300,
            emitting: false,
        });
        this.dustEmitter.setDepth(1);

        this.explosionEmitter = scene.add.particles(0, 0, "playerExplosion", {
            speed: { min: -300, max: 300 },
            lifespan: 300,
            angle: { min: 0, max: 360 },
            scale: { start: 2, end: 0 },
            speed: 300,
            emitting: false,
        });
        this.explosionEmitter.setDepth(2);

        // Used for gravity switch
        scene.input.on('pointerdown', () => {
            this.isSwitched = !this.isSwitched; // Toggle the state
        });

        // Normal player movement
        scene.input.on("pointerdown", () => {
            this.mouseDown = true;
        });
        scene.input.on("pointerup", () => {
            this.mouseDown = false;
        });

        // Add collision with the asteroid group
        scene.physics.add.overlap(this, asteroidGroup, (player, asteroid) => {
            // Player loses 1 hit point
            player.hitPoints--;
            scene.hitSound.play();

            // Destroy the asteroid
            this.dustEmitter.emitParticleAt(this.x, this.y, 5);
            asteroid.destroy();

            // Check if the player has run out of hit points
            if (player.hitPoints <= 0) {

                // Player has no hit points left, end the game
                this.explosionEmitter.emitParticleAt(this.x, this.y, 10);
                scene.explode.play();
                player.destroy();
                player = null;
                scene.gameState = "endGame";
                gameOver(scene);
            }
        });
    }

    update() {

        // Smoke particles
        if (this.hitPoints === 1) {
          this.smokeEmitter.emitParticleAt(this.x + 5, this.y, 1);
        }

        // Movement
        if (gameMode != "Gravity Switch") {
          this.playerMovement(this.mouseDown);
          this.playerRotation(this.mouseDown);
        } else {
          this.gravitySwitch(this.isSwitched)
        }

        // Wrap around the screen, make the player immovable and emit trail particles
        if (this && this.body) {
        this.scene.physics.world.wrap(this, 0);
        this.x = 100; // Stops collisions from moving the player
        this.trailEmitter.emitParticleAt(this.x - 10, this.y, 1);
        }
    }

    playerMovement(mouseDown) {
        if (this && this.body) {
            if (mouseDown) {
                this.body.velocity.y = Phaser.Math.Clamp(this.body.velocity.y - this.upSpeed, -650, 650);
            } else {
                this.body.velocity.y = Phaser.Math.Clamp(this.body.velocity.y + this.downSpeed, -650, 650);
            }
        }
    }   
    
    playerRotation(mouseDown) {
        if (mouseDown && this.angle > -40) {
            this.angle -= 0.62;
        } else if (this.angle < 40) {
            this.angle += 0.6;
        }
    }

    // When mouse is clicked, change player's gravity
    gravitySwitch(isSwitched) {
        if (this && this.body) {
            if (isSwitched == true) {
                this.body.velocity.y = Phaser.Math.Clamp(this.body.velocity.y - this.upSpeed, -650, 650);
                if (this.angle > -40) {
                    this.angle -= 0.62;
                }
            }
            else {
                this.body.velocity.y = Phaser.Math.Clamp(this.body.velocity.y + this.downSpeed, -650, 650);
                if (this.angle < 40) {
                    this.angle += 0.6;
                }
            }
        }
    }
}

export default Player;
