document.addEventListener('DOMContentLoaded', function () {
    const player = document.getElementById('player');
    let playerLeft = 0;
    let playerTop = 0;
    const playerSpeed = 15;
    const blocks = [];
    let gameActive = true;
    let score = 0;
    let highScore = localStorage.getItem('highScore') || 0;
    let lives = 3;
    const loseSound = new Audio('perdiste.mp3');

    function createLifeBlock() {
        if (gameActive && Math.random() < 0.0) {
            const lifeBlock = document.createElement('div');
            lifeBlock.className = 'life-block';

            // Establecer el estilo con la imagen de fondo
            lifeBlock.style.width = '75px';
            lifeBlock.style.height = '100px';
            lifeBlock.style.position = 'absolute';
            lifeBlock.style.backgroundImage = 'url(Capa-4.png)'; // Cambia con el nombre correcto de tu imagen

            document.getElementById('game').appendChild(lifeBlock);

            const screenWidth = document.getElementById('game').offsetWidth;
            const screenHeight = document.getElementById('game').offsetHeight;
            const randomLeft = Math.floor(Math.random() * screenWidth);
            const randomTop = -50;
            lifeBlock.style.left = randomLeft + 'px';
            lifeBlock.style.top = randomTop + 'px';

            lifeBlocks.push(lifeBlock);
        }
    }

    function initializePlayer() {
        const initialLeft = (document.getElementById('game').offsetWidth - player.offsetWidth) / 2;
        const initialTop = (document.getElementById('game').offsetHeight - player.offsetHeight) / 2;
        player.style.left = initialLeft + 'px';
        player.style.top = initialTop + 'px';
        playerLeft = initialLeft;
        playerTop = initialTop;
    }

    function movePlayerDown() {
        playerTop += playerSpeed;
        player.style.top = playerTop + 'px';

        const screenHeight = document.getElementById('game').offsetHeight;
        if (playerTop < 0) {
            playerTop = 0;
        } else if (playerTop > screenHeight - player.offsetHeight) {
            playerTop = screenHeight - player.offsetHeight;
        }

        player.style.top = playerTop + 'px';
    }

    function movePlayerUp() {
        playerTop -= playerSpeed;
        player.style.top = playerTop + 'px';

        const screenHeight = document.getElementById('game').offsetHeight;
        if (playerTop < 0) {
            playerTop = 0;
        }

        player.style.top = playerTop + 'px';
    }

    function createBlock() {
        if (gameActive) {
            const block = document.createElement('div');
            block.className = 'block';
            document.getElementById('game').appendChild(block);

            const screenWidth = document.getElementById('game').offsetWidth;
            const screenHeight = document.getElementById('game').offsetHeight;
            const randomLeft = Math.floor(Math.random() * screenWidth);
            const randomTop = -50;
            block.style.left = randomLeft + 'px';
            block.style.top = randomTop + 'px';

            blocks.push(block);
        }
    }

    function moveBlocks() {
    blocks.forEach(function (block) {
        const blockTop = parseFloat(block.style.top) || 0;
        const newTop = blockTop + 5;
        block.style.top = newTop + 'px';

        const screenHeight = document.getElementById('game').offsetHeight;
        if (newTop > screenHeight) {
            resetBlock(block);
        }

        const playerRect = player.getBoundingClientRect();
        const blockRect = block.getBoundingClientRect();

        if (playerRect.bottom > blockRect.top &&
            playerRect.top < blockRect.bottom &&
            playerRect.right > blockRect.left &&
            playerRect.left < blockRect.right) {
            resetBlock(block);
            loseLife();
        }
    });
}

function createBlocks() {
    createBlock();
    // Añade la creación de bloques de vida cada 500 puntos
    if (score % 500 === 0) {
        createLifeBlock();
    }
}

function moveBlocks() {
    moveBlocks();
    // Añade el movimiento de bloques de vida
    moveLifeBlocks();
}

function moveBlocks() {
    blocks.forEach(function (block) {
        const blockTop = parseFloat(block.style.top) || 0;
        const newTop = blockTop + 5;
        block.style.top = newTop + 'px';

        const screenHeight = document.getElementById('game').offsetHeight;
        if (newTop > screenHeight) {
            resetBlock(block);
        }

        const playerRect = player.getBoundingClientRect();
        const blockRect = block.getBoundingClientRect();

        if (playerRect.bottom > blockRect.top &&
            playerRect.top < blockRect.bottom &&
            playerRect.right > blockRect.left &&
            playerRect.left < blockRect.right) {
            resetBlock(block);
            loseLife();
        }
    });
}



function moveLifeBlocks() {
    lifeBlocks.forEach(function (lifeBlock) {
        const lifeBlockTop = parseFloat(lifeBlock.style.top) || 0;
        const newTop = lifeBlockTop + 5;
        lifeBlock.style.top = newTop + 'px';

        const screenHeight = document.getElementById('game').offsetHeight;
        if (newTop > screenHeight) {
            resetBlock(lifeBlock);
        }

        const playerRect = player.getBoundingClientRect();
        const lifeBlockRect = lifeBlock.getBoundingClientRect();

        if (playerRect.bottom > lifeBlockRect.top &&
            playerRect.top < lifeBlockRect.bottom &&
            playerRect.right > lifeBlockRect.left &&
            playerRect.left < lifeBlockRect.right) {
            resetBlock(lifeBlock);
            gainLife();
        }
    });
}

function gainLife() {
    if (lives < 3) {
        lives++;
        updateLives();
    }
}

// Llama a estas funciones en el bucle del juego
function createLifeBlocks() {
    createLifeBlock();
}

function moveLifeBlocks() {
    moveLifeBlocks();
}


    function resetBlock(block) {
        const screenWidth = document.getElementById('game').offsetWidth;
        const randomLeft = Math.floor(Math.random() * screenWidth);
        const randomTop = -50;
        block.style.left = randomLeft + 'px';
        block.style.top = randomTop + 'px';
    }

    function checkCollision() {
        const playerRect = player.getBoundingClientRect();
        blocks.forEach(function (block) {
            const blockRect = block.getBoundingClientRect();
            if (playerRect.bottom > blockRect.top &&
                playerRect.top < blockRect.bottom &&
                playerRect.right > blockRect.left &&
                playerRect.left < blockRect.right) {
                resetBlock(block);
                loseLife();
            }
        });
    }

    function updateScore() {
        score++;
        document.getElementById('score').textContent = 'Puntaje: ' + score;
    }

    function updateHighScore() {
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
        }
        document.getElementById('highScore').textContent = 'Mayor Puntaje: ' + highScore;
    }

    function loseLife() {
        lives--;

        explosionSound.play(explosionSound);

        // Actualiza la representación visual de las vidas
        updateLives();

        // Verifica si se agotaron las vidas
        if (lives === 0) {
            gameOver();
        }
    }

    function updateLives() {
        for (let i = 1; i <= 3; i++) {
            const lifeElement = document.getElementById('life' + i);
            if (i <= lives) {
                lifeElement.style.display = 'block';
            } else {
                lifeElement.style.display = 'none';
            }
        }
    }

    function gameOver() {
        gameActive = false;
        loseSound.play();
        document.getElementById('overlay').style.display = 'block';

        updateHighScore();

        const message = document.getElementById('message');
        message.innerHTML = '¡Perdiste!<br><button id="restartButton">Reiniciar</button>';

        document.getElementById('restartButton').addEventListener('click', function () {
            location.reload();
        });
    }

    function handleKeyDown(event) {
        if (gameActive) {
            if (event.key === 'ArrowRight') {
                playerLeft += playerSpeed;
                const screenWidth = document.getElementById('game').offsetWidth;
                if (playerLeft > screenWidth - player.offsetWidth) {
                    playerLeft = screenWidth
                    playerLeft = screenWidth - player.offsetWidth;
                }
                player.style.left = playerLeft + 'px';
            } else if (event.key === 'ArrowLeft') {
                playerLeft -= playerSpeed;
                if (playerLeft < 0) {
                    playerLeft = 0;
                }
                player.style.left = playerLeft + 'px';
            } else if (event.key === 'ArrowDown') {
                movePlayerDown();
            } else if (event.key === 'ArrowUp') {
                movePlayerUp();
            }
        }
    }


    function gameLoop() {
        if (gameActive) {
            moveBlocks();
            checkCollision();
            updateScore();
            requestAnimationFrame(gameLoop);
        }
    }


    initializePlayer();
    document.addEventListener('keydown', handleKeyDown);
    setInterval(createBlock, 2000);
    gameLoop();
});

