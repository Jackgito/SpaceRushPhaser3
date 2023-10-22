import { createAsteroidGroup, spawnAsteroids } from "./asteroidBehavior.js";
import Player from './Player.js';
import { createTimerText } from './timer.js';

export function startGame(scene, gameMode) {
    createTimerText(scene);
    createAsteroidGroup(scene);

    // Create player and start asterodi spawner
    console.log(gameMode)
    if (gameMode != "Precision") {
        spawnAsteroids(scene, 700, -450, 3, 6);
        scene.player = new Player(scene, scene.sys.game.config.width / 16, scene.sys.game.config.height / 2, "player", scene.asteroidGroup);
        scene.player.setSize(scene.player.displayWidth * 0.8, scene.player.displayHeight * 0.8); // Reduce hitbox size
    }
    else {
        scene.player = new Player(scene, scene.sys.game.config.width / 16, scene.sys.game.config.height / 2, "player", scene.asteroidGroup);
        scene.player.setScale(0.5);
        spawnAsteroids(scene, 500, -550, 2, 8);

    }

    scene.player.setDepth(0);
}
