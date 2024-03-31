const gameContainer = document.getElementById('game-container');
const dinosaurio = document.getElementById('dinosaurio');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const scoreDisplay = document.getElementById('score');
let isJumping = false;
let score = 0;
let gameInterval;
let obstacleInterval;

function startGame() {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    score = 0;
    scoreDisplay.textContent = score;
    gameInterval = setInterval(function() {
        score++;
        scoreDisplay.textContent = score;
    }, 100);
    createObstacles();
    gameContainer.addEventListener('touchstart', jump);
}

function jump() {
    if (!isJumping) {
        isJumping = true;
        let position = 0;
        const jumpInterval = setInterval(function() {
            if (position >= 150) { // Aumenta la altura del salto
                clearInterval(jumpInterval);
                const fallInterval = setInterval(function() {
                    if (position === 0) {
                        clearInterval(fallInterval);
                        isJumping = false;
                    }
                    position -= 5;
                    dinosaurio.style.bottom = position + 'px';
                }, 20);
            }
            position += 5;
            dinosaurio.style.bottom = position + 'px';
        }, 20);
    }
}

function createObstacles() {
    obstacleInterval = setInterval(function() {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstaculo');
        obstacle.style.left = '700px'; // Aparecen en el extremo derecho
        gameContainer.appendChild(obstacle);
        moveObstacle(obstacle);
    }, 2000); // Cambia la velocidad de aparición de los obstáculos según sea necesario
}

function moveObstacle(obstacle) {
    let obstaclePosition = 700; // Comienzan en el extremo derecho
    const moveInterval = setInterval(function() {
        if (obstaclePosition < 0) {
            clearInterval(moveInterval);
            gameContainer.removeChild(obstacle);
        }
        obstaclePosition -= 5; // Velocidad de movimiento de los obstáculos hacia la izquierda
        obstacle.style.left = obstaclePosition + 'px';

        // Verificar colisión
        const dinosaurioTop = parseInt(dinosaurio.style.bottom);
        const obstacleLeft = parseInt(obstacle.style.left);
        if (
            obstacleLeft < 100 && obstacleLeft > 0 &&
            dinosaurioTop <= 30 // Ajusta la colisión
        ) {
            clearInterval(moveInterval);
            clearInterval(gameInterval);
            clearInterval(obstacleInterval); // Detener la generación de obstáculos
            gameOver();
        }
    }, 20);
}

function gameOver() {
    gameOverScreen.style.display = 'flex';
    gameContainer.removeEventListener('touchstart', jump);
    // Eliminar todos los obstáculos
    const obstacles = document.querySelectorAll('.obstaculo');
    obstacles.forEach(obstacle => gameContainer.removeChild(obstacle));
}

function restartGame() {
    gameOverScreen.style.display = 'none';
    startGame();
}

startGame();
