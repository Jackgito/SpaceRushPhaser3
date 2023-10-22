export function createAsteroidGroup(scene) {
    scene.asteroidGroup = scene.physics.add.group({
        allowGravity: true,
        collideWorldBounds: false,
    });
}

// Creates asteroids with random properties, increasing the speed
// and frequency as the game progresses.
export function spawnAsteroids(scene, spawnDelay, maxXVelocity, minSize, maxSize) {
    let minXVelocity = -350;
    const minYVelocity = -60;
    const maxYVelocity = 60;
    const minAngularVelocity = -50;
    const maxAngularVelocity = 50;
    const hitbox = 2.4;
    let decreaseDelayBy = 2;
    let increaseMaxXVelocityBy = 2;

    const spawnAsteroid = () => {
        let x = scene.game.config.width + 100;
        let y = Phaser.Math.Between(scene.game.config.height * 0.1, scene.game.config.height * 0.9);
        const randomType = Math.random();
        let asteroidKey;

        // Determine size
        if (randomType <= 0.2) {
            asteroidKey = "largeAsteroid";
        } else if (randomType <= 0.4) {
            asteroidKey = "asteroid";
        } else {
            asteroidKey = "smallAsteroid";
        }

        const asteroid = scene.asteroidGroup.create(x, y, asteroidKey);
        const randomScale = Phaser.Math.FloatBetween(minSize, maxSize); // Use provided minSize and maxSize
        asteroid.setScale(randomScale);
        asteroid.setCircle(asteroid.width / hitbox, 0, 0);

        // Determine speed
        const randomXVelocity = Phaser.Math.Between(minXVelocity, maxXVelocity);
        const randomYVelocity = Phaser.Math.Between(minYVelocity, maxYVelocity);
        asteroid.setVelocity(randomXVelocity, randomYVelocity);

        // Determine rotation
        const randomAngularVelocity = Phaser.Math.FloatBetween(minAngularVelocity, maxAngularVelocity);
        asteroid.setAngularVelocity(randomAngularVelocity);
    };

    // Update delay and maxXVelocity (make the game harder)
    const updateDelayAndMaxXVelocity = () => {
        if (spawnDelay > 120) {
            spawnDelay -= decreaseDelayBy;
        }

        if (maxXVelocity > -1100) {
            maxXVelocity -= increaseMaxXVelocityBy;
            minXVelocity -= increaseMaxXVelocityBy;
        }
    };

    let asteroidSpawnTimer;

    // Create the initial timer event
    asteroidSpawnTimer = scene.time.addEvent({
        delay: spawnDelay,
        callback: () => {
            spawnAsteroid();
            updateDelayAndMaxXVelocity();

            asteroidSpawnTimer.delay = spawnDelay;
        },
        loop: true,
    });
}

// Destroys asteroids that are outside of the play area
export function checkAsteroidBounds(scene) {
    scene.asteroidGroup.getChildren().forEach((asteroid) => {
        if (asteroid.x <= -200) {
            asteroid.destroy();
        }
    });
}
