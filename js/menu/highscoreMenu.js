import { loadHighscores } from "../highscore.js";
import MenuItem from "./MenuItem.js";
import { startMainMenu } from "./startMainMenu.js";

// Show the top 3 scores to the player from the browser's local storage
export function createHighscoresMenu(scene) {
    const highscores = loadHighscores();
    const menuItemLocationX = scene.cameras.main.width / 2;
    const menuItemLocationY = scene.cameras.main.height / 2;
    const highscoreColors = ["yellow", "#DBDBDB", '#cd7f32']; // Gold, silver, bronze

    // Create an array of highscore objects with playerName and playerScore
    const highscoreArray = Object.keys(highscores).map(playerName => ({
        playerName,
        playerScore: highscores[playerName]
    }));

    // Sort the highscoreArray by playerScore in descending order
    highscoreArray.sort((a, b) => b.playerScore - a.playerScore);

    // Initialize an array to store references to created objects
    const createdObjects = [];

    if (highscoreArray.length === 0) {
        // No scores recorded, display a message
        const noScoresText = scene.add.text(menuItemLocationX, menuItemLocationY, "No scores recorded", {
            fontFamily: "Tektur",
            fontSize: "64px",
            fill: "#ffffff",
            align: 'center'
        }).setOrigin(0.5);

        createdObjects.push(noScoresText);
    } else {
        for (let i = 0; i < Math.min(3, highscoreArray.length); i++) {
            const highscoreData = highscoreArray[i];
            const { playerName, playerScore } = highscoreData;
            const x = menuItemLocationX;
            const y = menuItemLocationY / 2 + i * 120;

            // Create the highscore text with the corresponding color
            const highscoreText = scene.add.text(x, y, `${playerName}: ${playerScore}`, {
                fontFamily: "Tektur",
                fontSize: "64px",
                fill: highscoreColors[i],
                align: 'right'
            }).setOrigin(0.5);

            createdObjects.push(highscoreText);

            if (i === 0) {
                // Add a glowing animation for the top score text
                scene.tweens.add({
                    targets: highscoreText,
                    duration: 600,
                    repeat: -1,
                    yoyo: true,
                    alpha: 0.6,
                });
            }
        }
    }

    function destroyCreatedObjects() {
        for (const object of createdObjects) {
            object.destroy();
        }
    }

    const backMenuItem = new MenuItem(scene, menuItemLocationX,
        menuItemLocationY / 2 + 400, "Back", () => {
            destroyCreatedObjects();
            backMenuItem.menuText.destroy();
            startMainMenu(scene, false);
        });
}
