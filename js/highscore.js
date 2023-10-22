// Load highscores from local storage (browser memory)
export function loadHighscores() {
    const highscores = {};
    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            highscores[key] = localStorage[key];
        }
    }
    return highscores;
}

function getPlayerName() {
    let playerName = null;
    while (!playerName) {
        playerName = prompt("Please enter your name:");
    }
    return playerName;
}

// Add a new score to the highscores
function addNewScore(highscores, playerName, playerScore) {
    highscores[playerName] = playerScore;
    updateHighscores(highscores);
}

// Remove the lowest score from highscores
function removeLowestScore(highscores, sortedScores) {
    const lowestScore = sortedScores[sortedScores.length - 1][1];
    for (const [key, score] of sortedScores) {
        if (score === lowestScore) {
            delete highscores[key];
            break; // Exit the loop after deleting
        }
    }
}

// Returns player's placement if they get a top 3 finish, otherwise 0
export function checkHighscore(highscores, playerScore) {
    const sortedScores = Object.entries(highscores).sort((a, b) => b[1] - a[1]);

    if (sortedScores.length < 3) {
        const playerName = getPlayerName();
        if (highscores.hasOwnProperty(playerName)) {
            if (playerScore > highscores[playerName]) {
                highscores[playerName] = playerScore;
                updateHighscores(highscores);
                return sortedScores.length + 1; // Return the player's placement
            }
        } else {

        addNewScore(highscores, playerName, playerScore);
        updateHighscores(highscores);
        return sortedScores.length + 1;
        }
    } else {
        const lowestScore = sortedScores[sortedScores.length - 1][1];
        if (playerScore > lowestScore) {
            const playerName = getPlayerName();

            if (highscores.hasOwnProperty(playerName)) {
                if (playerScore > highscores[playerName]) {
                    highscores[playerName] = playerScore;
                    updateHighscores(highscores);
                }
            } else {
                removeLowestScore(highscores, sortedScores);
                addNewScore(highscores, playerName, playerScore);
                updateHighscores(highscores);
            }

            // Find the new placement of the player after the update
            const newSortedScores = Object.entries(highscores).sort((a, b) => b[1] - a[1]);
            for (let i = 0; i < newSortedScores.length; i++) {
                if (newSortedScores[i][0] === playerName) {
                    return i + 1;
                }
            }
        }
    }
    return 0; // Player didn't make it to the top 3
}

// This is used in the leaderboards menu to show the scores in descending order
export function sortHighscores(highscores) {
    return Object.entries(highscores).sort((a, b) => b[1] - a[1]);
}

// This is called, when the player gets a top 3 score
export function updateHighscores(highscores) {
    // Clear local storage before updating
    localStorage.clear();
    for (const key in highscores) {
        if (highscores.hasOwnProperty(key)) {
            const value = parseFloat(highscores[key]).toFixed(2);
            localStorage.setItem(key, value);
        }
    }
}

// Function to print the local storage (for debugging)
function printLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(`${key}: ${value}`);
    }
}

// Function to delete the local storage (for debugging)
function deleteLocalStorage() {
    localStorage.clear();
}
