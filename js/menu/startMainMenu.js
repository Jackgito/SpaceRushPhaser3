import { gameMode, setGameState } from '../game.js';
import { startGame } from "../startGame.js";
import { createHighscoresMenu } from "./highscoreMenu.js";
import { createOptionsMenu } from "./optionsMenu.js";
import MenuItem from "./MenuItem.js";
import MusicManager from "../musicManager.js";

// This function is responsible for starting the game and navigating
// to highscores and options menus
// startMusic is used to prevent multiple songs playing at the same time
// music determines which song is played when the game starts
export function startMainMenu(scene) {
    const musicManager = new MusicManager(this);
    let currentSong = musicManager.getCurrentSongKey();
    const menuItemLocationX = scene.cameras.main.width / 2;
    const menuItemLocationY = scene.cameras.main.height / 2;

    // Start game
    const startGameMenuItem = new MenuItem(scene, menuItemLocationX, menuItemLocationY / 2 + 100, "Start game", () => {
        scene.musicMenu.stop();
        scene.startGameSound.play();
        musicManager.playSong(scene);
        startGameMenuItem.menuText.destroy();
        optionsMenuItem.menuText.destroy();
        scoreboardMenuItem.menuText.destroy();
        setGameState("game");
        startGame(scene, gameMode);
    });

    // Scoreboard
    const scoreboardMenuItem = new MenuItem(scene, menuItemLocationX, menuItemLocationY, "Scoreboard", () => {
        startGameMenuItem.menuText.destroy();
        optionsMenuItem.menuText.destroy();
        scoreboardMenuItem.menuText.destroy();
        createHighscoresMenu(scene);
    });

    // Options
    const optionsMenuItem = new MenuItem(scene, menuItemLocationX, menuItemLocationY + 100, "Options", () => {
        startGameMenuItem.menuText.destroy();
        optionsMenuItem.menuText.destroy();
        scoreboardMenuItem.menuText.destroy();
        createOptionsMenu(scene, currentSong);
    });

    // Add the menu items to the scene
    scene.add.existing(startGameMenuItem.menuText);
    scene.add.existing(scoreboardMenuItem.menuText);
    scene.add.existing(optionsMenuItem.menuText);
}

export function playMenuMusic(scene) {
    scene.musicMenu = scene.sound.add("musicMenu", {
        loop: true,
        volume: 0.2,
    });
    scene.musicMenu.play({ delay: 0.1, seek: 0 });
}
