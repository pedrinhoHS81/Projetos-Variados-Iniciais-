const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restartButton');

const gridSize = 20;
let snake = [{ x: 10 * gridSize, y: 10 * gridSize }];
let food = {};
let dx = dy = 0;
let score = 0;
let gameInterval;
let isGameOver = false;

function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
       
    //desenho da comida
    ctx.fillStyle = 'Red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    //desenho da Snake
    ctx.fillStyle = 'Green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function update() {
    if (isGameOver) return;
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = `Pontos: ${score}`;
        generateFood();
    } else {
        snake.pop();
        checkCollision();
    }
}

function checkCollision() { 
    const head = snake[0];

    // Colisão com as paredes
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        const hitself = snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
        const hitwall = head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height;
        return hitself || hitwall;
    }
}

    function endgame() {
        if (checkCollision()) {
            clearInterval(gameInterval);
            isGameOver = true;
            alert('Fim de Jogo! Pontuação final: ' + score);
        }
        function gameLoop() {
            update();
            draw();
        }

        function startGame() {
            snake = [{ x: 10 * gridSize, y: 10 * gridSize }];
            dx = dy = 0;
            score = 0;
            isGameOver = false;
            scoreDisplay.textContent = `Pontos: ${score}`;

            if (gameInterval) clearInterval(gameInterval);
        }
        generateFood();
        gameInterval = setInterval(gameLoop, 100);
    }
    Document.addEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowUp':
                if (dy === 0) {
                    dx = 0;
                    dy = -gridSize;
                }
                break;
            case 'ArrowDown':
                if (dy === 0) {
                    dx = 0;
                    dy = gridSize;
                }
                break;
            case 'ArrowLeft':
                if (dx === 0) {
                    dx = -gridSize;
                    dy = 0;
                }
                break;
            case 'ArrowRight':
                if (dx === 0) {
                    dx = gridSize;
                    dy = 0;
                }
                break;
        }

        restartButton.addEventListener('click', () => {
            startGame();
        });
    });

