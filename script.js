document.addEventListener("DOMContentLoaded", function () {
    const player = document.getElementById("player");
    const spotlight = document.querySelector(".spotlight");
    const goal = document.getElementById("goal");
    const walls = document.querySelectorAll(".wall"); // Select all walls

    const spotlightPositions = [
        { x: 60, y: 60 }, { x: 250, y: 60 }, { x: 450, y: 60 },
        { x: 60, y: 180 }, { x: 250, y: 180 }, { x: 450, y: 180 },
        { x: 60, y: 300 }, { x: 250, y: 300 }, { x: 450, y: 300 }
    ];
    
    let playerX = 20, playerY = 150;
    const speed = 10;

    document.addEventListener("keydown", function (event) {
        let newX = playerX;
        let newY = playerY;
    
        if (event.key === "ArrowUp" && playerY > 0) newY -= speed;
        if (event.key === "ArrowDown" && playerY < 380) newY += speed;
        if (event.key === "ArrowLeft" && playerX > 0) newX -= speed;
        if (event.key === "ArrowRight" && playerX < 580) newX += speed;
    
        // Only move the player if the new position is not colliding
        if (!isCollidingWithWall(newX, newY)) {
            playerX = newX;
            playerY = newY;
            player.style.top = playerY + "px";
            player.style.left = playerX + "px";
        } else {
            console.log("Blocked by wall!");
        }
    
        checkCollision();
    });

    function isCollidingWithWall(x, y) {
        let playerWidth = 20;  // Player's size
        let playerHeight = 20;
    
        for (let wall of walls) {
            let wallX = wall.offsetLeft;
            let wallY = wall.offsetTop;
            let wallWidth = wall.offsetWidth;
            let wallHeight = wall.offsetHeight;
    
            if (
                x < wallX + wallWidth &&
                x + playerWidth > wallX &&
                y < wallY + wallHeight &&
                y + playerHeight > wallY
            ) {
                console.log("Collision detected with wall!");
                return true; // Prevent movement if colliding
            }
        }
        return false;
    }

    function checkCollision() {
        let playerRect = player.getBoundingClientRect();
        let spotlightRect = spotlight.getBoundingClientRect();
        let goalRect = goal.getBoundingClientRect();

        if (
            playerRect.left < spotlightRect.right &&
            playerRect.right > spotlightRect.left &&
            playerRect.top < spotlightRect.bottom &&
            playerRect.bottom > spotlightRect.top
        ) {
            alert("Game Over! You were caught!");
            location.reload();
        }

        if (
            playerRect.left < goalRect.right &&
            playerRect.right > goalRect.left &&
            playerRect.top < goalRect.bottom &&
            playerRect.bottom > goalRect.top
        ) {
            alert("You Win! You reached the safe zone!");
            location.reload();
        }
    }

    function moveSpotlightSmoothly() {
        function moveToNextPosition() {
            // Pick a new random position
            let randomIndex = Math.floor(Math.random() * spotlightPositions.length);
            let nextPos = spotlightPositions[randomIndex];
    
            // Move faster (reduced duration)
            spotlight.style.transition = "top 1.5s linear, left 1.5s linear";
            spotlight.style.left = nextPos.x + "px";
            spotlight.style.top = nextPos.y + "px";
    
            // Keep moving continuously
            setTimeout(moveToNextPosition, 1500); // Matches transition speed
        }
    
        moveToNextPosition(); // Start the movement loop
    }
    

    // ✅ Start moving the spotlight continuously
    moveSpotlightSmoothly();
});
