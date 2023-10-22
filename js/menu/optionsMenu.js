import { startMainMenu } from "./startMainMenu.js";
import MenuItem from "./MenuItem.js";
import MusicManager from "../musicManager.js";
import { setGameMode } from "../game.js";

const gameModes = ["Classic", "Precision", "Gravity Switch"];
let currentGameMode = "Classic"; // Default to Classic

// Player can mute sounds, change game song and gamemode
export function createOptionsMenu(scene, currentSong) {
    const musicManager = new MusicManager(this);
    const createdObjects = [];
    const menuItemLocationX = scene.cameras.main.width / 2;
    const menuItemLocationY = scene.cameras.main.height / 2;

    // Create a mute button
    let sounds = scene.sound.mute ? "Off" : "On"; // Determine the initial sound state

    // Create the mute button with the initial sound state
    const muteMenuItem = new MenuItem(scene, menuItemLocationX, menuItemLocationY - 100, `Sounds: ${sounds}`, () => {
        // Toggle the mute state of the game
        scene.sound.mute = !scene.sound.mute;

        // Update the text on the button to reflect the new sound state
        sounds = scene.sound.mute ? "On" : "Off";
        muteMenuItem.updateText(`Sounds: ${sounds}`);
    });
    createdObjects.push(muteMenuItem);

    // Create a key-value map for songs
    const songMap = {
        musicElectroman: "Waterflame - Electroman Adventures",
        musicOneAgainst: "Antti Martikainen - One Against the World",
        musicOverkill: "RIOT - Overkill"
    };

    // Create a music selector
    const musicMenuItem = new MenuItem(scene, menuItemLocationX, menuItemLocationY, `Music: ${musicManager.getCurrentSongTitle()}`, () => {
        // Cycle through the keys in the songMap
        const songKeys = Object.keys(songMap);

        const currentIndex = songKeys.indexOf(currentSong);

        const nextIndex = (currentIndex + 1) % songKeys.length;
        currentSong = songKeys[nextIndex];
        musicManager.selectSong(currentSong);

        // Update the text on the button to reflect the new music selection
        musicMenuItem.updateText(`Music: ${songMap[currentSong]}`);

        // Use the MusicManager to select and play the new song
        musicManager.selectSong(currentSong);
    });
    createdObjects.push(musicMenuItem);

    // Create a game mode selector
    const gamemodeMenuItem = new MenuItem(scene, menuItemLocationX, menuItemLocationY + 100, `Game Mode: ${currentGameMode}`, () => {
        
        // Cycle through the available game modes
        const currentIndex = gameModes.indexOf(currentGameMode);
        const nextIndex = (currentIndex + 1) % gameModes.length;
        currentGameMode = gameModes[nextIndex];
        setGameMode(currentGameMode)

        // Update the text on the button to reflect the new game mode
        gamemodeMenuItem.updateText(`Game Mode: ${currentGameMode}`);
    });
    createdObjects.push(gamemodeMenuItem);

    const backMenuItem = new MenuItem(scene, menuItemLocationX, menuItemLocationY + 200, "Back", () => {
        destroyCreatedObjects();
        startMainMenu(scene, false, currentSong);
    });
    createdObjects.push(backMenuItem);

    function destroyCreatedObjects() {
        for (const object of createdObjects) {
            object.menuText.destroy();
        }
    }
}
