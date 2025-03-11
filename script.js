document.addEventListener("DOMContentLoaded", function () {
    const player = document.getElementById("player");
    let playerX = 50, playerY = 150;
    const speed = 10;

    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowUp" && playerY > 0) {
            playerY -= speed;
        }
        if (event.key === "ArrowDown" && playerY < 380) {
            playerY += speed;
        }
        if (event.key === "ArrowLeft" && playerX > 0) {
            playerX -= speed;
        }
        if (event.key === "ArrowRight" && playerX < 580) {
            playerX += speed;
        }
        player.style.top = playerY + "px";
        player.style.left = playerX + "px";
    });
});
