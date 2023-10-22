import { restartGame } from "./game.js";
import { getTimerValue } from "./timer.js";
import { checkHighscore, loadHighscores } from "./highscore.js";
import MusicManager from "./musicManager.js";

export function gameOver(scene) {
  const musicManager = new MusicManager(scene);
  const gameWidth = scene.cameras.main.width;
  const gameHeight = scene.cameras.main.height;
  musicManager.stopSong();

  // Create a black screen that covers the entire game area
  const gameOverScreen = scene.add.rectangle(
    gameWidth / 2,
    gameHeight / 2,
    gameWidth,
    gameHeight,
    0x000000
  );
  gameOverScreen.setDepth(150);
  gameOverScreen.setAlpha(0);

  // Constants for readability
  const FADE_IN_DURATION = 2500;
  const RESTART_DELAY = 4000;

  // Fade in the black screen over 2 seconds
  scene.tweens.add({
    targets: gameOverScreen,
    alpha: 1, // Fades to fully opaque
    duration: FADE_IN_DURATION,
    onComplete: () => {
      // Create and display the "GAME OVER" text
      const gameOverText = scene.add.text(
        gameWidth / 2,
        gameHeight / 2,
        "GAME OVER",
        {
          fontFamily: "Tektur",
          fontSize: 48,
          color: "#ffffff",
        }
      ).setOrigin(0.5);
      gameOverText.setDepth(200);
    },
  });

  let playerScore = getTimerValue();

  // Loads scores from local storage
  let highscores = loadHighscores();
  
  // Updates the highscores and returns player placement
  let scoreCheck = checkHighscore(highscores, playerScore);

  switch (scoreCheck) {
    case 1:
      console.log("1st place");
      scene.highscoreSound.play();
      scene.time.delayedCall(RESTART_DELAY, restartGame, [], scene);
      break;
    case 2:
      scene.highscoreSound.play();
      scene.time.delayedCall(RESTART_DELAY, restartGame, [], scene);
      break;
    case 3:
      scene.highscoreSound.play();
      scene.time.delayedCall(RESTART_DELAY, restartGame, [], scene);
      break;
    default:
      scene.gameOverSound.play();
      scene.time.delayedCall(RESTART_DELAY, restartGame, [], scene); // Restart the game after 4 seconds have passed
      break;
  }
}
