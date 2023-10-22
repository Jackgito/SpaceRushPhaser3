let timerCount = 0;

// Create and manage the timer text
export function createTimerText(scene) {
    timerCount = 0;
    const timerText = scene.add.text(
        scene.game.config.width * 0.99,
        scene.game.config.height / 60,
        timerCount.toFixed(2),
        {
            fontSize: "36px",
            fontFamily: "Tektur",
            fill: "#ffffff",
            align: "left",
            stroke: null,
        }
    );
    timerText.setDepth(201);
    timerText.setOrigin(1, 0);

    // Update the timer and stop it once the player dies
    const timer = scene.time.addEvent({
        delay: 10,
        callback: () => {
            if (scene.player.active) {
                timerCount += 0.01;
                timerText.setText(timerCount.toFixed(2));
            } else {
                timer.remove(false);
            }
        },
        loop: true,
    });
}

export function getTimerValue() {
    return timerCount;
}
