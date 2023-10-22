import { checkAsteroidBounds } from "./asteroidBehavior.js";
import { startMainMenu, playMenuMusic } from "./menu/startMainMenu.js";

export let gameState = "startScreen";
export let gameMode = "Classic";

export function setGameMode(newGamemode) {
  gameMode = newGamemode;
  console.log("New gamemode: " + newGamemode)
}

export function setGameState(newState) {
  gameState = newState;
}

export class GameScene extends Phaser.Scene {
  preload() {

    // Load assets
    this.load.image("player", "assets/sprites/player/player.png");
    this.load.image("trail", "assets/sprites/player/trail.png");
    this.load.image("smoke", "assets/sprites/player/smoke.png");
    this.load.image("playerExplosion", "assets/sprites/player/playerExplosion.png");
    this.load.image("smallAsteroid", "assets/sprites/asteroids/smallAsteroid.png");
    this.load.image("asteroid", "assets/sprites/asteroids/asteroid.png");
    this.load.image("largeAsteroid", "assets/sprites/asteroids/largeAsteroid.png");
    this.load.image("dust", "assets/sprites/asteroids/dust.png");

    // Load audio
    this.load.audio("musicMenu", "assets/sounds/musicMenu.mp3");
    this.load.audio("musicElectroman", "assets/sounds/musicElectroman.mp3");
    this.load.audio("musicOverkill", "assets/sounds/musicOverkill.mp3");
    this.load.audio("musicOneAgainst", "assets/sounds/musicOneAgainstTheWorld.mp3");
    this.load.audio("startGame", "assets/sounds/startGame.mp3");
    this.load.audio("hitSound", "assets/sounds/hitSound.mp3");
    this.load.audio("explode", "assets/sounds/explode.mp3");
    this.load.audio("gameOverSound", "assets/sounds/gameOver.mp3");
    this.load.audio("menuClick", "assets/sounds/menuClick.mp3");
    this.load.audio("menuHover", "assets/sounds/menuHover.mp3");
    this.load.audio("newHighscore", "assets/sounds/newHighscore.mp3");
  }

  create() {

      // Sounds
      this.highscoreSound = this.sound.add("newHighscore");
      this.gameOverSound = this.sound.add("gameOverSound");
      this.startGameSound = this.sound.add('startGame');
      this.hitSound = this.sound.add("hitSound");
      this.explode = this.sound.add("explode");
  
      // Set audio volume
      this.startGameSound.setVolume(0.5);
      this.explode.setVolume(0.8);
      this.hitSound.setVolume(0.3);
      this.gameOverSound.setVolume(0.5);

    if (gameState === "menu") {
      startMainMenu(this);
    } else if (gameState === "startScreen") {
      // Create the start screen text
      const textStartGame = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "Click to start",
        {
          fontFamily: "Tektur",
          fontSize: 48,
          color: "#ffffff",
        }
      ).setOrigin(0.5);

      let isTextVisible = true;
      this.time.addEvent({
        delay: 600,
        loop: true,
        callback: () => {
          // Toggle text visibility
          textStartGame.setVisible(isTextVisible);
          isTextVisible = !isTextVisible;
        },
      });

      // Go to the main menu when the mouse is pressed
      this.input.on("pointerdown", () => {
        if (gameState === "startScreen") {
          setGameState("menu");
          textStartGame.destroy();
          playMenuMusic(this);
          startMainMenu(this);
        }
      });
    }
  }

  update() {
    if (gameState === "game") {
        this.player.update()

      // Destroy asteroids that have passed the player
      checkAsteroidBounds(this);
    }
  }
}

export function restartGame() {
  this.scene.restart();
  playMenuMusic(this);
  setGameState("menu");
}
